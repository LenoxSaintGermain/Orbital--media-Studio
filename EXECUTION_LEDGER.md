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

- Gemini Live targets `gemini-3.1-flash-live-preview` through a server-side session broker.
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
- Agents should not assume Armory exists until `THI-70` confirms a source or retires the name.
