# Orbital Knowledge Surfaces

Last updated: 2026-05-03

## Purpose

This file defines the knowledge surfaces that should feed Orbital, Alfred, Swarm, Librarian, Research OS, and the walkthrough co-producer.

Current audit found that some names are real sources and some are still unresolved product vocabulary. Until each has a repo/path, deployment target, and retrieval contract, agents should not assume it is wired.

## Current Inventory

| Surface | Current evidence | Intended role | Swarm status |
| --- | --- | --- | --- |
| Arsenal | Public repo `third-signal-skill-packs`; README contains `The ARSENAL` catalog | Canonical catalog of reusable Third Signal skill packs, protocols, and operating primitives | Not wired in current Orbital checkout |
| Armory | Not found by name in accessible local repos, Orbital remote branches, public GitHub repo names, or public Swarm clone | Expected tool/provider/adapter inventory if the name is still valid | Not confirmed |
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

- No accessible source was found by name.

Decision needed:

- If Armory is the provider/tool inventory, define it as the registry of live adapters, credentials, capabilities, rate limits, and approval gates.
- If Armory is a deprecated name, retire it and fold the concept into the Orbital Manifest plus Arsenal.

Recommended target:

- Armory should be the operational equipment registry:
  - provider adapters
  - tool endpoints
  - secret names
  - capability scopes
  - approval requirements
  - health state
  - owner
  - runbook link

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

