# Orbital Voice North Star

Last updated: 2026-05-03

## North Star

Orbital is the voice-native operating layer for Third Signal.

Lenox talks. Alfred and Orbital plan, operate, capture, explain, and produce.

The flagship deliverable is the Orbital Walkthrough Co-Producer: Alfred guides the conversation, Orbital operates the system, Swarm records the trace, Research OS validates claims, Librarian stores the artifact trail, and `#admin` shows the run, approvals, and publish status.

## Target Experience

Current voice behavior is useful but too shallow:

- It can help navigate the interface.
- It does not yet reliably turn spoken intent into typed plans, tool actions, proof capture, narrative structure, and publishable artifacts.

Target behavior:

- Lenox speaks naturally about what he wants to show.
- Alfred interviews, clarifies, and proposes a story arc.
- Orbital turns the conversation into a demo scene graph.
- Orbital operates approved surfaces and adapters.
- Swarm records every intent, action, capture, approval, and handoff with trace IDs.
- Research OS checks factual claims and missing proof.
- Librarian stores the storyboard, transcript, proof log, and final package.
- `#admin` exposes the run state and approval gates.
- Field Guide and Arsenal provide cited system context when Alfred explains what Orbital is and how it works.

## Signature Deliverable

First pilot:

- Title: `Introducing Orbital`
- Format: Lenox and Alfred co-host the walkthrough.
- Goal: explain what Lenox wanted to accomplish, what he built, how Orbital works, and why the system matters.
- Demo surfaces: Orbital Studio, Swarm, Signal Card, Third Signal `#admin`, Research OS handoff, Librarian artifact trail.
- Output package: outline, scene graph, script beats, transcript, captions, proof log, timeline JSON, asset manifest, and video-ready export path.

This pilot becomes the reusable template for the Orbital video series.

## Architecture

### Voice Session Layer

Use Gemini Live through a server-side Orbital session broker.

Rules:

- Target model: `gemini-3.1-flash-live-preview`.
- Treat the model as preview and version-gate it behind config.
- Keep a stable fallback path for normal chat/voice when preview behavior changes.
- Browser clients must not receive `GEMINI_API_KEY` or other privileged provider credentials.
- Use short-lived session credentials or an equivalent server-mediated handoff.
- Persist session start, reconnect, intent, action, and completion events to Swarm.

### Alfred Director Layer

Alfred is the conversational director:

- Interviews Lenox.
- Turns raw speech into story beats and demo objectives.
- Decides when to ask clarifying questions.
- Hands typed actions to Orbital/Swarm instead of improvising hidden work.
- Explains what Orbital is doing during the walkthrough.

### Orbital Operator Layer

Orbital owns the operating surface:

- Navigates Orbital, Signal Card, `#admin`, Research OS, and approved adapters.
- Converts voice intents into safe tool actions.
- Shows pending actions before destructive or publishing steps.
- Captures proof moments and scene state for video production.

### Swarm Trace Layer

Swarm owns execution memory:

- `trace_id`
- voice session
- typed intent
- tool action
- capture step
- proof card
- Research OS claim check
- Librarian artifact
- approval gate
- publish event

Signal Card and `#admin` should only claim a handoff, proof point, or completed demo exists when Swarm has the corresponding trace.

### Knowledge Retrieval Layer

Field Guide should be the living Orbital documentation/context layer.

Arsenal should be the skill-pack and protocol catalog.

Armory still needs source confirmation. If retained, it should become the provider/tool inventory for adapters, credentials, scopes, health, and approval gates.

During walkthrough planning, Alfred should retrieve context from:

- Orbital Manifest
- Orbital Field Guide
- Arsenal
- Swarm run reports
- Librarian artifacts

Current status:

- Field Guide retrieval from Swarm is not confirmed.
- `THI-56` tracks Field Guide promotion and Swarm hook.
- `THI-70` tracks Arsenal, Armory, Manifest, and Field Guide registry mapping.

### A2UI Contract Layer

Use A2UI-style declarative cards for safe agent-generated interface state.

Required card families:

- `walkthrough.scene`
- `narration.beat`
- `tool.action`
- `capture.step`
- `proof.card`
- `approval.gate`
- `publish.asset`
- `handoff.request`

Orbital clients render trusted components only. Agents send data, not executable UI.

### ADK Lab Layer

ADK 2.0 should be evaluated in pre-prod first.

Recommended graph roles:

- Alfred Director
- Orbital Operator
- Research Fact Checker
- Librarian Archivist
- Publisher

Recommended graph route:

```text
plan -> rehearse -> execute -> capture -> review -> publish
```

Do not replace production Swarm orchestration with ADK 2.0 until compatibility, failure modes, and rollback behavior are proven.

## Linear Program

Parent:

- `THI-61`: North Star: Orbital voice-native walkthrough co-producer

Implementation tracks:

- `THI-62`: Audit Orbital voice navigation and define agentic intent taxonomy
- `THI-63`: Build Gemini Live voice session broker for Orbital
- `THI-64`: Define A2UI scene graph and approval-card contract for Orbital demos
- `THI-65`: Prototype ADK 2.0 demo director workflow in pre-prod
- `THI-66`: Implement walkthrough capture and video production pipeline
- `THI-67`: Wire co-producer traces into Swarm, Librarian, `#admin`, and Research OS
- `THI-68`: Design Orbital Context browser bridge for voice-led demos
- `THI-69`: Produce pilot video package: Introducing Orbital
- `THI-70`: Map Arsenal, Armory, Manifest, and Field Guide into Orbital knowledge registry

Related existing backlog:

- `THI-54`: End-to-end Swarm and Signal Card health checks
- `THI-55`: Librarian and manifest ingestion
- `THI-57`: Research OS MCP promotion
- `THI-58`: Orbital Context promotion
- `THI-60`: Orbital single-surface adapter platform

## Source References

- Gemini Live API capabilities: https://ai.google.dev/gemini-api/docs/live-api/capabilities
- ADK 2.0 beta docs: https://adk.dev/2.0/
- Google A2UI: https://github.com/google/A2UI
