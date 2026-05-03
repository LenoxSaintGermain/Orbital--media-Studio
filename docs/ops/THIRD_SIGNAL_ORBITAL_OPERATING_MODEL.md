# Third Signal and Orbital Operating Model

Last updated: 2026-05-03

## Canonical Environment Split

Production:

- GCP project: `third-signal-v2`
- Billing: `billingAccounts/01789C-776EBA-EB68EA`
- Purpose: live public surfaces, production Orbital, production Swarm, production secrets.
- Vanity domains: production only.

Pre-prod:

- GCP project: `third-signal`
- Billing: `billingAccounts/010740-3D9EF7-0A85BE`
- Purpose: V1 sandbox, promotion candidates, recovery fallback, comparison.
- Vanity domains: none.
- Access: long Cloud Run URLs only.

## Production Family

| System | Service | URL | Role |
| --- | --- | --- | --- |
| Third Signal HQ / Vault | `signal-vault` | `https://thirdsignal.ai` | Public HQ, portfolio, admin, Librarian/Engram memory |
| Signal Card | `signal-card` | `https://line.thirdsignal.ai` | Front-door conversational agent |
| Orbital Studio | `orbital-studio` | `https://orbital.thirdsignal.ai`, `https://operator.thirdsignal.ai` | Operator cockpit and tool command layer |
| Swarm | `orbital-swarm-adk` | Cloud Run service URL | Coordination backend, agent settings, handoffs, reports |

Current v2 revisions:

- `signal-vault-00001-wld`
- `signal-card-00001-8vc`
- `orbital-studio-00004-gkc`
- `orbital-swarm-adk-00006-2qm`

## Operating Goal

Orbital should become the only surface the operator needs for day-to-day AI leverage.

Third-party tools stay available, but Orbital should control them through adapters, not force the operator to work inside many wrappers.

Required properties:

- Provider keys live in Secret Manager or approved server-side secret stores.
- Browser/client code never receives privileged provider tokens.
- Tool calls flow through Orbital/Swarm adapters.
- Actions write traceable events to Swarm, Firestore, Supabase, or Librarian artifacts.
- Alfred can read the current operating model before recommending production changes.

## Knowledge Surfaces

Orbital needs a named knowledge registry so agents know where to retrieve context from.

Current audit:

| Surface | Current status | Required action |
| --- | --- | --- |
| Arsenal | Public `third-signal-skill-packs` repo confirms an `ARSENAL` catalog of Third Signal skill packs and protocols | Index it as a source Alfred and Swarm can cite |
| Armory | Not found in accessible local/public sources by name | Confirm source or retire the name |
| Orbital Manifest | `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json` exists as machine-readable operating truth | Keep valid, serve/ingest for agents |
| Orbital Field Guide | Documented as a promotion candidate, but no public/local repo or Swarm hook found by name | Confirm repo/source and wire retrieval through Swarm |

Backlog:

- `THI-56`: Promote Orbital Field Guide from V1 sandbox into v2 production
- `THI-70`: Map Arsenal, Armory, Manifest, and Field Guide into Orbital knowledge registry

## Voice-Native North Star

Orbital should move beyond voice navigation into a voice-native agentic operating layer.

Target experience:

- Lenox speaks naturally.
- Alfred interviews, clarifies, and narrates.
- Orbital turns spoken intent into typed plans, safe tool actions, proof capture, and video-ready walkthrough artifacts.
- Swarm records trace IDs for every intent, action, capture, approval, and handoff.
- Research OS validates public claims.
- Librarian stores the transcript, storyboard, proof log, and final package.
- `#admin` exposes run state, approvals, and publish readiness.

Flagship deliverable:

- `THI-61`: North Star: Orbital voice-native walkthrough co-producer
- Pilot: `Introducing Orbital`
- Output: outline, A2UI-style scene graph, script beats, transcript, captions, proof log, timeline JSON, asset manifest, and video-ready export path.

Production rule:

- Gemini Live, ADK 2.0, A2UI, capture workers, and publisher flows must enter through safe adapters and pre-prod validation. No provider keys in browser code. No ADK 2.0 production replacement until the beta/pre-GA risk is proven acceptable.

## Swarm Role

Swarm is the coordination plane:

- Reads Signal Card live reports.
- Stores coordination reports and agent settings.
- Produces operator briefings.
- Routes Research OS and Alfred handoffs.
- Owns trace IDs for cross-tool work.

Signal Card should not claim a handoff occurred unless Swarm accepted a report or action.

## Promotion Backlog

### Orbital Field Guide

Current state:

- V1/pre-prod asset.
- Needs repo, deploy target, and search endpoint confirmed.
- Current accessible-source audit did not find a public/local `orbital-field-guide` repo or a Swarm retrieval hook by name.

Production target:

- v2-hosted service or static app.
- Searchable from Orbital.
- Indexed by Librarian.
- Available to Alfred as a canonical operating manual.
- Retrievable by Swarm with trace IDs.
- Updatable by Librarian from runbooks, incidents, promotion plans, and operator decisions.

### Research OS MCP

Current state:

- Not confirmed as promoted to v2 production.
- Keep disabled until endpoint, auth, secrets, and writeback contract are verified.

Production target:

- Typed handoffs from Swarm.
- Research results write to `coordination_reports`, `runs`, or `intelligence_feed`.
- MCP uses server-side auth only.

### Orbital Context

Current state:

- V1 project and high-value promotion candidate.

Production target:

- Context capture and browser/plugin bridge for Orbital.
- Captures URL, selected text, operator notes, page title, and screenshot references.
- Sends context cards to Swarm with trace IDs.
- Supports actions: summarize, research, create Linear issue, save to Librarian, hand off to Alfred.
- Supports voice-led demo capture so Lenox can say "show this" while Orbital Context captures page state, screenshots, selected text, and proof moments for the walkthrough scene graph.

### Orbital Walkthrough Co-Producer

Current state:

- North Star and Linear parent are defined.
- Implementation tracks are `THI-62` through `THI-69`.

Production target:

- Gemini Live voice session broker with server-side credentials.
- Typed voice intent taxonomy.
- A2UI-style scene, proof, action, approval, and publish cards.
- ADK 2.0 demo director prototype in pre-prod.
- Walkthrough capture and video production pipeline.
- Swarm, Librarian, `#admin`, and Research OS trace integration.
- First pilot package: `Introducing Orbital`.

### Manus-Hosted Assets

Examples:

- `tslbrand.manus.space`
- Other Manus-built sites with GitHub repos

Production target:

- Bring source-controlled Manus assets into GCP or an explicitly approved production platform.
- Treat Manus as a creation environment, not the long-term production dependency.
- Add health checks and deployment notes before linking them into the main Third Signal family.

## Billing Incident Note

On 2026-05-03, expired billing caused Cloud Run failures across v1 and v2. Reopening the original account was not enough for v2; Cloud Run kept returning `429 no available instance` until `third-signal-v2` was moved to `billingAccounts/01789C-776EBA-EB68EA`.

If this happens again:

1. Confirm project billing and billing account `open` state.
2. Deploy a temporary Cloud Run hello-world smoke service.
3. If the smoke service also returns `429 no available instance`, treat it as project/billing/quota allocator state.
4. Do not churn app code until the allocator recovers.

## Open DNS Item

`www.thirdsignal.ai` still needs:

```bash
www CNAME ghs.googlehosted.com.
```
