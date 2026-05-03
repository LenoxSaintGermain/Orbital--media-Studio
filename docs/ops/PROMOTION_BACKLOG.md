# Orbital Promotion Backlog

Last updated: 2026-05-03

This backlog tracks V1, Manus, and sandbox assets that should be evaluated for promotion into the v2 production ecosystem.

## Promotion Criteria

An asset can move from sandbox to production only when it has:

- GitHub source of truth.
- Owner and operator purpose.
- Target production service or hosting path.
- Runtime secrets stored outside the repo.
- Health check.
- Rollback path.
- Swarm/Librarian/Alfred integration note.
- Linear ticket.

## Candidates

| Candidate | Current source | Target role | Status |
| --- | --- | --- | --- |
| Third Signal Agent Wiki | New spec | Compiled, cited, agent-readable operating memory | Spec created in `THI-72` |
| Orbital Field Guide | V1/pre-prod | Searchable operating manual for Alfred and Orbital | Needs repo/deploy confirmation |
| Research OS MCP | V1/research lane | Typed research handoffs and writebacks | Not yet promoted |
| Orbital Context | Existing repo `LenoxSaintGermain/orbital-context`; V1 Cloud Run service in `third-signal` | Browser/plugin context layer for Orbital | Source confirmed; refactor/security gate required before v2 promotion |
| Orbital Voice Co-Producer | Orbital OS / new upgrade track | Voice-native walkthrough and video co-production layer | Linear parent `THI-61`; tracks `THI-62`-`THI-69` |
| Arsenal | `third-signal-skill-packs` | Skill-pack/protocol catalog for Alfred and Swarm | Needs index and retrieval contract |
| Armory | Orbital module, path not exposed in current checkout | Operational equipment/context registry updated by Librarian; Ghost operates there | Needs module restore/wiring via `THI-71` |
| Orbital Manifest | Orbital docs | Machine-readable operating truth | Exists; runtime consumption not confirmed |
| TSL Brand Guide | Manus-hosted, GitHub-backed | Brand system site in GCP | Needs import plan |
| Other Manus assets | Manus/GitHub | Approved production surfaces | Inventory required |

## Knowledge Surface Gate

Before Alfred, Swarm, or Librarian treats a knowledge surface as live, it needs:

- Canonical repo/path.
- Owner.
- Update workflow.
- Retrieval contract.
- Swarm trace behavior.
- Librarian ingest path.
- Health or freshness check.

Current audit:

- Third Signal Agent Wiki is specified in `docs/ops/THIRD_SIGNAL_AGENT_WIKI_SPEC.md` and tracked by `THI-72`.
- Arsenal exists publicly as `https://github.com/LenoxSaintGermain/third-signal-skill-packs`.
- Armory is user-confirmed as an Orbital module, but no `armory` path/component/API is exposed by name in the current checkout.
- Orbital Manifest exists at `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json`.
- Orbital Field Guide remains unconfirmed as a deployed/retrievable source and is tracked by `THI-56`.
- Knowledge registry mapping is tracked by `THI-70`.
- Armory module restore plus Librarian/Ghost contract is tracked by `THI-71`.
- Orbital Context integration and plugin plan is specified in `docs/ops/ORBITAL_CONTEXT_INTEGRATION_AND_PLUGIN_SPEC.md` and tracked by `THI-58`/`THI-68`.

## Agent Wiki Gate

The Third Signal Agent Wiki should become the compiled context layer behind the Field Guide, Armory, Arsenal, Manifest, Alfred, Swarm, Donna, Librarian, Ghost, and Research OS.

Do not mark it production-ready until:

- `docs/agent-wiki/AGENT_WIKI_SCHEMA.md`, `index.md`, and `log.md` exist.
- Agent consumers and visibility tiers are enforced.
- Retrieval returns cited pages, cards, claims, stale items, and follow-ups.
- Librarian has a canonical write/propose workflow.
- Ghost has a lint/observation workflow.
- Donna/Signal Card only receives public-safe context.
- Swarm emits trace IDs for every retrieval and update.
- Secret values are excluded.

## Armory Module Gate

Armory is not an external docs repo. It is an Orbital module.

Target role:

- Operational registry of tools, adapters, provider capabilities, health, scopes, approval gates, and runbooks.
- Updated by Librarian as part of its scheduled jobs.
- Used by Ghost as the ambient context and warning layer inside Orbital.

Do not mark Armory production-ready until:

- Module path or route is confirmed in Git source of truth.
- Storage/data model is documented.
- Librarian write/update contract exists.
- Ghost read/write behavior is documented.
- Swarm emits trace IDs for Armory reads, updates, and Ghost interventions.
- No secret values are stored in Armory; only secret references and capability metadata.

## Orbital Voice Co-Producer Direction

Orbital should become a true agentic operating layer, not just a voice-navigable UI.

North Star:

- Lenox talks.
- Alfred directs the conversation and story arc.
- Orbital operates the demo surfaces and adapters.
- Swarm records every intent, action, proof point, approval, and handoff.
- Research OS checks public claims.
- Librarian stores the produced artifact package.
- `#admin` shows run state, approvals, and publishing readiness.

Deliverable:

- Pilot video package: `Introducing Orbital`.
- Reusable walkthrough system for future Orbital video series.
- Output artifacts: scene graph, transcript, captions, proof log, timeline JSON, asset manifest, and video-ready export path.

Linear:

- `THI-61`: North Star parent
- `THI-62`: Voice navigation audit and intent taxonomy
- `THI-63`: Gemini Live voice session broker
- `THI-64`: A2UI scene graph and approval-card contract
- `THI-65`: ADK 2.0 demo director pre-prod prototype
- `THI-66`: Walkthrough capture and video production pipeline
- `THI-67`: Swarm, Librarian, `#admin`, and Research OS trace wiring
- `THI-68`: Orbital Context browser bridge for voice-led demos
- `THI-69`: `Introducing Orbital` pilot package

## Backlog Order of Operations

Run the program in this order:

1. Stabilize production and environment truth: keep `third-signal-v2` as production, `third-signal` as pre-prod, vanity domains on v2 only, health checks passing.
2. Freeze source and security baselines: clean Git history, document provenance, remove/broker secrets, lock storage rules.
3. Stand up the shared knowledge layer: Agent Wiki, Manifest ingestion, Librarian write path, Armory/Ghost contract, Field Guide source confirmation.
4. Promote Orbital Context safely: `THI-79` through `THI-84` before any public extension or vanity-domain exposure.
5. Wire orchestration: Swarm trace IDs, `#admin` queues, Research OS handoffs, Donna public-safe summaries.
6. Upgrade Orbital voice co-producer: Gemini Live session broker, A2UI cards, ADK 2.0 pre-prod graph, capture/video pipeline.
7. Build the browser plugin and commercial layer: `THI-85` and `THI-86` only after the secure v2 API and trace gates exist.
8. Produce the first launch artifact: `Introducing Orbital` pilot with transcript, proof log, scene graph, captions, timeline JSON, asset manifest, and video-ready export.

Critical dependency:

- Do not deploy the current `orbital-context` prototype as production. `THI-80`, `THI-81`, `THI-82`, and `THI-84` must land before plugin packaging or public launch.

## Orbital Context Product Direction

Orbital Context should become the connective browser layer:

- Browser capture.
- Context cards.
- Research queue.
- Librarian save.
- Alfred handoff.
- Linear issue creation.
- Swarm trace ID on every action.
- Voice-led walkthrough capture.
- A2UI proof cards and scene cards for demos.

The goal is not another wrapper. The goal is to make web work an input to Orbital.

Current source:

- Repo: `https://github.com/LenoxSaintGermain/orbital-context`
- Local checkout: `/Users/lenoxparis/conductor/repos/orbital-context`
- Pre-prod Cloud Run URL: `https://orbital-context-pplaphmpxq-uw.a.run.app`
- Original project: `third-signal`
- Target project: `third-signal-v2`

Promotion gate:

- Remove direct browser Gemini calls and move model access behind a server-side context broker.
- Replace client-side `GEMINI_API_KEY` injection with server-side secrets or provider-supported ephemeral credentials.
- Lock Firestore and Storage rules; current repo rules are open for dev.
- Add the `CaptureCard` schema and redaction report.
- Emit Swarm trace IDs for every capture, analysis, save, and handoff.
- Show capture queue, redaction, approvals, and trace status in `#admin`.
- Add Librarian intake for approved captures.
- Route compiled outputs into Agent Wiki, Field Guide, Armory/Ghost, and Research OS.
- Deploy app/API to `third-signal-v2` before building the commercial Manifest V3 extension.

## Research OS MCP Gate

Do not turn on production Research OS MCP until:

- v2 endpoint is confirmed.
- Auth path is confirmed.
- Secrets are rotated and stored server-side.
- Research output schema is documented.
- Swarm writeback path is tested.

## Manus Asset Gate

Before moving a Manus asset into GCP:

- Confirm repo and build command.
- Confirm static vs server runtime.
- Assign subdomain.
- Add Cloud Run/static deploy.
- Add health check.
- Add Librarian ingest path if it documents the brand or system.
