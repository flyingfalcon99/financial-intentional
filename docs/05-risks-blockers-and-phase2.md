# Risk Register, Blockers & Phase 2 Sandbox

## 1. Active Dependencies & Blockers Tracker (Epic 1)

| ID | Dependency / Item | Owner | Status | Impact / Mitigation |
| :--- | :--- | :--- | :--- | :--- |
| **DEP-01** | **Robert's Mortgage Excel Workbook** | Robert / Hemant | ⏳ Pending Handoff | Prototype uses standard PITI + PMI engine in `src/lib/calculator-engine.ts`. **Caveat:** If workbook contains VBA macros or external rate APIs, timeline and $1,775 budget require renegotiation. |
| **DEP-02** | **NMLS, State & Treece Financial Disclosures** | Robert | ⏳ Pending Legal Text | Prototype includes structured disclosure slots in the Advisory section and Footer ready for exact compliance copy. |
| **DEP-03** | **Vector Brand Logos (SVG/EPS)** | Robert | ⏳ Pending Assets | Prototype uses clean SVG monogram & typographic lockups ready for drop-in asset replacement. |
| **DEP-04** | **Headless CMS Selection** | Hemant / Robert | 🔍 Decision Open | Choose between **Sanity.io** (recommended for Next.js speed) or **Headless WordPress** (if Robert prefers WP admin). Content is already decoupled in `src/lib/site-content.ts`. |
| **DEP-05** | **Live Calendly Scheduling URL** | Robert | ⏳ Pending Link | Prototype includes an interactive scheduling preview + configurable `NEXT_PUBLIC_CALENDLY_URL` support. |

---

## 2. Phase 2 Sandbox (Backlog — Out of Scope for Phase 1 Sprint)
To keep Phase 1 focused on launching the high-converting SPA and custom calculator on budget, the following items are parked for Phase 2:
- **Direct CRM Webhook Integration (HubSpot / Salesforce / Encompass LOS):**
  - `src/app/api/leads/route.ts` is already structured with a clean `forwardLeadToCrm()` hook so Phase 2 CRM integration requires zero frontend changes.
- **Automated Daily Live Mortgage Rate Feed Integration:**
  - Optional API integration (e.g., Optimal Blue / Mortgage News Daily) to auto-populate default interest rates by loan program.
- **PDF Scenario Export & Email Drip Trigger:**
  - Allowing visitors to download a branded PDF of their custom mortgage scenario.
