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
| TSL Brand Guide | Manus-hosted, GitHub-backed | Brand system site in GCP | Needs import plan |
| Other Manus assets | Manus/GitHub | Approved production surfaces | Inventory required |

## Orbital Context Product Direction

Orbital Context should become the connective browser layer:

- Browser capture.
- Context cards.
- Research queue.
- Librarian save.
- Alfred handoff.
- Linear issue creation.
- Swarm trace ID on every action.

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

