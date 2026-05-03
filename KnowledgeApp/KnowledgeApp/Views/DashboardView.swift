import SwiftUI

struct DashboardView: View {
    @StateObject private var vm = DashboardViewModel()

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    statsGrid
                    focusAreasSection
                    insightsSection
                    opportunitiesSection
                }
                .padding()
            }
            .navigationTitle("Intelligence Hub")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button {
                        Task { await vm.refresh() }
                    } label: {
                        Image(systemName: "arrow.clockwise")
                    }
                    .disabled(vm.isLoading)
                }
            }
            .task { await vm.refresh() }
            .overlay {
                if vm.isLoading {
                    ProgressView()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                        .background(.ultraThinMaterial)
                }
            }
            .alert("Error", isPresented: .constant(vm.errorMessage != nil)) {
                Button("OK") { vm.errorMessage = nil }
            } message: {
                Text(vm.errorMessage ?? "")
            }
        }
    }

    // MARK: - Stats Grid

    private var statsGrid: some View {
        LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
            if let stats = vm.stats {
                StatCard(value: stats.knowledgeItems, label: "Knowledge", icon: "brain", color: .blue)
                StatCard(value: stats.ideas,          label: "Ideas",     icon: "lightbulb.fill", color: .yellow)
                StatCard(value: stats.opportunities,  label: "Opps",      icon: "star.fill", color: .orange)
                StatCard(value: stats.contacts,       label: "Contacts",  icon: "person.2.fill", color: .teal)
                StatCard(value: stats.contentLibrary, label: "Content",   icon: "doc.text.fill", color: .green)
                StatCard(value: stats.activeInsights, label: "Insights",  icon: "bell.badge.fill", color: .red)
            } else {
                ForEach(0..<6) { _ in
                    StatCard(value: nil, label: "—", icon: "circle.fill", color: .gray)
                }
            }
        }
    }

    // MARK: - Focus Areas

    private var focusAreasSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            SectionHeader(title: "What You Focus On", icon: "scope")

            if vm.focusAreas.isEmpty {
                EmptyCard(message: "No focus data yet")
            } else {
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 10) {
                        ForEach(vm.focusAreas.prefix(10)) { area in
                            FocusAreaChip(area: area)
                        }
                    }
                    .padding(.horizontal, 2)
                }
            }
        }
    }

    // MARK: - Insights

    private var insightsSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            SectionHeader(title: "Top Insights", icon: "bell.badge.fill")

            if vm.insights.isEmpty {
                EmptyCard(message: "No insights yet — run the analysis engine")
            } else {
                ForEach(vm.insights.prefix(3)) { insight in
                    InsightCard(insight: insight) {
                        Task { await vm.dismiss(insight: insight) }
                    }
                }
            }

            Button {
                Task { await vm.generateInsights() }
            } label: {
                Label("Generate New Insights", systemImage: "wand.and.stars")
                    .frame(maxWidth: .infinity)
            }
            .buttonStyle(.bordered)
            .tint(.purple)
        }
    }

    // MARK: - Opportunities

    private var opportunitiesSection: some View {
        VStack(alignment: .leading, spacing: 10) {
            SectionHeader(title: "Opportunity Pipeline", icon: "chart.line.uptrend.xyaxis")

            if vm.opportunities.isEmpty {
                EmptyCard(message: "No opportunities found yet")
            } else {
                ForEach(vm.opportunities.prefix(3)) { opp in
                    OpportunityCard(opportunity: opp)
                }
            }
        }
    }
}

// MARK: - View Model

@MainActor
final class DashboardViewModel: ObservableObject {
    @Published var stats: KnowledgeStats?
    @Published var focusAreas: [FocusArea] = []
    @Published var insights: [Insight] = []
    @Published var opportunities: [Opportunity] = []
    @Published var isLoading = false
    @Published var errorMessage: String?

    func refresh() async {
        isLoading = true
        defer { isLoading = false }
        do {
            async let s = APIClient.shared.fetchStats()
            async let f = APIClient.shared.fetchFocusAreas()
            async let i = APIClient.shared.fetchInsights(priority: nil, limit: 5)
            async let o = APIClient.shared.fetchOpportunities(limit: 5)
            (stats, focusAreas, insights, opportunities) = try await (s, f, i, o)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func generateInsights() async {
        do {
            try await APIClient.shared.triggerInsightGeneration()
            try await Task.sleep(for: .seconds(2))
            insights = try await APIClient.shared.fetchInsights(limit: 5)
        } catch {
            errorMessage = error.localizedDescription
        }
    }

    func dismiss(insight: Insight) async {
        do {
            try await APIClient.shared.dismissInsight(id: insight.id)
            insights.removeAll { $0.id == insight.id }
        } catch {
            errorMessage = error.localizedDescription
        }
    }
}
