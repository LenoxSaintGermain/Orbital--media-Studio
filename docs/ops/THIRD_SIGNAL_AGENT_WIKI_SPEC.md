# Third Signal Agent Wiki Spec

Last updated: 2026-05-03

Linear: `THI-72`

## Recommendation

Build the Third Signal Agent Wiki as the canonical, agent-readable operating memory behind Orbital.

This should not be a generic docs folder and not a raw vector-store-only RAG system. It should be the compiled context layer that Alfred, Swarm, Donna/Signal Card, Librarian, Ghost, Armory, Field Guide, Arsenal, Research OS, and Orbital can query with citations, freshness, visibility rules, and Swarm trace IDs.

North Star fit:

- Lenox talks.
- Alfred and Orbital plan, operate, capture, explain, and produce.
- The Agent Wiki gives them the cited context needed to do that accurately.

## Source Pattern

The pattern is adapted from Karpathy's LLM Wiki idea:

- Raw sources are immutable source-of-truth inputs.
- The wiki is an evolving, LLM-maintained markdown knowledge graph.
- A schema/instructions file tells agents how to ingest, query, lint, update, cite, and maintain the wiki.
- `index.md` maps content.
- `log.md` records chronological maintenance.
- Useful query results can become durable synthesis pages so knowledge compounds instead of disappearing into chat history.

Third Signal adaptation:

- Add Swarm trace IDs.
- Add evidence grades and source trust tiers.
- Add agent-specific context packs.
- Add public-safe Donna/Signal Card views.
- Add Librarian as canonical writer.
- Add Ghost as ambient lint/suggestion layer inside Armory.
- Add A2UI-compatible cards for Orbital UI, demo scenes, proof cards, approval gates, and tool capability cards.

## Product Boundaries

| Surface | Role |
| --- | --- |
| Agent Wiki | Compiled, agent-readable knowledge layer |
| Field Guide | Human-readable documentation surface generated from or backed by Agent Wiki pages |
| Armory | Orbital module for tools, adapters, providers, capability metadata, health, approval gates, and Ghost observations |
| Arsenal | Skill-pack and protocol catalog |
| Orbital Context | Browser/app context intake layer that creates traceable CaptureCards |
| Orbital Manifest | Machine-readable environment and service truth |
| Swarm | Coordination plane and trace owner |
| Librarian | Canonical wiki/Field Guide/Armory updater |
| Ghost | Ambient context, warning, and stale/contradiction detection inside Armory |
| Research OS | Evidence expansion and claim checking |
| Donna / Signal Card | Public-safe conversational view only |
| Alfred | Operator-grade synthesis, planning, walkthrough, and explanation context |

## Non-Goals

- Do not store secrets.
- Do not replace GitHub, Linear, Supabase, Firestore, Cloud Run, or source code.
- Do not allow all agents to write canon directly.
- Do not publish public claims without provenance and approval.
- Do not collapse Field Guide, Armory, Arsenal, and Manifest into one vague docs bucket.
- Do not hard-code preview model names when official capability support can change.

## Architecture

```text
raw sources -> Librarian ingest -> Agent Wiki pages/cards -> search/context packs -> agent consumers
                 |                       |                     |
                 v                       v                     v
              Swarm trace              Field Guide            Armory/Ghost
              Linear links             public/internal views  capability/risk registry
```

### Raw Sources

Raw sources are immutable or append-only inputs:

- GitHub repos and docs.
- Linear issues, projects, and status updates.
- Swarm traces, coordination reports, and health checks.
- Signal Card/Donna transcripts and public conversation summaries.
- Cloud Run deployment and health records.
- Supabase/Librarian artifacts.
- Orbital Manifest.
- Orbital Context CaptureCards, redaction reports, and proof captures.
- Field Guide source pages.
- Arsenal skill-pack docs.
- Armory entries.
- Research OS outputs.
- Operator notes and meeting transcripts.
- External API docs and protocol specs.

Rules:

- Raw sources are cited, not overwritten.
- Sensitive raw sources stay internal.
- Secret values are excluded; only secret references are allowed.

### Compiled Wiki

Recommended repo path:

```text
docs/agent-wiki/
  AGENT_WIKI_SCHEMA.md
  index.md
  log.md
  sources/
  pages/
    agents/
    systems/
    capabilities/
    decisions/
    incidents/
    demos/
    protocols/
    claims/
    glossary/
  cards/
    a2ui/
    armory/
    demo/
    public/
  context-packs/
  lint/
```

### Search and Retrieval

Start simple:

- `index.md` for small-scale navigation.
- `rg`/filesystem search for local development.
- JSON manifests for cards and claims.

Then add:

- SQLite FTS or QMD-style hybrid search.
- MCP endpoint for agent retrieval.
- Context-pack generation for bounded agent handoffs.

## Data Model

### Source

```yaml
id: source.github.orbital.voice-north-star
type: repo_doc | linear | swarm_trace | transcript | runbook | incident | api_doc | demo | operator_note
uri: string
immutable_hash: string
collected_at: datetime
sensitivity: public | internal | secret_ref_only
owner: librarian
```

### Claim

```yaml
id: claim.orbital.voice.northstar.001
text: string
evidence: verified | user_confirmed | observed | inferred | contradicted
source_ids: []
freshness: fresh | stale | expired
last_verified_at: datetime
owner: librarian
```

### Page

```yaml
id: page.orbital.voice-north-star
type: concept | agent | system | runbook | capability | decision | demo | incident
status: draft | active | stale | deprecated
visibility: public | internal | operator_only
consumers: [alfred, swarm, donna, librarian, ghost, research_os]
claim_ids: []
source_ids: []
swarm_trace_ids: []
freshness_policy: weekly
```

### Card

```json
{
  "id": "card.demo.scene.introducing-orbital.admin",
  "type": "context|decision|capability|approval_gate|demo_scene|risk|tool|public_summary",
  "render_target": "a2ui|markdown|admin|signal_card",
  "visibility": "public|internal|operator_only",
  "source_claims": [],
  "requires_approval": false,
  "swarm_trace_required": true
}
```

## Page Schema

Every wiki page should use frontmatter:

```yaml
---
id: page.armory.provider-registry
title: Armory Provider Registry
type: capability
status: active
visibility: internal
owners: [librarian]
consumers: [alfred, swarm, ghost]
source_ids: []
claim_ids: []
swarm_trace_ids: []
freshness_policy: weekly
last_verified_at: 2026-05-03
---
```

Body sections:

- Summary.
- What is verified.
- What is user-confirmed.
- What is inferred.
- Open questions.
- Related pages.
- Source references.
- Last update log.

## Retrieval Contract

All agents should retrieve through one contract:

```json
{
  "actor": "alfred",
  "task": "produce_orbital_walkthrough",
  "query": "voice-native Orbital architecture and proof points",
  "budget_tokens": 6000,
  "required_evidence": ["verified", "user_confirmed"],
  "include_cards": ["demo_scene", "capability", "risk"],
  "visibility": "internal",
  "swarm_trace_id": "trace_..."
}
```

Return:

```json
{
  "answer": "short synthesis",
  "context_pack_id": "ctx_...",
  "pages": [],
  "cards": [],
  "claims": [],
  "citations": [],
  "stale_or_inferred_items": [],
  "required_followups": []
}
```

Rule:

- Agents may answer only from retrieved pages/cards, explicit user input, or live tool results.
- If a claim is inferred, stale, or unverified, the agent must label it.
- Donna/Signal Card may only use public or public-safe cards.
- Alfred may use internal/operator context.
- Ghost may create observations and warnings, but Librarian owns canon writes.

## Update Workflow

Librarian owns canonical writes.

1. Ingest source.
2. Hash/chunk source.
3. Extract claims and candidate pages/cards.
4. Run deterministic linking and duplicate detection.
5. Produce proposed diff.
6. Apply policy or human approval.
7. Commit/update wiki.
8. Rebuild index/search graph.
9. Emit `wiki.update` event to Swarm.
10. Update Linear if production-impacting.

Ghost workflow:

1. Observe Armory, Agent Wiki, Field Guide, and Swarm traces.
2. Detect stale claims, contradictions, missing links, missing proof, risky adapter state, or expired health.
3. Write `ghost.observation` cards into Armory.
4. Escalate to Librarian for canonical update.
5. Emit Swarm trace.

## Lint Workflow

Run periodic wiki lint for:

- Contradictions between pages.
- Stale API/model claims.
- Orphan pages.
- Missing backlinks.
- Missing source IDs.
- Public cards that cite internal-only sources.
- Secret values accidentally included.
- Claims without evidence labels.
- Armory entries without health or approval policy.
- Field Guide pages not backed by Agent Wiki claims.

Suggested events:

- `wiki.lint.started`
- `wiki.claim.stale`
- `wiki.claim.contradicted`
- `wiki.public_view_blocked`
- `armory.ghost_observation.created`
- `wiki.lint.completed`

## Agent Consumers

### Alfred

Uses:

- Internal context packs.
- Field Guide pages.
- Demo scene cards.
- Claim/proof cards.

Writes:

- Proposed pages, not canon.
- Walkthrough planning outputs.

### Swarm

Uses:

- Retrieval traces.
- Context packs.
- Agent/task pages.
- Action/proof cards.

Writes:

- Trace events.
- Coordination reports.
- Update proposals.

### Donna / Signal Card

Uses:

- Public-safe cards only.
- Approved public summaries.
- No internal implementation details unless marked public.

Writes:

- Conversation summaries and sourceable follow-up reports.

### Librarian

Uses:

- All allowed raw sources.
- Swarm traces.
- Linear/project context.

Writes:

- Canon pages.
- Field Guide updates.
- Armory updates.
- Index/log.
- Proposed public summaries.

### Ghost

Uses:

- Armory.
- Agent Wiki freshness metadata.
- Swarm trace anomalies.

Writes:

- Observations.
- Warnings.
- Suggested updates.

### Research OS

Uses:

- Claims requiring evidence expansion.
- External source requests.

Writes:

- Research notes.
- Claim-check results.
- Evidence packs.

## Model Policy

Current operating truth:

- Orbital is already using a working Gemini 3.1 Live Preview path.
- The architecture must preserve that behavior.
- Public docs may lag private/preview access. Public docs can still guide fallback selection, but they should not override a working deployed preview path.

Policy:

- Use `GEMINI_LIVE_MODEL` as a runtime alias.
- Read the exact model string from deployed config/secret/env.
- Preserve the current Gemini 3.1 Live Preview path.
- Add a runtime capability probe so unsupported/retired preview models fail safely.
- Keep a fallback Live-capable model for recovery only.
- When Gemini 3.1 Live exits preview, update `GEMINI_LIVE_MODEL` to the GA model name without code changes.

## MVP

Build the MVP around the Orbital launch narrative.

Scope:

- Create `docs/agent-wiki/AGENT_WIKI_SCHEMA.md`.
- Create `docs/agent-wiki/index.md`.
- Create `docs/agent-wiki/log.md`.
- Seed pages for:
  - Alfred
  - Swarm
  - Donna / Signal Card
  - Librarian
  - Ghost
  - Armory
  - Field Guide
  - Arsenal
  - Orbital Manifest
  - Orbital Context
  - Voice Co-Producer
- Add one retrieval endpoint or MCP tool: `agent_wiki.retrieve_context`.
- Add one write path: `librarian.propose_wiki_update`.
- Add Swarm events for retrieval, update proposals, commits, stale claims, and contradictions.
- Produce one demo package: `Introducing Orbital`.

## Follow-On Backlog

Recommended child issues under `THI-72`:

- Bootstrap Agent Wiki directory, schema, index, and log.
- Build Agent Wiki retrieval API or MCP server.
- Add Librarian wiki updater and approval workflow.
- Add Ghost lint/observation workflow inside Armory.
- Add Donna/Signal Card public-safe context view.
- Generate the `Introducing Orbital` context pack for Alfred.

## Risks

- Hallucinations compounding into canon.
- Stale API/model claims.
- Secret leakage through copied docs.
- Donna exposing internal context.
- Agent write conflicts.
- Field Guide, Armory, Arsenal, and Manifest becoming overlapping terminology.
- Overbuilding before the walkthrough co-producer MVP proves value.

Mitigations:

- Claim IDs and evidence labels.
- Source IDs and immutable hashes.
- Human-edit protection.
- Reviewable diffs.
- Swarm trace IDs.
- Public/internal/operator visibility.
- Secret-reference-only policy.
- Freshness policies by page type.

## Source References

- Karpathy LLM Wiki: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- WikiLoom: https://github.com/do-y-lee/wikiloom
- SwarmVault: https://github.com/swarmclawai/swarmvault
- QMD: https://github.com/tobi/qmd
- Gemini model capabilities: https://ai.google.dev/gemini-api/docs/models/gemini
- Gemini Live API: https://ai.google.dev/gemini-api/docs/live
- A2UI: https://github.com/google/A2UI
- ADK 2.0: https://adk.dev/2.0/
