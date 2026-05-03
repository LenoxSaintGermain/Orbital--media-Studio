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
| Orbital Field Guide | V1/pre-prod | Searchable operating manual for Alfred and Orbital | Needs repo/deploy confirmation |
| Research OS MCP | V1/research lane | Typed research handoffs and writebacks | Not yet promoted |
| Orbital Context | V1 project | Browser/plugin context layer for Orbital | Promote and redesign |
| Orbital Voice Co-Producer | Orbital OS / new upgrade track | Voice-native walkthrough and video co-production layer | Linear parent `THI-61`; tracks `THI-62`-`THI-69` |
| Arsenal | `third-signal-skill-packs` | Skill-pack/protocol catalog for Alfred and Swarm | Needs index and retrieval contract |
| Armory | Unknown | Operational tool/provider inventory if still valid | Needs source confirmation |
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

- Arsenal exists publicly as `https://github.com/LenoxSaintGermain/third-signal-skill-packs`.
- Armory was not found by name in accessible local/public source.
- Orbital Manifest exists at `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json`.
- Orbital Field Guide remains unconfirmed as a deployed/retrievable source and is tracked by `THI-56`.
- Knowledge registry mapping is tracked by `THI-70`.

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
