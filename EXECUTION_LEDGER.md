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

