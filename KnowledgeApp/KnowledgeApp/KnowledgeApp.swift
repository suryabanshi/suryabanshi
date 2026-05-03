import SwiftUI

@main
struct KnowledgeApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    var body: some View {
        TabView {
            DashboardView()
                .tabItem {
                    Label("Dashboard", systemImage: "chart.bar.xaxis")
                }

            KnowledgeListView()
                .tabItem {
                    Label("Knowledge", systemImage: "brain")
                }

            QuickCaptureView()
                .tabItem {
                    Label("Capture", systemImage: "plus.circle.fill")
                }

            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape.fill")
                }
        }
        .tint(.purple)
    }
}
