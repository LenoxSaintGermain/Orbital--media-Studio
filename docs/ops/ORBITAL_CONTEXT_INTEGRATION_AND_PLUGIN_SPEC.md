# Orbital Context Integration and Plugin Spec

Last updated: 2026-05-03

Linear: `THI-58`, `THI-68`

## Decision

Use the existing GitHub repo as the source of truth:

- Repo: `https://github.com/LenoxSaintGermain/orbital-context`
- Local checkout: `/Users/lenoxparis/conductor/repos/orbital-context`
- Current branch: `main`
- Current baseline commit: `07f9f94`
- AI Studio source: `https://ai.studio/apps/drive/16c0y0ZOAXsGz_ejUE2UhtLIVcJhT-OCY`

Do not create a replacement repo unless the existing repo becomes unrecoverable.

## Current Deployed State

Pre-prod/original project:

- GCP project: `third-signal`
- Cloud Run service: `orbital-context`
- Region: `us-west1`
- Revision: `orbital-context-00001-4bn`
- URL: `https://orbital-context-pplaphmpxq-uw.a.run.app`
- Image: `us-docker.pkg.dev/cloudrun/container/aistudio/applet-proxy`
- Runtime env observed: `API_KEY`

This service is a useful running prototype, not a production-ready implementation.

## Current Code Findings

The repo is a Vite React app generated from Google AI Studio.

Current capabilities:

- Captures screen/video buffers through `navigator.mediaDevices.getDisplayMedia`.
- Sends short video buffers to Gemini for multimodal context analysis.
- Generates UI widgets such as summary, action list, code assistant, data view, alert, and archive ticket.
- Stores sessions in named Firestore database `orbital-context`.
- Stores screen recordings in Firebase Storage under `recordings/`.
- Falls back to browser localStorage when cloud persistence fails.
- Implements a "Tab Hospice" / Archivist mode for preserving tab intent before closing.

Current blockers:

- `vite.config.ts` injects `GEMINI_API_KEY` into browser code as `process.env.API_KEY`.
- `services/geminiService.ts` calls Gemini directly from the client.
- `firestore.rules` allows public read/write to `sessions`.
- `storage.rules` allows public read/write to `recordings`.
- `services/firebase.ts` points at the original `third-signal` Firebase project.
- No Swarm trace ID is emitted for captures, uploads, analysis, or saves.
- No Librarian, Agent Wiki, Armory/Ghost, Field Guide, Research OS, Linear, or `#admin` integration is implemented.
- No Manifest V3 browser extension package exists yet.

## Production Architecture

Refactor the repo into three deployable surfaces and one shared package:

```text
packages/context-core/
  capture-card schema
  redaction report schema
  A2UI card mappers
  Swarm event types

apps/orbital-context-run/
  Cloud Run web app for logged-in Orbital users

apps/orbital-context-api/
  server-side context broker
  Gemini analysis calls
  Firebase/Admin writes
  Swarm trace emission
  Librarian/Agent Wiki/Armory/Research/Linear handoffs

apps/orbital-context-extension/
  Manifest V3 browser extension
  side panel
  active tab capture
  selection capture
  proof capture
```

The existing React app should become the starting UI shell, not the final runtime boundary.

## Security Rules

Production rules:

- No Gemini, OpenAI, Anthropic, Poe, ElevenLabs, Firebase Admin, Supabase service-role, or other privileged provider key may be bundled into browser or extension code.
- Browser clients call `apps/orbital-context-api` with a logged-in user/session token.
- Gemini analysis happens server-side, or through short-lived ephemeral credentials when the provider explicitly supports them.
- Firestore and Storage writes happen through Firebase Admin or locked user-scoped rules.
- Raw screenshots/video require explicit user action, retention metadata, and deletion policy.
- Store secret references only, never secret values.
- Add redaction before persistence and before sending to external models.
- Extension permissions should default to `activeTab`, `scripting`, `storage`, `sidePanel`, and `contextMenus`; host permissions must be explicit and optional.

## Capture Card Contract

Every browser or app context capture should become a `CaptureCard`.

```json
{
  "id": "ctx_...",
  "schema_version": "1.0",
  "source_surface": "orbital-context-extension|orbital-context-run|orbital-studio",
  "visibility": "public|internal|operator_only",
  "consent": {
    "operator_triggered": true,
    "capture_mode": "selection|tab|screenshot|video_pulse|manual_note"
  },
  "page": {
    "url": "https://example.com",
    "title": "Page title",
    "origin": "example.com",
    "visible_headings": []
  },
  "content": {
    "selection": "selected text",
    "operator_note": "what Lenox said or typed",
    "semantic_snippets": []
  },
  "media": {
    "screenshot_ref": "gs://...",
    "video_ref": "gs://...",
    "thumbnail_ref": "gs://..."
  },
  "analysis": {
    "user_context": "brief context",
    "user_intent": "hypothesis",
    "confidence": 0.82,
    "widgets": []
  },
  "routing": {
    "swarm_trace_id": "trace_...",
    "target_agents": ["alfred", "librarian", "research_os"],
    "target_surfaces": ["agent_wiki", "field_guide", "armory", "admin"]
  },
  "safety": {
    "redaction_report": [],
    "model_policy": "server_side_or_ephemeral_token",
    "retention": "default_30_days"
  },
  "created_at": "2026-05-03T00:00:00Z"
}
```

## Orbital Integration

Orbital Context should feed the operating layer rather than become a separate destination.

Required routes:

- Alfred receives context cards for voice-led planning and walkthrough narration.
- Swarm receives `context.capture.created`, `context.analysis.completed`, `context.handoff.requested`, and `context.saved` events.
- Librarian receives approved captures for Agent Wiki, Field Guide, and artifact storage.
- Agent Wiki receives compiled, cited pages/cards only after Librarian approval.
- Field Guide receives human-readable documentation outputs generated from approved captures.
- Armory receives provider/tool/capability observations and Ghost warnings, not raw browser surveillance.
- Ghost reads Armory and context-card metadata to flag stale tools, risky permissions, missing traces, and unsafe captures.
- Research OS receives research tasks and claim-check requests generated from selected context.
- `#admin` shows capture queue, trace ID, redaction status, target agents, approvals, and save/publish state.
- Signal Card/Donna can only receive public-safe summaries.

## Browser Plugin Product

Commercial product direction:

- Free: manual capture to Orbital account, limited history, local-only mode.
- Pro: saved context memory, summaries, research queue, Orbital/Alfred handoffs.
- Team: shared context spaces, admin controls, Linear/Jira/Drive integrations, audit logs.
- Enterprise: SSO, DLP/redaction policies, retention controls, private model routing, compliance exports.

Plugin promise:

- "Capture the live context of your work and hand it to your AI operating layer without leaking keys or living inside another wrapper."

Do not ship the plugin until the server broker, auth, redaction, trace IDs, and retention policy exist.

## Model and Framework Policy

Gemini Live:

- Preserve the current user-confirmed Gemini 3.1 Live Preview path for Orbital voice.
- Use `GEMINI_LIVE_MODEL` as a runtime alias.
- Update the alias when the model goes GA without code changes.
- Follow production guidance: standard API keys must not be exposed to browser clients; use server mediation or ephemeral tokens.

Gemini video/context analysis:

- `orbital-context` currently uses `ORBITAL_CONTEXT_MODEL=gemini-3.1-pro-preview`.
- Keep the model string behind `ORBITAL_CONTEXT_MODEL`.
- Add capability probing for video input and structured JSON output.

ADK:

- ADK 2.0 remains pre-prod/lab first because Google documents it as beta/pre-GA.
- Use it for demo-director prototypes, graph workflows, and agent-team experiments before production adoption.

A2UI:

- Treat A2UI as a public-preview declarative UI contract.
- Agents emit data/cards; Orbital renders trusted local components.
- Do not let agents send executable UI code.

## Order of Operations

1. Freeze the existing repo baseline and add provenance.
2. Create `codex/orbital-context-integration` in the `orbital-context` repo.
3. Remove direct browser Gemini calls and build the server-side context broker.
4. Lock Firestore and Storage rules.
5. Add `CaptureCard` schema and context-core package.
6. Wire Swarm trace events and `#admin` capture visibility.
7. Add Librarian intake for approved captures.
8. Add Agent Wiki, Field Guide, Armory/Ghost, and Research OS handoff contracts.
9. Deploy the refactored Cloud Run app/API into `third-signal-v2`.
10. Build the Manifest V3 browser extension against the production API.
11. Run pre-prod demo tests in `third-signal`.
12. Promote to production only after security, trace, retention, and rollback checks pass.

## Linear Breakdown

Parent:

- `THI-58`: Promote Orbital Context as browser/plugin context layer for Orbital.

Execution issues:

- `THI-68`: Design Orbital Context browser bridge for voice-led demos.
- `THI-79`: Orbital Context repo baseline and provenance freeze.
- `THI-80`: Build Orbital Context server-side context broker.
- `THI-81`: Define CaptureCard schema, redaction, and context-core package.
- `THI-82`: Wire Orbital Context to Swarm traces and `#admin` queue.
- `THI-83`: Add Librarian, Agent Wiki, Field Guide, Armory/Ghost, and Research OS handoffs for Orbital Context.
- `THI-84`: Deploy refactored Orbital Context app and API to `third-signal-v2`.
- `THI-85`: Build Orbital Context Manifest V3 browser extension MVP.
- `THI-86`: Package Orbital Context as commercial plugin product.

## Source References

- ADK 2.0 beta: https://adk.dev/2.0/
- A2UI public preview: https://github.com/google/a2ui
- Gemini Live API production integration guidance: https://ai.google.dev/gemini-api/docs/live-api
