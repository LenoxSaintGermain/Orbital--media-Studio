# Third Signal SWAT Protocol

Last updated: 2026-05-03

Classification: `TSL-SWAT-001`

Linear:

- `THI-87`: Operationalize Third Signal SWAT protocol
- `THI-88`: Fix Conductor prompt routing for SWAT missions
- `THI-89`: Enforce Conductor webhook verification before SWAT automation
- `THI-90`: Implement Conductor artifact ingest for Librarian SWAT records
- `THI-91`: Audit and remove browser-bundled Gemini keys across Orbital SWAT surfaces

## Purpose

This protocol adapts broad multi-agent SWAT prompts into the actual Third Signal operating model.

Use it when a mission spans Orbital Studio, Orbital Context, Swarm, Signal Card, `#admin`, Librarian, Agent Wiki, Research OS, Cloud Run, or production/pre-prod promotion work.

## Source Truth

- Production GCP project: `third-signal-v2`
- Pre-prod/sandbox GCP project: `third-signal`
- Production vanity domains: v2 only
- Trace owner: Swarm
- Canonical memory: Third Signal Agent Wiki plus Librarian artifacts
- Review surface: `#admin`
- Work tracker: Linear
- Deploy default: `DEPLOY_ON_COMPLETION=false`

Primary docs:

- `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json`
- `docs/ops/PROMOTION_BACKLOG.md`
- `docs/ops/THIRD_SIGNAL_AGENT_WIKI_SPEC.md`
- `docs/ops/ORBITAL_CONTEXT_INTEGRATION_AND_PLUGIN_SPEC.md`
- `docs/ops/ORBITAL_VOICE_NORTH_STAR.md`

## Operating Correction To The Consultant Prompt

The consultant's CANVAS/SIGNAL/AUDIO/GHOST/MNEME/SETTINGS/INFRA roster is useful as a capability map, not as a file-edit mandate.

Current Orbital Studio audit:

- `CANVAS` exists as `components/canvas/PageCanvas.tsx`.
- `INFRA` exists through `Dockerfile`, `cloudbuild.yaml`, `nginx.conf`, and Vite config.
- `SIGNAL` is a separate production service, not a local Orbital Studio module in this repo.
- `AUDIO` is currently direction/spec, not a confirmed module.
- `GHOST` is product truth through Armory, but no runtime module path is confirmed yet.
- `MNEME` is not a confirmed source module; map it to future memory/schema work after Agent Wiki and CaptureCard contracts.
- `SETTINGS` has data structures but no confirmed full settings surface in the current Orbital Studio checkout.

Rule:

- Confirm source paths before implementation.
- If a module name is not confirmed, create/update Linear and Agent Wiki/Field Guide specs instead of inventing files.
- Do not automate SWAT through Conductor until `THI-88`, `THI-89`, and `THI-90` are fixed.
- Treat server-side model brokering as a cross-stack SWAT hardening gate through `THI-91`.

## Mission Roster

Build the roster from confirmed source paths.

| Lane | Scope | Output |
| --- | --- | --- |
| `MISSION-CONTROL` | Linear, docs, Agent Wiki, Librarian ingest, protocol governance | Mission brief, backlog, durable docs |
| `SURFACE-ORBITAL` | Orbital Studio UI, canvas, panels, design system, A2UI cards | Patch or audit |
| `SURFACE-SIGNAL` | Signal Card, Third Signal HQ, `#admin`, Donna public-safe surfaces | Patch or audit |
| `CONTEXT` | Orbital Context, CaptureCard, redaction, browser extension, context broker | Patch or audit |
| `MEMORY` | Agent Wiki, Field Guide, Armory, Ghost, Arsenal, Librarian | Patch or audit |
| `SWARM-INFRA` | Swarm, Conductor, Cloud Run, Secret Manager, health, structured logs | Patch or audit |
| `VOICE-DEMO` | Gemini Live, Alfred director, walkthrough co-producer, ADK pre-prod graph, video artifacts | Patch or audit |
| `INTEGRATION-SENTINEL` | Diff review, contract check, design audit, changelog, PR summary | Integration report |

## OUP Gate

Every SWAT agent output must begin with:

```text
[OUP-GATE]
Q1: What is the single primary behavior this upgrade changes or adds?
Q2: What module or file does it touch, and what does it NOT touch?
Q3: Does this output break any existing Orbital OS interface contracts? YES/NO + reason.
Q4: What Linear issue, Swarm trace, or Agent Wiki/Librarian artifact records this work?
Q5: Does this introduce any secret, deploy, data retention, or public-surface risk? YES/NO + mitigation.
[/OUP-GATE]
```

Reject outputs that lack the gate, overstate implementation, touch unrelated files, or claim production deploy without approval.

## Design Gate

For UI work, preserve existing project patterns unless the mission explicitly upgrades a surface.

Target SWAT visual language:

- Background: `#0D0E11` primary, `#040507` deep
- Accent copper: `#C87D3E`
- Accent cyan: `#00D4FF`
- Typography: EB Garamond editorial, Rajdhani UI, Share Tech Mono data/code
- Geometry: notch/clip-path language on primary SWAT surfaces where compatible
- State language: `ACTIVE`, `IDLE`, `PROCESSING`, `ERROR`, `LOCKED`

Do not force these tokens into unrelated legacy components without a scoped design-system ticket.

## Dispatch Rules

- Use parallel agents only when the operator explicitly requests SWAT, delegation, or parallel work.
- Keep immediate blocking work local.
- Delegate bounded sidecar audits or disjoint file patches.
- Give every worker a clear write scope.
- Tell workers they are not alone in the codebase and must not revert others' edits.
- Do not assign overlapping files to multiple workers.
- Require changed-file lists and OUP gates from workers.

## Integration Sentinel Checklist

1. Review diffs and reject unrelated changes.
2. Check shared contracts:
   - `CaptureCard`
   - Swarm trace event schema
   - Agent Wiki retrieval/write proposal contracts
   - `#admin` queue/status fields
   - Gemini model aliases such as `GEMINI_LIVE_MODEL`
3. Run validation:
   - `git diff --check`
   - `python3 -m json.tool` for JSON manifests
   - project build/typecheck/test commands where available
   - safe health checks where applicable
4. Confirm Linear is updated.
5. Confirm Agent Wiki/Librarian docs are updated.
6. If `career-agent-one` docs changed, run targeted Librarian ingest.
7. Produce changelog in this format:

```text
[MODULE] [AGENT] [CHANGE TYPE: ADD/MODIFY/FIX/STUB] [Description]
```

## Deploy Policy

Default:

```text
DEPLOY_ON_COMPLETION=false
```

Production deploy requires:

- Explicit human approval.
- Clean source diff.
- Secrets in Secret Manager, Supabase, or provider secret store.
- No privileged provider keys in browser/client/extension bundles.
- `third-signal-v2` target confirmed.
- Pre-prod validation in `third-signal` when risk is non-trivial.
- Rollback path.
- Health check.
- Linear and Librarian/Agent Wiki update.

## Cross-Agent Skill

Codex skill installed locally:

- `/Users/lenoxparis/.codex/skills/third-signal-swat/SKILL.md`
- Invoke as `$third-signal-swat`.

For Claude Code, Antigravity, Warp, Manus, and other agents that read repo files, use this document as the durable protocol.
