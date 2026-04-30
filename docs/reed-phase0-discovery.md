# Reed Building Supply — Phase 0 Discovery Responses

Captured from a combination of:
- **[CONFIRMED]** — Colton-confirmed on prospect calls (treat as ground truth)
- **[HYPOTHESIS]** — Web research / public records (Procore, FMCSA, BBB, LinkedIn). Prospect to validate.
- **[OPEN]** — Not yet captured; raise on next call.

This file replaces the in-portal discovery form. New questions or revised answers should be edited here, not re-built into the portal.

---

## Identity

| Field | Value | Source |
|---|---|---|
| Company (legal) | Reed Building Supply, LLC | BBB / FMCSA / `reedbuildingsupply.com` |
| Primary contact | Aaron Reed (Founder / President) | LinkedIn |
| Site address | 441 Robb St, McKees Rocks, PA 15136 | FMCSA — single physical location |
| Cert / status | MBE / SBE certified; BBB file opened June 2018 | BBB |

> ⚠️ Brand naming: legal name is "Reed Building **Supply**." Internal code/portal sometimes still says "Reed Building **Materials**" — same company. Standardize on "Reed Building Supply" in customer-facing materials.

---

## Section 1 — Infrastructure & Scale

### Total user seats
**[CONFIRMED]** ~13–15 system user seats across roles:
- Owner / executive
- Sales counter
- Yard / warehouse
- Drivers
- Office / accounting
- Estimator

### Total branch locations
**[HYPOTHESIS]** 1 physical location (441 Robb St, McKees Rocks, PA). FMCSA-confirmed, no satellite addresses found in public records. Prospect to confirm whether any subleased yard or off-site storage exists.

### Managed AI/API layer vs self-serve
**[HYPOTHESIS]** Managed (one-click out-of-the-box, single monthly line item). Reed's IT footprint is small and they aren't likely to want to operate model endpoints or integration plumbing themselves. Confirm on call: do they have any in-house dev or IT-ops resources?

---

## Section 2 — Data & Migration

### Estimated SKU count
**[CONFIRMED]** ~3,000–5,000 active SKUs in QuickBooks. Commercial supply mix (lumber, hardscape, fasteners, building materials).

### QuickBooks environment
**[HYPOTHESIS]** **QuickBooks Desktop Enterprise** — only viable QB edition at Reed's contract scale (Procore avg contract size > $10M). Confirm exact edition + version on call.

### Inventory costing
**[HYPOTHESIS]** Standard average costing in QuickBooks (default for Enterprise without the Advanced Inventory FIFO add-on). Confirm whether they have FIFO or any item-specific cost layers.

---

## Section 3 — Payments & Revenue

### Annual transaction volume (GMV)
**[HYPOTHESIS]** POS / Clover GMV likely small: estimated **$100K–$500K/yr**. Total business GMV is much larger but flows through on-account billing, not POS. Confirm split.

### Payment split (POS vs on-account)
**[HYPOTHESIS]** **~95% on-account** / ~5% POS-cash-credit. Driven by Reed's commercial-supply profile (>$10M avg Procore contracts).

### Physical checkout lanes / Clover terminals
**[HYPOTHESIS]** 1–2 terminals (counter + yard). Low priority — most volume is on-account. Confirm on call.

### Invoice / statement processes
**[HYPOTHESIS]** Monthly statements + emailed invoices, likely with **AIA G702/G703 progress billing** on commercial contracts. Confirm:
- Cadence (monthly vs per-job)
- Email vs portal vs paper mix
- Collections workflow + dunning

---

## Section 4 — Logistics

### Delivery fleet size
**[CONFIRMED]** **1 power unit, 1 driver** per USDOT 2984576 (2023, 55K mi/yr). Implies most freight rides on 3rd-party carriers.

### Current routing solution
**[OPEN]** Probably manual / Google Maps for the single truck; no dedicated routing software on file. Confirm whether they use a TMS or any dispatcher software.

### Freight broker integrations
**[HYPOTHESIS]** Active 3rd-party carrier handoff. Confirm which brokers/carriers are primary so we can scope read-only portal integrations.

---

## Open Questions for Next Call

1. SSO / identity provider — Google Workspace or Microsoft 365? (Drives Phase 2 SSO planning.)
2. Any on-prem backup or compliance retention requirement beyond cloud PITR?
3. Project / job tracking tool — pure QuickBooks Job Costing, or layered on Procore?
4. Pricing tier complexity — how many distinct customer pricing tiers exist today?
5. Approval workflow on quote overrides — who can override the price floor?

---

## Sources

- FMCSA carrier lookup (USDOT 2984576)
- BBB profile — Reed Building Supply, LLC
- LinkedIn company page (employees 11–50)
- Procore prospect data (avg contract size > $10M)
- `reedbuildingsupply.com`
- Colton-confirmed prospect call notes (week of 2026-04-21, 2026-04-29)
