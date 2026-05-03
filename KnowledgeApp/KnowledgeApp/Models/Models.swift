import Foundation

// MARK: - Knowledge Item

struct KnowledgeItem: Identifiable, Codable, Hashable {
    let id: String
    let title: String
    let summary: String
    let category: Category
    let subcategory: String?
    let importanceScore: Double
    let keyTopics: [String]
    let sentiment: String?
    let createdAt: String

    enum Category: String, Codable, CaseIterable {
        case business, idea, research, content, system
        case contact, opportunity, personal, finance, tech, other

        var icon: String {
            switch self {
            case .business:    return "briefcase.fill"
            case .idea:        return "lightbulb.fill"
            case .research:    return "magnifyingglass"
            case .content:     return "doc.text.fill"
            case .system:      return "gearshape.2.fill"
            case .contact:     return "person.fill"
            case .opportunity: return "star.fill"
            case .personal:    return "heart.fill"
            case .finance:     return "dollarsign.circle.fill"
            case .tech:        return "cpu.fill"
            case .other:       return "circle.fill"
            }
        }

        var color: String {
            switch self {
            case .business:    return "blue"
            case .idea:        return "yellow"
            case .research:    return "purple"
            case .content:     return "green"
            case .system:      return "gray"
            case .contact:     return "teal"
            case .opportunity: return "orange"
            case .personal:    return "pink"
            case .finance:     return "mint"
            case .tech:        return "indigo"
            case .other:       return "secondary"
            }
        }
    }

    enum CodingKeys: String, CodingKey {
        case id, title, summary, category, subcategory, sentiment
        case importanceScore  = "importance_score"
        case keyTopics        = "key_topics"
        case createdAt        = "created_at"
    }
}

// MARK: - Insight

struct Insight: Identifiable, Codable {
    let id: String
    let title: String
    let body: String
    let insightType: InsightType
    let priority: Priority
    let actionRequired: Bool
    let generatedAt: String

    enum InsightType: String, Codable {
        case focusArea  = "focus_area"
        case gap        = "gap"
        case opportunity
        case pattern    = "pattern"
        case warning    = "warning"

        var icon: String {
            switch self {
            case .focusArea:    return "scope"
            case .gap:          return "exclamationmark.triangle.fill"
            case .opportunity:  return "star.fill"
            case .pattern:      return "arrow.triangle.2.circlepath"
            case .warning:      return "bell.badge.fill"
            }
        }
    }

    enum Priority: String, Codable, Comparable {
        case low, medium, high, critical

        static func < (lhs: Priority, rhs: Priority) -> Bool {
            let order: [Priority] = [.low, .medium, .high, .critical]
            return order.firstIndex(of: lhs)! < order.firstIndex(of: rhs)!
        }

        var color: String {
            switch self {
            case .low:      return "gray"
            case .medium:   return "blue"
            case .high:     return "orange"
            case .critical: return "red"
            }
        }
    }

    enum CodingKeys: String, CodingKey {
        case id, title, body, priority
        case insightType    = "insight_type"
        case actionRequired = "action_required"
        case generatedAt    = "generated_at"
    }
}

// MARK: - Opportunity

struct Opportunity: Identifiable, Codable {
    let id: String
    let title: String
    let description: String
    let category: String?
    let stage: String
    let confidence: Double
    let estimatedRevenueMonthly: Double?
    let estimatedEffortDays: Int?
    let roiScore: Double?
    let projectName: String?

    var annualRevenue: Double? {
        estimatedRevenueMonthly.map { $0 * 12 }
    }

    enum CodingKeys: String, CodingKey {
        case id, title, description, category, stage, confidence
        case estimatedRevenueMonthly = "estimated_revenue_monthly"
        case estimatedEffortDays     = "estimated_effort_days"
        case roiScore                = "roi_score"
        case projectName             = "project_name"
    }
}

// MARK: - Focus Area

struct FocusArea: Identifiable, Codable {
    var id: String { topic }
    let topic: String
    let frequency: Int
    let avgImportance: Double

    enum CodingKeys: String, CodingKey {
        case topic, frequency
        case avgImportance = "avg_importance"
    }
}

// MARK: - Stats

struct KnowledgeStats: Codable {
    let knowledgeItems: Int
    let ideas: Int
    let opportunities: Int
    let contacts: Int
    let contentLibrary: Int
    let activeInsights: Int

    enum CodingKeys: String, CodingKey {
        case ideas, opportunities, contacts
        case knowledgeItems  = "knowledge_items"
        case contentLibrary  = "content_library"
        case activeInsights  = "active_insights"
    }
}

// MARK: - Quick Capture

struct QuickCaptureRequest: Codable {
    let sourceType: String
    let title: String?
    let rawContent: String
    let sourceUrl: String?

    enum CodingKeys: String, CodingKey {
        case title
        case sourceType  = "source_type"
        case rawContent  = "raw_content"
        case sourceUrl   = "source_url"
    }
}

struct IngestResponse: Codable {
    let status: String
    let rawDocId: String?

    enum CodingKeys: String, CodingKey {
        case status
        case rawDocId = "raw_doc_id"
    }
}
