import SwiftUI

struct KnowledgeListView: View {
    @StateObject private var vm = KnowledgeListViewModel()

    var body: some View {
        NavigationStack {
            Group {
                if vm.items.isEmpty && !vm.isLoading {
                    ContentUnavailableView(
                        "No Knowledge Items",
                        systemImage: "brain",
                        description: Text("Add documents or run a sync to start building your knowledge base.")
                    )
                } else {
                    List {
                        ForEach(vm.items) { item in
                            NavigationLink(value: item) {
                                KnowledgeRowView(item: item)
                            }
                        }

                        if vm.hasMore {
                            ProgressView()
                                .frame(maxWidth: .infinity)
                                .onAppear { Task { await vm.loadMore() } }
                        }
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Knowledge Base")
            .navigationDestination(for: KnowledgeItem.self) { item in
                KnowledgeDetailView(item: item)
            }
            .searchable(text: $vm.searchQuery, prompt: "Search knowledge...")
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    categoryPicker
                }
                ToolbarItem(placement: .navigationBarTrailing) {
                    importancePicker
                }
            }
            .task { await vm.load() }
            .onChange(of: vm.searchQuery) { _, q in
                Task { await vm.search(query: q) }
            }
            .onChange(of: vm.selectedCategory) { _, _ in
                Task { await vm.load() }
            }
            .refreshable { await vm.load() }
        }
    }

    private var categoryPicker: some View {
        Menu {
            Button("All") { vm.selectedCategory = nil }
            Divider()
            ForEach(KnowledgeItem.Category.allCases, id: \.self) { cat in
                Button {
                    vm.selectedCategory = cat.rawValue
                } label: {
                    Label(cat.rawValue.capitalized, systemImage: cat.icon)
                }
            }
        } label: {
            Label(
                vm.selectedCategory?.capitalized ?? "All",
                systemImage: "line.3.horizontal.decrease.circle"
            )
        }
    }

    private var importancePicker: some View {
        Menu {
            ForEach([0.0, 0.5, 0.7, 0.9], id: \.self) { val in
                Button("≥ \(Int(val * 100))%") { vm.minImportance = val }
            }
        } label: {
            Image(systemName: "slider.horizontal.3")
        }
    }
}

// MARK: - Row

struct KnowledgeRowView: View {
    let item: KnowledgeItem

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                CategoryBadge(category: item.category)
                Spacer()
                ImportanceBar(score: item.importanceScore)
            }

            Text(item.title)
                .font(.subheadline)
                .fontWeight(.semibold)
                .lineLimit(2)

            Text(item.summary)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(2)

            if !item.keyTopics.isEmpty {
                TopicChips(topics: Array(item.keyTopics.prefix(3)))
            }
        }
        .padding(.vertical, 4)
    }
}

// MARK: - Detail

struct KnowledgeDetailView: View {
    let item: KnowledgeItem

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                HStack {
                    CategoryBadge(category: item.category)
                    Spacer()
                    ImportanceBar(score: item.importanceScore)
                    Text(String(format: "%.0f%%", item.importanceScore * 100))
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                Text(item.title)
                    .font(.title2)
                    .fontWeight(.bold)

                Divider()

                Text(item.summary)
                    .font(.body)
                    .foregroundStyle(.primary)

                if !item.keyTopics.isEmpty {
                    VStack(alignment: .leading, spacing: 8) {
                        Label("Key Topics", systemImage: "tag.fill")
                            .font(.subheadline)
                            .fontWeight(.semibold)
                        TopicChips(topics: item.keyTopics)
                    }
                }

                if let sentiment = item.sentiment {
                    Label("Sentiment: \(sentiment.capitalized)", systemImage: "face.smiling")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }

                if let sub = item.subcategory {
                    Label("Subcategory: \(sub)", systemImage: "folder.fill")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            .padding()
        }
        .navigationTitle("Detail")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - View Model

@MainActor
final class KnowledgeListViewModel: ObservableObject {
    @Published var items: [KnowledgeItem] = []
    @Published var isLoading = false
    @Published var searchQuery = ""
    @Published var selectedCategory: String?
    @Published var minImportance: Double = 0.0
    @Published var hasMore = true

    private var offset = 0
    private let pageSize = 20
    private var searchTask: Task<Void, Never>?

    func load() async {
        offset = 0
        hasMore = true
        isLoading = true
        defer { isLoading = false }
        do {
            items = try await APIClient.shared.fetchKnowledge(
                category: selectedCategory,
                minImportance: minImportance,
                limit: pageSize
            )
            offset = items.count
            hasMore = items.count == pageSize
        } catch {}
    }

    func loadMore() async {
        guard hasMore, !isLoading else { return }
        do {
            let more = try await APIClient.shared.fetchKnowledge(
                category: selectedCategory,
                minImportance: minImportance,
                limit: pageSize,
                offset: offset
            )
            items.append(contentsOf: more)
            offset += more.count
            hasMore = more.count == pageSize
        } catch {}
    }

    func search(query: String) async {
        searchTask?.cancel()
        guard !query.isEmpty else { await load(); return }
        searchTask = Task {
            try? await Task.sleep(for: .milliseconds(400))
            guard !Task.isCancelled else { return }
            do {
                items = try await APIClient.shared.searchKnowledge(query: query, limit: pageSize)
                hasMore = false
            } catch {}
        }
    }
}
