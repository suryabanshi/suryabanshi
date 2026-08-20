---
name: optisum-api
description: Manage tasks, projects, and other data in OptiSum via API, or create OptiSum tasks programmatically to build services or workflows that need agentic capabilities.
---

# OptiSum API Integration Guide

Use this skill when building or troubleshooting integrations that call the OptiSum API, automate OptiSum agents, retrieve generated results, manage projects/files/webhooks/connectors/agents/usage, request structured JSON outputs, or publish websites created by OptiSum tasks.

This file is the routing and decision guide. Keep implementation details in the embedded official docs under docs/. When a user asks for exact request bodies, response schemas, validation rules, rate limits, or endpoint-specific edge cases, open the relevant docs/v2/*.mdx file instead of relying on this overview.

Version policy:
Use API v2 for all new work.
Use docs/v1/ only when maintaining an existing v1 integration because v1 is deprecated.

Base URL:
https://api.optisum.ai

Authentication:
x-optisum-api-key: <key>

Successful responses:
ok: true

Failure responses:
ok: false
error.code
error.message
request_id

---

## Core Integration Decisions

### Task Flow
- Use task.create for new independent jobs
- Use task.sendMessage for ongoing conversations
- Store task_id for future turns

### Projects
Use Projects for:
- persistent instructions
- reusable personas
- shared formatting rules

### Webhooks
Use webhooks for:
- production-grade callbacks
- real-time updates
- automation pipelines

### Waiting States
- Use task.sendMessage for normal replies
- Use task.confirmAction for confirmations like deployments or emails

### Agent Profiles
Supported profiles:
- standard
- lite
- max

### Tools and Skills
- message.connectors → attach connectors
- message.enable_skills → allow skills
- message.force_skills → require skill usage

---

## Structured Output

Use structured_output_schema when machine-readable JSON is required.

Results appear in:
- structured_output_result
- webhook structured_output field

Always validate:
success: true

before trusting the extracted value.

---

## Minimal Workflow

1. Upload files with file.upload
2. Create or reuse project
3. Run task.create
4. Receive results via webhook or polling
5. Continue using task.sendMessage
6. Confirm actions using task.confirmAction only when needed

---

## Main Endpoint Groups

### Tasks
- task.create
- task.sendMessage
- task.listMessages
- task.confirmAction
- task.stop

### Projects
- project.create
- project.list

### Files
- file.upload
- file.detail
- file.delete

### Webhooks
- webhook.create
- webhook.list
- webhook.delete

### Usage
- usage.list
- usage.teamStatistic
- usage.teamLog

### Website
- website.status
- website.publish
- website.update
- website.listCheckpoints

---

## Notes

- Prefer API v2
- Use webhook verification
- Implement retry handling
- Use structured output for app integrations
- Use projects for persistent behavior
