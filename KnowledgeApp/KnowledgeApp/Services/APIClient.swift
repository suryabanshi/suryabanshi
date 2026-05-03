import Foundation

// MARK: - API Client

@MainActor
final class APIClient: ObservableObject {

    static let shared = APIClient()

    // Change this to your deployed API URL
    var baseURL: String {
        UserDefaults.standard.string(forKey: "api_base_url") ?? "http://localhost:8000"
    }

    private let session: URLSession = {
        let config = URLSessionConfiguration.default
        config.timeoutIntervalForRequest = 30
        return URLSession(configuration: config)
    }()

    private let decoder: JSONDecoder = {
        let d = JSONDecoder()
        d.keyDecodingStrategy = .convertFromSnakeCase
        return d
    }()

    // MARK: - Knowledge

    func fetchKnowledge(
        category: String? = nil,
        minImportance: Double = 0,
        limit: Int = 20,
        offset: Int = 0
    ) async throws -> [KnowledgeItem] {
        var params = "limit=\(limit)&offset=\(offset)&min_importance=\(minImportance)"
        if let cat = category { params += "&category=\(cat)" }
        return try await get("/api/v1/knowledge/?\(params)")
    }

    func fetchStats() async throws -> KnowledgeStats {
        try await get("/api/v1/knowledge/stats/overview")
    }

    func fetchFocusAreas() async throws -> [FocusArea] {
        try await get("/api/v1/knowledge/focus-areas")
    }

    func searchKnowledge(query: String, limit: Int = 10) async throws -> [KnowledgeItem] {
        struct SearchReq: Encodable { let query: String; let limit: Int }
        struct SearchResp: Decodable { let results: [KnowledgeItem] }
        let resp: SearchResp = try await post(
            "/api/v1/knowledge/search",
            body: SearchReq(query: query, limit: limit)
        )
        return resp.results
    }

    // MARK: - Insights

    func fetchInsights(priority: String? = nil, limit: Int = 20) async throws -> [Insight] {
        var params = "limit=\(limit)"
        if let p = priority { params += "&priority=\(p)" }
        return try await get("/api/v1/insights/?\(params)")
    }

    func triggerInsightGeneration() async throws {
        struct EmptyResp: Decodable {}
        let _: EmptyResp = try await post("/api/v1/insights/generate", body: EmptyBody())
    }

    func dismissInsight(id: String) async throws {
        let url = try makeURL("/api/v1/insights/\(id)/dismiss")
        var req = URLRequest(url: url)
        req.httpMethod = "PATCH"
        _ = try await session.data(for: req)
    }

    // MARK: - Opportunities

    func fetchOpportunities(stage: String? = nil, limit: Int = 20) async throws -> [Opportunity] {
        var params = "limit=\(limit)"
        if let s = stage { params += "&stage=\(s)" }
        return try await get("/api/v1/insights/opportunities?\(params)")
    }

    func triggerOpportunityMining() async throws {
        struct EmptyResp: Decodable {}
        let _: EmptyResp = try await post("/api/v1/insights/opportunities/find", body: EmptyBody())
    }

    // MARK: - Quick Capture

    func quickCapture(title: String?, content: String, sourceURL: String? = nil) async throws -> IngestResponse {
        let req = QuickCaptureRequest(
            sourceType: "manual",
            title: title,
            rawContent: content,
            sourceUrl: sourceURL
        )
        return try await post("/api/v1/ingest/webhook", body: req)
    }

    // MARK: - Sync

    func triggerSync() async throws {
        struct EmptyResp: Decodable {}
        let _: EmptyResp = try await post("/api/v1/sync/run", body: EmptyBody())
    }

    func fetchSyncStatus() async throws -> [String: Int] {
        try await get("/api/v1/sync/status")
    }

    // MARK: - Private helpers

    private func get<T: Decodable>(_ path: String) async throws -> T {
        let url = try makeURL(path)
        let (data, response) = try await session.data(from: url)
        try validate(response)
        return try decoder.decode(T.self, from: data)
    }

    private func post<Body: Encodable, T: Decodable>(_ path: String, body: Body) async throws -> T {
        let url = try makeURL(path)
        var req = URLRequest(url: url)
        req.httpMethod = "POST"
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.httpBody = try JSONEncoder().encode(body)
        let (data, response) = try await session.data(for: req)
        try validate(response)
        return try decoder.decode(T.self, from: data)
    }

    private func makeURL(_ path: String) throws -> URL {
        guard let url = URL(string: baseURL + path) else {
            throw APIError.invalidURL
        }
        return url
    }

    private func validate(_ response: URLResponse) throws {
        guard let http = response as? HTTPURLResponse else { return }
        guard (200..<300).contains(http.statusCode) else {
            throw APIError.httpError(http.statusCode)
        }
    }
}

// MARK: - Helpers

private struct EmptyBody: Encodable {}

enum APIError: LocalizedError {
    case invalidURL
    case httpError(Int)

    var errorDescription: String? {
        switch self {
        case .invalidURL:       return "Invalid API URL. Check Settings."
        case .httpError(let c): return "Server returned error \(c)."
        }
    }
}
