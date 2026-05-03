import SwiftUI

struct SettingsView: View {
    @AppStorage("api_base_url") private var apiBaseURL = "http://localhost:8000"
    @StateObject private var vm = SettingsViewModel()
    @State private var showSyncAlert = false

    var body: some View {
        NavigationStack {
            Form {
                Section("API Connection") {
                    TextField("API Base URL", text: $apiBaseURL)
                        .keyboardType(.URL)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)

                    Button("Test Connection") {
                        Task { await vm.testConnection(url: apiBaseURL) }
                    }
                    .tint(.blue)

                    if let status = vm.connectionStatus {
                        Label(status.message, systemImage: status.icon)
                            .foregroundStyle(status.color)
                            .font(.caption)
                    }
                }

                Section("Sync") {
                    if let syncStatus = vm.syncStatus {
                        LabeledContent("Pending", value: "\(syncStatus["pending"] ?? 0)")
                        LabeledContent("Processing", value: "\(syncStatus["processing"] ?? 0)")
                        LabeledContent("Completed", value: "\(syncStatus["completed"] ?? 0)")
                        LabeledContent("Failed", value: "\(syncStatus["failed"] ?? 0)")
                    }

                    Button {
                        Task { await vm.triggerSync() }
                        showSyncAlert = true
                    } label: {
                        Label("Trigger Full Sync", systemImage: "arrow.triangle.2.circlepath")
                    }
                    .tint(.green)

                    Button {
                        Task { await vm.triggerProcess() }
                    } label: {
                        Label("Process Pending Documents", systemImage: "cpu")
                    }
                    .tint(.blue)

                    Button {
                        Task { await vm.mineOpportunities() }
                    } label: {
                        Label("Mine Opportunities", systemImage: "star.fill")
                    }
                    .tint(.orange)
                }

                Section("About") {
                    LabeledContent("Version", value: "1.0.0")
                    LabeledContent("Model", value: "claude-sonnet-4-6")
                    Link("View on GitHub",
                         destination: URL(string: "https://github.com/suryabanshi/suryabanshi")!)
                }
            }
            .navigationTitle("Settings")
            .task { await vm.fetchSyncStatus(url: apiBaseURL) }
            .alert("Sync queued!", isPresented: $showSyncAlert) {
                Button("OK", role: .cancel) {}
            } message: {
                Text("The sync will run in the background. Check back in a few minutes.")
            }
            .alert("Error", isPresented: .constant(vm.errorMessage != nil)) {
                Button("OK") { vm.errorMessage = nil }
            } message: {
                Text(vm.errorMessage ?? "")
            }
        }
    }
}

// MARK: - View Model

@MainActor
final class SettingsViewModel: ObservableObject {
    struct ConnectionStatus {
        let message: String
        let icon: String
        let color: Color
    }

    @Published var connectionStatus: ConnectionStatus?
    @Published var syncStatus: [String: Int]?
    @Published var errorMessage: String?

    func testConnection(url: String) async {
        guard let url = URL(string: url + "/health") else {
            connectionStatus = .init(message: "Invalid URL", icon: "xmark.circle.fill", color: .red)
            return
        }
        do {
            let (_, response) = try await URLSession.shared.data(from: url)
            if (response as? HTTPURLResponse)?.statusCode == 200 {
                connectionStatus = .init(message: "Connected", icon: "checkmark.circle.fill", color: .green)
            } else {
                connectionStatus = .init(message: "Unexpected response", icon: "exclamationmark.circle.fill", color: .orange)
            }
        } catch {
            connectionStatus = .init(message: "Cannot reach server", icon: "xmark.circle.fill", color: .red)
        }
    }

    func fetchSyncStatus(url: String) async {
        do { syncStatus = try await APIClient.shared.fetchSyncStatus() } catch {}
    }

    func triggerSync() async {
        do { try await APIClient.shared.triggerSync() } catch {
            errorMessage = error.localizedDescription
        }
    }

    func triggerProcess() async {
        do {
            struct EmptyResp: Decodable {}
            let url = try makeURL("/api/v1/sync/process")
            var req = URLRequest(url: url)
            req.httpMethod = "POST"
            _ = try await URLSession.shared.data(for: req)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func mineOpportunities() async {
        do { try await APIClient.shared.triggerOpportunityMining() } catch {
            errorMessage = error.localizedDescription
        }
    }

    private func makeURL(_ path: String) throws -> URL {
        guard let url = URL(string: APIClient.shared.baseURL + path) else {
            throw APIError.invalidURL
        }
        return url
    }
}
