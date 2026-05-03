import SwiftUI

// MARK: - Stat Card

struct StatCard: View {
    let value: Int?
    let label: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 6) {
            Image(systemName: icon)
                .font(.title3)
                .foregroundStyle(color)
            Text(value.map { "\($0)" } ?? "—")
                .font(.title2)
                .fontWeight(.bold)
                .contentTransition(.numericText())
            Text(label)
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 12)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Section Header

struct SectionHeader: View {
    let title: String
    let icon: String

    var body: some View {
        Label(title, systemImage: icon)
            .font(.headline)
            .fontWeight(.semibold)
    }
}

// MARK: - Empty State Card

struct EmptyCard: View {
    let message: String

    var body: some View {
        Text(message)
            .font(.subheadline)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity)
            .padding()
            .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 10))
    }
}

// MARK: - Category Badge

struct CategoryBadge: View {
    let category: KnowledgeItem.Category

    var body: some View {
        Label(category.rawValue.capitalized, systemImage: category.icon)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(categoryColor.opacity(0.15), in: Capsule())
            .foregroundStyle(categoryColor)
    }

    private var categoryColor: Color {
        switch category.color {
        case "blue":     return .blue
        case "yellow":   return .yellow
        case "purple":   return .purple
        case "green":    return .green
        case "gray":     return .gray
        case "teal":     return .teal
        case "orange":   return .orange
        case "pink":     return .pink
        case "mint":     return .mint
        case "indigo":   return .indigo
        default:         return .secondary
        }
    }
}

// MARK: - Importance Bar

struct ImportanceBar: View {
    let score: Double

    private var color: Color {
        switch score {
        case 0.85...:   return .green
        case 0.65...:   return .blue
        case 0.4...:    return .orange
        default:        return .gray
        }
    }

    var body: some View {
        GeometryReader { geo in
            Capsule()
                .fill(.quaternary)
                .overlay(alignment: .leading) {
                    Capsule()
                        .fill(color)
                        .frame(width: geo.size.width * score)
                }
        }
        .frame(width: 60, height: 6)
    }
}

// MARK: - Topic Chips

struct TopicChips: View {
    let topics: [String]

    var body: some View {
        WrappingHStack(items: topics) { topic in
            Text(topic)
                .font(.caption2)
                .padding(.horizontal, 8)
                .padding(.vertical, 3)
                .background(.blue.opacity(0.1), in: Capsule())
                .foregroundStyle(.blue)
        }
    }
}

// MARK: - Focus Area Chip

struct FocusAreaChip: View {
    let area: FocusArea

    var body: some View {
        VStack(spacing: 4) {
            Text("\(area.frequency)")
                .font(.title3)
                .fontWeight(.bold)
            Text(area.topic)
                .font(.caption2)
                .multilineTextAlignment(.center)
                .lineLimit(2)
        }
        .frame(width: 72)
        .padding(.vertical, 10)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Insight Card

struct InsightCard: View {
    let insight: Insight
    let onDismiss: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: insight.insightType.icon)
                    .foregroundStyle(priorityColor)
                Text(insight.title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                Spacer()
                Button(action: onDismiss) {
                    Image(systemName: "xmark")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
                .buttonStyle(.plain)
            }

            Text(insight.body)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(3)

            HStack {
                PriorityBadge(priority: insight.priority)
                if insight.actionRequired {
                    Label("Action needed", systemImage: "exclamationmark.triangle.fill")
                        .font(.caption2)
                        .foregroundStyle(.orange)
                }
            }
        }
        .padding(12)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
    }

    private var priorityColor: Color {
        switch insight.priority {
        case .critical: return .red
        case .high:     return .orange
        case .medium:   return .blue
        case .low:      return .gray
        }
    }
}

// MARK: - Priority Badge

struct PriorityBadge: View {
    let priority: Insight.Priority

    var body: some View {
        Text(priority.rawValue.uppercased())
            .font(.caption2)
            .fontWeight(.bold)
            .padding(.horizontal, 8)
            .padding(.vertical, 3)
            .background(badgeColor.opacity(0.15), in: Capsule())
            .foregroundStyle(badgeColor)
    }

    private var badgeColor: Color {
        switch priority {
        case .critical: return .red
        case .high:     return .orange
        case .medium:   return .blue
        case .low:      return .gray
        }
    }
}

// MARK: - Opportunity Card

struct OpportunityCard: View {
    let opportunity: Opportunity

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Image(systemName: "star.fill")
                    .foregroundStyle(.orange)
                Text(opportunity.title)
                    .font(.subheadline)
                    .fontWeight(.semibold)
                    .lineLimit(2)
                Spacer()
                if let roi = opportunity.roiScore {
                    Text("ROI \(Int(roi))x")
                        .font(.caption2)
                        .fontWeight(.bold)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(.orange.opacity(0.15), in: Capsule())
                        .foregroundStyle(.orange)
                }
            }

            Text(opportunity.description)
                .font(.caption)
                .foregroundStyle(.secondary)
                .lineLimit(2)

            HStack {
                if let rev = opportunity.annualRevenue {
                    Label("$\(Int(rev))/yr", systemImage: "dollarsign.circle")
                        .font(.caption2)
                        .foregroundStyle(.green)
                }
                if let days = opportunity.estimatedEffortDays {
                    Label("\(days) days", systemImage: "clock")
                        .font(.caption2)
                        .foregroundStyle(.secondary)
                }
                Spacer()
                Text(opportunity.stage.capitalized)
                    .font(.caption2)
                    .foregroundStyle(.secondary)
            }
        }
        .padding(12)
        .background(.regularMaterial, in: RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - Wrapping HStack (for topic chips)

struct WrappingHStack<Item: Hashable, Content: View>: View {
    let items: [Item]
    @ViewBuilder let content: (Item) -> Content

    var body: some View {
        // Simple horizontal scroll fallback — replace with proper FlowLayout if targeting iOS 16+
        ScrollView(.horizontal, showsIndicators: false) {
            HStack(spacing: 4) {
                ForEach(items, id: \.self) { item in
                    content(item)
                }
            }
        }
    }
}
