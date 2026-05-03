# Zapier Automation Workflows

These Zaps complement the n8n master workflow for event-driven ingestion.

---

## Zap 1: New Google Drive File → Ingest

**Trigger:** Google Drive — New File in Folder  
**Action:** Webhooks by Zapier — POST  
```
URL: https://your-api.com/api/v1/ingest/webhook
Body: {
  "source_type": "google_drive",
  "external_id": "{{drive_file_id}}",
  "title": "{{filename}}",
  "url": "{{drive_url}}"
}
```
**Use case:** Zero-lag ingestion when you save a new document to Drive.

---

## Zap 2: New Notion Page → Ingest

**Trigger:** Notion — New Database Item  
**Action:** Webhooks by Zapier — POST  
```
URL: https://your-api.com/api/v1/ingest/webhook
Body: {
  "source_type": "notion",
  "external_id": "{{page_id}}",
  "title": "{{page_title}}"
}
```

---

## Zap 3: New Email (Gmail) → Ingest

**Trigger:** Gmail — New Email matching filter (label: "knowledge" OR "save")  
**Action:** Webhooks — POST  
```
Body: {
  "source_type": "email",
  "title": "{{subject}}",
  "raw_content": "{{body_plain}}",
  "source_url": "{{message_url}}"
}
```

---

## Zap 4: High-Value Opportunity → Notify

**Trigger:** Webhooks by Zapier — Catch Hook (fired from API when importance_score > 0.85)  
**Actions:**
1. Slack — Send message to #opportunities channel  
2. Gmail — Send email digest  
3. Google Sheets — Append row to "Opportunities Tracker"

---

## Zap 5: New RSS/Newsletter → Ingest

**Trigger:** RSS by Zapier — New Item in Feed  
**Action:** Webhooks — POST  
```
Body: {
  "source_type": "rss",
  "title": "{{title}}",
  "raw_content": "{{summary}}",
  "source_url": "{{url}}",
  "source_metadata": {"feed": "{{feed_title}}", "author": "{{author}}"}
}
```

---

## Zap 6: Twitter/X Saved Tweet → Ingest

**Trigger:** Twitter — New Liked Tweet  
**Action:** Webhooks — POST  
```
Body: {
  "source_type": "twitter",
  "title": "Tweet by @{{user_screen_name}}",
  "raw_content": "{{full_text}}",
  "source_url": "https://twitter.com/{{user_screen_name}}/status/{{id_str}}"
}
```

---

## Zap 7: Pocket/Instapaper Save → Ingest

**Trigger:** Pocket — New Saved Item  
**Action:** Webhooks — POST  
```
Body: {
  "source_type": "pocket",
  "title": "{{title}}",
  "raw_content": "{{excerpt}}",
  "source_url": "{{url}}"
}
```

---

## Make.com (Integromat) Scenario: Daily Intelligence Report

**Schedule:** Every day at 8:00 AM  
**Modules:**
1. HTTP — GET `https://your-api.com/api/v1/insights?limit=5&priority=high`  
2. HTTP — GET `https://your-api.com/api/v1/opportunities?stage=discovered&limit=3`  
3. Text Parser — Format digest  
4. Gmail — Send "Daily Intelligence Report"  
5. Notion — Create "Daily Digest" page in your Inbox database  

---

## Webhook Payload Schema (API-side)

All ingest webhooks expect:
```json
{
  "source_type": "string",
  "title": "string (optional)",
  "raw_content": "string (optional — fetched if URL provided)",
  "source_url": "string (optional)",
  "external_id": "string (optional)",
  "source_metadata": "object (optional)"
}
```
Response: `{"status": "queued", "raw_doc_id": "uuid"}`
