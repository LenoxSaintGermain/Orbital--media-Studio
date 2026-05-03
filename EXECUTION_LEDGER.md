# Orbital Execution Ledger

## 2026-05-03: Third Signal v2 Production Recovery and Ecosystem Model

Summary:

- Confirmed `third-signal-v2` is production and `third-signal` is pre-prod/sandbox/recovery.
- Confirmed production vanity domains should point only to v2.
- Recovered v2 Cloud Run allocator by moving production billing to `billingAccounts/01789C-776EBA-EB68EA`.
- Verified production core URLs are healthy:
  - `https://thirdsignal.ai`
  - `https://line.thirdsignal.ai`
  - `https://orbital.thirdsignal.ai`
  - `https://operator.thirdsignal.ai`
- Confirmed pre-prod long URLs are reachable:
  - `https://signal-vault-pplaphmpxq-ew.a.run.app`
  - `https://orbital-ai-studio-pplaphmpxq-ew.a.run.app`
- Added Orbital operating docs:
  - `docs/ops/THIRD_SIGNAL_ORBITAL_OPERATING_MODEL.md`
  - `docs/ops/PROMOTION_BACKLOG.md`
  - `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json`
- Linear backlog created:
  - `THI-55`: Librarian and manifest ingestion
  - `THI-56`: Orbital Field Guide promotion
  - `THI-57`: Research OS MCP promotion
  - `THI-58`: Orbital Context browser/plugin layer
  - `THI-59`: Manus-hosted asset migration
  - `THI-60`: Orbital single-surface adapter platform

Open item:

- `www.thirdsignal.ai` still needs `www CNAME ghs.googlehosted.com`.

Operator doctrine:

- Orbital should become the single surface for AI leverage.
- External AI tools should become Orbital adapters with server-side credentials, trace IDs, and Swarm logs.

## 2026-05-03: Orbital Voice-Native Co-Producer North Star

Summary:

- Updated the `Orbital OS` Linear project with the new North Star: Lenox talks; Alfred and Orbital plan, operate, capture, explain, and produce.
- Created parent Linear issue `THI-61`: North Star: Orbital voice-native walkthrough co-producer.
- Created implementation tracks:
  - `THI-62`: Voice navigation audit and intent taxonomy
  - `THI-63`: Gemini Live voice session broker
  - `THI-64`: A2UI scene graph and approval-card contract
  - `THI-65`: ADK 2.0 demo director workflow in pre-prod
  - `THI-66`: Walkthrough capture and video production pipeline
  - `THI-67`: Swarm, Librarian, `#admin`, and Research OS trace wiring
  - `THI-68`: Orbital Context browser bridge for voice-led demos
  - `THI-69`: `Introducing Orbital` pilot video package
- Added operating doc `docs/ops/ORBITAL_VOICE_NORTH_STAR.md`.
- Updated the ecosystem manifest with voice operating layer policy, A2UI card families, ADK pre-prod rule, and video output package.

Implementation posture:

- Gemini Live uses the user-confirmed working Gemini 3.1 Live Preview path through the `GEMINI_LIVE_MODEL` runtime alias.
- A2UI is used as a safe declarative UI contract, not executable generated code.
- ADK 2.0 is pre-prod/lab first because it is beta/pre-GA.
- Production remains `third-signal-v2`; risky framework migration happens in pre-prod first.

## 2026-05-03: Orbital Knowledge Surfaces Audit

Summary:

- Confirmed Arsenal exists as the public `third-signal-skill-packs` repo and README `ARSENAL` catalog.
- Confirmed Orbital Manifest exists as `docs/ops/ORBITAL_ECOSYSTEM_MANIFEST.json`.
- Did not find a public/local `orbital-field-guide` repo or a Swarm retrieval hook by name in accessible sources.
- Did not find `Armory` by name in accessible local/public sources.
- Updated `THI-56` to require Field Guide source confirmation, Swarm retrieval, Librarian update flow, and smoke test.
- Created `THI-70` to map Arsenal, Armory, Manifest, and Field Guide into the Orbital knowledge registry.
- Added `docs/ops/ORBITAL_KNOWLEDGE_SURFACES.md`.

Operating rule:

- Agents should not assume Field Guide is hooked to Swarm until `THI-56` proves retrieval with a trace ID.
- Armory is now user-confirmed as an Orbital module, but this branch does not expose its source path by name.

## 2026-05-03: Armory Correction

Summary:

- Corrected the prior ambiguity: Armory is an Orbital module, not an external repo and not a deprecated name.
- User confirmed Librarian is supposed to update Armory as one of its jobs.
- User confirmed Ghost operates inside Armory.
- Current checkout still does not expose an `armory` path, route, component, or API by name.
- Created `THI-71`: Restore Armory module and define Librarian/Ghost operating contract.

Operating rule:

- Treat Armory as product truth.
- Treat Armory implementation path and runtime wiring as unconfirmed until `THI-71` locates/restores/builds the module.
- Armory must store secret references and capability metadata, not secret values.

## 2026-05-03: Third Signal Agent Wiki Spec

Summary:

- Spawned a sub-agent to analyze Karpathy's LLM Wiki pattern and adjacent implementations.
- Created Linear issue `THI-72`: Spec Third Signal Agent Wiki for Alfred, Swarm, Donna, Librarian, Ghost, and Orbital.
- Added `docs/ops/THIRD_SIGNAL_AGENT_WIKI_SPEC.md`.
- Updated the Orbital manifest, knowledge surfaces doc, promotion backlog, voice North Star, README, and ledger.

Key decision:

- The Third Signal Agent Wiki should become the compiled, cited operating memory behind Orbital agents.
- Field Guide is the human-readable documentation surface.
- Armory is the operational module updated by Librarian where Ghost operates.
- Arsenal is the skill/protocol catalog.
- Orbital Manifest remains machine-readable environment truth.
- Swarm owns traces for retrieval, updates, claims, and action handoffs.

Model policy:

- User confirms Orbital is already using a working Gemini 3.1 Live Preview path.
- Do not break, downgrade, or replace that path just because public docs may lag or list different Live-capable models.
- Use `GEMINI_LIVE_MODEL` as a runtime alias, preserve the current preview behavior, add runtime capability probing, and update the alias to the GA model name when preview exits.

## 2026-05-03: Orbital Context Existing Repo Integration Plan

Summary:

- User confirmed `orbital-context` already exists in GitHub.
- Confirmed repo: `https://github.com/LenoxSaintGermain/orbital-context`.
- Cloned local checkout: `/Users/lenoxparis/conductor/repos/orbital-context`.
- Confirmed pre-prod/original Cloud Run service: `orbital-context` in `third-signal`, region `us-west1`.
- Confirmed pre-prod URL: `https://orbital-context-pplaphmpxq-uw.a.run.app`.
- Added `docs/ops/ORBITAL_CONTEXT_INTEGRATION_AND_PLUGIN_SPEC.md`.
- Updated the operating model, promotion backlog, knowledge surfaces, voice North Star, manifest, README, and ledger.
- Updated Linear `THI-58` and `THI-68`.
- Created Linear execution issues:
  - `THI-79`: Orbital Context repo baseline and provenance freeze
  - `THI-80`: Build Orbital Context server-side context broker
  - `THI-81`: Define CaptureCard schema, redaction, and context-core package
  - `THI-82`: Wire Orbital Context to Swarm traces and `#admin` queue
  - `THI-83`: Add Librarian, Agent Wiki, Field Guide, Armory/Ghost, and Research OS handoffs
  - `THI-84`: Deploy refactored Orbital Context app and API to `third-signal-v2`
  - `THI-85`: Build Orbital Context Manifest V3 browser extension MVP
  - `THI-86`: Package Orbital Context as commercial plugin product

Code audit findings:

- The current app is a valuable AI Studio/Vite prototype.
- `vite.config.ts` injects `GEMINI_API_KEY` into browser code.
- `services/geminiService.ts` calls Gemini directly from the client.
- Firestore and Storage rules are open for dev.
- The app targets the original `third-signal` Firebase project.
- Swarm, `#admin`, Librarian, Agent Wiki, Field Guide, Armory/Ghost, Research OS, Linear, and browser extension wiring are not implemented yet.

Execution rule:

- Do not promote the current app as-is.
- First refactor into `context-core`, `orbital-context-api`, `orbital-context-run`, and `orbital-context-extension`.
- Production requires server-side or ephemeral-token model access, locked persistence, redaction, Swarm trace IDs, Librarian intake, and `#admin` visibility.

Source references checked:

- ADK 2.0 remains beta/pre-GA; keep ADK 2.0 work in pre-prod/lab until production risk is proven.
- A2UI is public-preview; use it as a declarative card contract rendered by trusted Orbital components.
- Gemini Live production guidance supports server mediation or ephemeral credentials rather than exposing standard API keys to browser clients.

## 2026-05-03: Third Signal SWAT Protocol and Skill

Summary:

- Adapted the consultant SWAT prompt into a Third Signal-specific operating protocol.
- Added `docs/ops/THIRD_SIGNAL_SWAT_PROTOCOL.md`.
- Installed Codex skill at `/Users/lenoxparis/.codex/skills/third-signal-swat/SKILL.md`.
- Added skill references for source truth, repo map, gates, deployment policy, design system, roster, mission brief, OUP gate, sentinel report, and PR block.
- Updated Orbital README, Agent Wiki spec, knowledge surfaces, ecosystem manifest, and ledger.
- Created Linear issues `THI-87` through `THI-91`.

Key decisions:

- Treat the consultant CANVAS/SIGNAL/AUDIO/GHOST/MNEME/SETTINGS/INFRA roster as a capability map, not a file-edit mandate.
- Dispatch only against confirmed source paths.
- Real Orbital Studio implementation lanes today: `CANVAS` and `INFRA`.
- Speculative lanes such as `MNEME`, `Ghost Pilot`, and `Audio Studio` require Linear/Agent Wiki specs before code edits.
- `DEPLOY_ON_COMPLETION=false` remains the default.
- OUP gate is expanded to include Linear/Swarm/Librarian traceability and secret/deploy/retention/public-surface risk.

Operational blockers captured:

- Orbital Studio and Orbital Context both still have browser-bundled Gemini key patterns that require server-side broker work.
- Orbital Context remains blocked until `THI-80` through `THI-84` land.
- `career-agent-one` SWAT automation through Conductor should wait for prompt naming, webhook verification, and artifact ingest fixes.

Linear:

- `THI-87`: Operationalize Third Signal SWAT protocol
- `THI-88`: Fix Conductor prompt routing for SWAT missions
- `THI-89`: Enforce Conductor webhook verification before SWAT automation
- `THI-90`: Implement Conductor artifact ingest for Librarian SWAT records
- `THI-91`: Audit and remove browser-bundled Gemini keys across Orbital SWAT surfaces

## 2026-05-03: SWAT-002 Agent Wiki Two-Wave Execution

Summary:

- Approved consultant SWAT-002 input as the `THI-72` Agent Wiki build protocol.
- Converted it into a two-wave execution plan.
- Added `docs/ops/AGENT_WIKI_SWAT_002_WAVE_PLAN.md`.
- Completed Wave A filesystem MVP in `career-agent-one/docs/agent-wiki/`.
- Ran Librarian ingest across 26 Agent Wiki markdown files with 0 failures.
- Created Linear issues:
  - `THI-92`: SWAT-002 Wave A Agent Wiki filesystem scaffold
  - `THI-93`: SWAT-002 Wave A Librarian proposal and commit workflow
  - `THI-94`: SWAT-002 Wave A Swarm event schema and trace contract
  - `THI-95`: SWAT-002 Wave B runtime Agent Wiki implementation blockers

Execution rule:

- Wave A ships filesystem artifacts only: schemas, contracts, seed pages, cards, context pack, and Sentinel report.
- Wave B remains blocked until Conductor, webhook, artifact ingest, browser-bundled Gemini key, and Orbital Context broker/redaction/trace/v2 gates are resolved.
- `DEPLOY_ON_COMPLETION=false` remains in force.
