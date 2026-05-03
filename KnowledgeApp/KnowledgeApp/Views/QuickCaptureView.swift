import SwiftUI

struct QuickCaptureView: View {
    @StateObject private var vm = QuickCaptureViewModel()
    @FocusState private var focusedField: Field?

    enum Field { case title, content }

    var body: some View {
        NavigationStack {
            Form {
                Section("Title (optional)") {
                    TextField("What is this about?", text: $vm.title)
                        .focused($focusedField, equals: .title)
                }

                Section("Content") {
                    TextEditor(text: $vm.content)
                        .frame(minHeight: 160)
                        .focused($focusedField, equals: .content)
                        .overlay(alignment: .topLeading) {
                            if vm.content.isEmpty {
                                Text("Paste text, an idea, a URL, meeting notes...")
                                    .foregroundStyle(.tertiary)
                                    .padding(.vertical, 8)
                                    .padding(.horizontal, 4)
                                    .allowsHitTesting(false)
                            }
                        }
                }

                Section("Source URL (optional)") {
                    TextField("https://...", text: $vm.sourceURL)
                        .keyboardType(.URL)
                        .autocorrectionDisabled()
                        .textInputAutocapitalization(.never)
                }

                Section {
                    Button {
                        focusedField = nil
                        Task { await vm.capture() }
                    } label: {
                        HStack {
                            Spacer()
                            if vm.isLoading {
                                ProgressView()
                            } else {
                                Label("Capture & Process", systemImage: "brain")
                                    .fontWeight(.semibold)
                            }
                            Spacer()
                        }
                    }
                    .disabled(vm.content.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || vm.isLoading)
                    .tint(.purple)
                }
            }
            .navigationTitle("Quick Capture")
            .alert("Captured!", isPresented: $vm.showSuccess) {
                Button("Capture Another") { vm.reset() }
                Button("Done", role: .cancel) {}
            } message: {
                Text("Your document is queued for AI processing. Check Knowledge Base in a minute.")
            }
            .alert("Error", isPresented: .constant(vm.errorMessage != nil)) {
                Button("OK") { vm.errorMessage = nil }
            } message: {
                Text(vm.errorMessage ?? "")
            }
            .onAppear { focusedField = .content }
        }
    }
}

// MARK: - View Model

@MainActor
final class QuickCaptureViewModel: ObservableObject {
    @Published var title = ""
    @Published var content = ""
    @Published var sourceURL = ""
    @Published var isLoading = false
    @Published var showSuccess = false
    @Published var errorMessage: String?

    func capture() async {
        guard !content.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty else { return }
        isLoading = true
        defer { isLoading = false }
        do {
            _ = try await APIClient.shared.quickCapture(
                title: title.isEmpty ? nil : title,
                content: content,
                sourceURL: sourceURL.isEmpty ? nil : sourceURL
            )
            showSuccess = true
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func reset() {
        title = ""
        content = ""
        sourceURL = ""
    }
}
