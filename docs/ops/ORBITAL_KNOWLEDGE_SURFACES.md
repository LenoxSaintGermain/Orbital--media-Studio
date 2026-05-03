# Orbital Knowledge Surfaces

Last updated: 2026-05-03

## Purpose

This file defines the knowledge surfaces that should feed Orbital, Alfred, Swarm, Librarian, Research OS, and the walkthrough co-producer.

Current audit found that some names are real sources and some are still unresolved product vocabulary. Until each has a repo/path, deployment target, and retrieval contract, agents should not assume it is wired.

## Current Inventory

| Surface | Current evidence | Intended role | Swarm status |
| --- | --- | --- | --- |
| Third Signal Agent Wiki | Spec at `docs/ops/THIRD_SIGNAL_AGENT_WIKI_SPEC.md` | Canonical compiled knowledge layer for agents | Not implemented |
| Orbital Context | Existing repo `LenoxSaintGermain/orbital-context`; pre-prod Cloud Run service exists in `third-signal` | Context intake layer that turns browser/app state into traceable capture cards | Not wired to Swarm/Librarian/Agent Wiki/Armory yet |
| Arsenal | Public repo `third-signal-skill-packs`; README contains `The ARSENAL` catalog | Canonical catalog of reusable Third Signal skill packs, protocols, and operating primitives | Not wired in current Orbital checkout |
| Armory | User-confirmed Orbital module; not exposed by name in this checkout or fetched remote branch | Operational equipment/context registry updated by Librarian; Ghost operates there | Module path/runtime wiring not confirmed |
| Orbital Manifest | `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json` | Machine-readable operating manifest for environments, services, doctrine, backlog, knowledge surfaces, and voice layer | Local doc artifact; runtime consumption not confirmed |
| Orbital Field Guide | Referenced as a promotion candidate; no public/local repo found by name | Searchable documentation/context layer for Alfred, Orbital, Swarm, Librarian, and Research OS | Not confirmed; `THI-56` now tracks wiring |

## Required Source Contracts

Every knowledge surface needs:

- Repo or canonical path.
- Owner.
- Production hosting path or storage surface.
- Update workflow.
- Retrieval contract.
- Swarm trace behavior.
- Librarian ingest path.
- Alfred citation behavior.
- Health or freshness check.

## Third Signal Agent Wiki

Current source:

- `docs/ops/THIRD_SIGNAL_AGENT_WIKI_SPEC.md`
- Linear: `THI-72`

Role:

- Compiled, cited, agent-readable operating memory.
- Sits between raw sources and agent execution.
- Powers Alfred walkthrough planning, Donna public-safe answers, Swarm coordination context, Librarian updates, Ghost lint, Field Guide pages, Armory cards, and Research OS claim checks.

Required integration:

- Bootstrap `docs/agent-wiki/` with schema, index, log, pages, cards, context packs, and lint reports.
- Add retrieval contract: `agent_wiki.retrieve_context`.
- Add write proposal contract: `librarian.propose_wiki_update`.
- Add Swarm events for retrieval, update proposals, committed updates, stale claims, and contradictions.
- Add visibility tiers: `public`, `internal`, `operator_only`.
- Add evidence labels: `verified`, `user_confirmed`, `observed`, `inferred`, `contradicted`.

## Orbital Context

Current source:

- Repo: `https://github.com/LenoxSaintGermain/orbital-context`
- Local checkout: `/Users/lenoxparis/conductor/repos/orbital-context`
- Pre-prod Cloud Run URL: `https://orbital-context-pplaphmpxq-uw.a.run.app`
- Spec: `docs/ops/ORBITAL_CONTEXT_INTEGRATION_AND_PLUGIN_SPEC.md`
- Linear: `THI-58`, `THI-68`

Role:

- Capture live browser/app context and convert it into cited, redacted, traceable `CaptureCard` records.
- Feed Alfred, Swarm, Librarian, Agent Wiki, Field Guide, Armory/Ghost, Research OS, `#admin`, and Donna public-safe summaries.
- Support voice-led walkthrough proof capture for the `Introducing Orbital` pilot.

Required integration:

- Move Gemini analysis and privileged persistence behind a server-side context broker.
- Lock Firestore and Storage access.
- Add Swarm events for capture, analysis, save, handoff, redaction, and approval.
- Let Librarian approve durable Agent Wiki, Field Guide, and artifact writes.
- Let Ghost flag risky captures, stale context, missing trace IDs, and unsafe permissions in Armory.
- Expose capture queue, trace status, redaction report, and target agents in `#admin`.

## Arsenal

Current source:

- `https://github.com/LenoxSaintGermain/third-signal-skill-packs`

Role:

- Catalog the Third Signal operating primitives: Continuous Context Protocol, Librarian + Chronicle, Ghost Intelligence, Conductor, Gemini Live, ADK 2.0 Protocol, Agent Protocol Architect, A.E.G.I.S., and related packs.

Required integration:

- Add an `arsenal` source to the Orbital knowledge registry.
- Index pack names, statuses, value proposition, README path, and production readiness.
- Let Alfred cite Arsenal entries when recommending architecture patterns.
- Let Swarm fetch Arsenal context during planning and tool-selection runs.

## Armory

Current state:

- Armory is product-confirmed as a module inside Orbital.
- This checkout does not currently expose an `armory` path, component, route, or API by name.
- Treat the missing path as a source-of-truth gap, not proof that Armory is deprecated.

Role:

- Armory is the operational equipment and context registry for Orbital.
- Librarian updates Armory as part of its jobs.
- Ghost operates inside Armory as the ambient context/intelligence layer.

Target contents:

- Provider adapters.
- Tool endpoints.
- Secret names and credential locations, never secret values.
- Capability scopes.
- Approval requirements.
- Health state and freshness metadata.
- Owner and runbook links.
- Field Guide, Arsenal, Manifest, Swarm, Research OS, and Librarian links.
- Ghost observations, warnings, suggestions, and ambient context cards.

Required integration:

- Locate the original Armory module source or rebuild the module in Orbital.
- Define Librarian update inputs, cadence, write permissions, and audit log.
- Define Ghost read/write behavior inside Armory.
- Emit Swarm trace IDs for Armory reads, updates, and Ghost interventions.
- Add an Orbital UI route or panel for Armory.
- Add a smoke test proving Librarian can update Armory and Ghost can read from it.

Minimum contract:

```json
{
  "source": "armory",
  "operation": "librarian_update",
  "trace_id": "swarm-trace-id",
  "updated_by": "librarian",
  "ghost_visible": true,
  "entry": {
    "name": "Gemini Live voice session broker",
    "type": "provider_adapter",
    "capabilities": ["voice_session", "low_latency_audio"],
    "secret_refs": ["GEMINI_API_KEY"],
    "approval_required": false,
    "health": "unknown",
    "runbook": "docs/ops/ORBITAL_VOICE_NORTH_STAR.md"
  }
}
```

Linear:

- `THI-71`: Restore Armory module and define Librarian/Ghost operating contract

## Orbital Manifest

Current source:

- `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json`

Role:

- Machine-readable operating truth for agents.
- Should include environments, Cloud Run services, DNS gaps, doctrine, promotion backlog, knowledge surfaces, and voice co-producer policy.

Required integration:

- Serve or ingest it where Alfred and Swarm can read it.
- Keep it valid JSON.
- Update it whenever Linear backlog or production topology changes.

## Orbital Field Guide

Current state:

- Intended as the living documentation/context layer.
- Not confirmed as deployed or wired to Swarm in accessible sources.

Target behavior:

- Alfred can ask for Field Guide context before advising on Orbital architecture.
- Swarm can retrieve Field Guide sections by topic with a trace ID.
- Librarian can update Field Guide pages from incidents, runbooks, promotion plans, and operator decisions.
- Research OS can cite Field Guide sections during claim checks.
- Orbital can use Field Guide snippets in walkthrough planning.

Minimum contract:

```json
{
  "source": "orbital-field-guide",
  "query": "voice co-producer architecture",
  "trace_id": "swarm-trace-id",
  "consumer": "alfred",
  "result": {
    "title": "Orbital Voice North Star",
    "url": "https://...",
    "excerpt": "...",
    "updated_at": "2026-05-03"
  }
}
```

Linear:

- `THI-56`: Promote Orbital Field Guide from V1 sandbox into v2 production
- `THI-70`: Map Arsenal, Armory, Manifest, and Field Guide into Orbital knowledge registry
- `THI-71`: Restore Armory module and define Librarian/Ghost operating contract
