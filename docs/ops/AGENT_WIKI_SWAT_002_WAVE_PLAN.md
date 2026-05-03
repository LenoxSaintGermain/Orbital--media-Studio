# Agent Wiki SWAT-002 Wave Plan

Last updated: 2026-05-03

Classification: `TSL-SWAT-002`

Linear:

- `THI-72`: Agent Wiki parent
- `THI-92`: Wave A filesystem scaffold
- `THI-93`: Librarian proposal and commit workflow
- `THI-94`: Swarm event schema and trace contract
- `THI-95`: Wave B runtime implementation blockers

## Chief Decision

Run SWAT-002 in two waves.

Wave A ships filesystem artifacts, schemas, contracts, seed pages, context pack, cards, and an Integration Sentinel report.

Wave B remains blocked until runtime/security/orchestration blockers are closed.

## Wave A: Filesystem MVP

Status: completed locally and ingested by Librarian on 2026-05-03.

Target repo:

- `/Users/lenoxparis/Library/CloudStorage/GoogleDrive-treble.design@gmail.com/My Drive/AI/case studies/career-agent-one`

Target path:

- `docs/agent-wiki/`

Output:

- `AGENT_WIKI_SCHEMA.md`
- `index.md`
- `log.md`
- Librarian proposal and commit workflow contract
- Swarm event and trace contract
- Alfred retrieval contract
- Orbital Context CaptureCard submission contract
- Ghost and Armory pages/cards
- Initial Armory registry with `GEMINI_LIVE_MODEL` alias policy
- `Introducing Orbital` context pack
- Runtime infra spec, not deployed infrastructure
- Integration Sentinel report

Rules:

- Sources are immutable.
- Librarian owns canonical writes.
- Non-Librarian agents propose or create scoped artifacts only.
- Ghost observes and escalates; Ghost does not rewrite canon.
- Orbital Context submits CaptureCards; it does not write canon directly.
- Swarm events are declared as contracts/stubs; runtime persistence is Wave B.
- Donna/Signal Card receives public-safe cards only.
- `DEPLOY_ON_COMPLETION=false`.

## Wave B: Runtime Enablement

Status: blocked.

Do not start Wave B implementation until these blockers are resolved or explicitly waived:

- `THI-88`: Conductor prompt routing
- `THI-89`: Conductor webhook verification
- `THI-90`: Conductor artifact ingest
- `THI-91`: Browser-bundled Gemini key removal
- `THI-80`-`THI-84`: Orbital Context broker, redaction, traces, and v2 deploy gates

Wave B target capabilities:

- Retrieval API or MCP endpoint
- Firestore/Pub/Sub persistence
- Swarm trace persistence
- `#admin` queues and review workflow
- Conductor-routed SWAT tasks
- Orbital Context production submission pipeline

## OUP Gate

Every lane output must include:

```text
[OUP-GATE]
Q1: What object type does this output produce or modify?
Q2: Does this output touch Librarian's write authority? If YES, proposal or commit?
Q3: Does every action in this output emit or declare a Swarm trace event? List event names.
Q4: Are any claims marked with evidence labels?
Q5: Does any output surface to Donna/Signal Card? If YES, confirm public-safe card only.
[/OUP-GATE]
```

## Integration Sequence

1. `INFRA` contracts
2. `LIBRARIAN` schema and commit authority
3. `SWARM` event contract
4. `ARMORY` registry
5. `ORBITAL CONTEXT` intake contract
6. `GHOST` observation layer
7. `ALFRED` retrieval and context pack
8. `INTEGRATION SENTINEL` diff, contract, gate, and changelog review

## Sentinel Acceptance

- No non-Librarian canon commit outside scoped artifacts.
- Source, Claim, Page, Card schemas are coherent.
- Every lane declares required Swarm events.
- Ghost does not write canon.
- Orbital Context does not write canon.
- `GEMINI_LIVE_MODEL` alias policy preserves the current working preview path.
- Donna/Signal Card boundaries remain public-safe.
- Librarian ingest succeeds.

Wave A result:

- Librarian ingest processed 26 files with 0 failures.
- Runtime deployment: none.
- Production changes: none.
