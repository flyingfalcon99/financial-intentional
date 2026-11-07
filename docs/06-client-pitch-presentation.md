# Client Pitch & Prototype Sign-Off Presentation: FinancialIntentional.com

**Prepared For:** Robert Wroblewski (`FinancialIntentional.com`)  
**Prepared By:** Hemant (Evexta Innovations)  
**Live Prototype URL:** https://financial-intentional.vercel.app/  
**Live Interactive Pitch Deck URL:** https://financial-intentional.vercel.app/pitch

---

## Slide 1: Executive Summary & Strategic Vision
- **Primary Goal:** Transition `FinancialIntentional.com` from a legacy multi-page site into a modern, mobile-first Single-Page Application (SPA) personal brand hub.
- **Core Conversion Focus:** Precision Residential Mortgage Lead Generation, supported by Holistic Wealth Advisory (**Treece Financial Group**) and Corporate Recruiting (**JSS Recruiting**).
- **Three Strategic Drivers:**
  1. **Hyperscaler & AI SEO:** Sub-2-second mobile load times with semantic HTML5 and embedded JSON-LD structured schema (`FinancialService`, `Person`, `WebSite`, `FAQPage`).
  2. **Frictionless Mobile Conversion:** Cohesive long-scroll narrative with persistent thumb-friendly CTAs, instant mortgage scenario modeling, and 1-click lead capture.
  3. **Production-Ready Extensibility:** Built from Day 1 on Next.js (React + TypeScript) to support Headless CMS content management, 1:1 Excel formula integration, and Phase 2 CRM webhooks.

---

## Slide 2: Prototype Scope (What Is Live Today)
1. **Sticky Executive Header & Mobile Action Bar:** Smooth anchor navigation + persistent mobile conversion bar (*Calculate Payment* / *Book Strategy Call*).
2. **Hero Brand Hub & Interactive Video Briefing:** High-authority Executive Navy & Intentional Emerald theme, trust metrics, 3-pillar quick strip, and interactive video player with chapter selection.
3. **Mortgage Services & Real-Time React Calculator:** 4-step lending roadmap, 4 loan program cards, and a real-time PITI + PMI calculator with synchronized sliders, benchmark presets, and equity amortization milestones.
4. **Scenario-to-Lead Handoff:** Clicking *"Lock In This Scenario with Robert"* inside the calculator automatically attaches the visitor's exact home price, down payment, rate, and monthly payment to the contact form below.
5. **Treece Financial Group Advisory Section:** Highlights asset/liability alignment with a dedicated regulatory & licensing disclosure block.
6. **JSS Recruiting Dual-Track Section:** Tailored paths for Hiring Organizations and Confidential Executive Candidates.
7. **Lead Capture & Calendly Scheduling Hub:** Native `/api/leads` form with honeypot anti-spam protection alongside an interactive Calendly consultation scheduler.

---

## Slide 3: Architecture, Hosting & Email Safety
- **Frontend & Edge Hosting:** Next.js (App Router, Server-Side Rendering) deployed on **Vercel** for instant edge delivery.
- **Content Layer:** Decoupled data store (`src/lib/site-content.ts`) ready for **Sanity.io** or **Headless WordPress (GraphQL)**.
- **GoDaddy DNS & Microsoft 365 Guarantee:** Only the root `@` (`A`) and `www` (`CNAME`) web records will point to Vercel at launch. Existing GoDaddy `MX`, `SPF`, `DKIM`, and Microsoft 365 email routing remain **100% untouched**.

---

## Slide 4: Custom Mortgage Calculator Roadmap
- **Stage 1 (Live in Prototype):** Validates the UI/UX flow, slider responsiveness, PITI breakdown visualization, and lead handoff using standard mortgage amortization math.
- **Stage 2 (Epic 5 — Post-Sign-Off):** Because all calculation logic is isolated inside `src/lib/calculator-engine.ts`, Robert’s custom Excel workbook formulas will be mapped 1:1 into `calculateMortgageScenario()` and verified against spreadsheet test cases without changing the approved UI.
- **Scope Caveat:** Standard mathematical and financial formulas are included in the $1,775 base contract; if the Excel workbook relies on complex VBA macros or paid external rate APIs, scope and timeline will be reviewed upon workbook handoff.

---

## Slide 5: Key Decision Points & Epic 1 Handoff Checklist
- [ ] **1. Excel Workbook Handoff (Robert → Hemant):** Share the `.xlsx` mortgage workbook for formula mapping and complexity audit.
- [ ] **2. Headless CMS Selection (Joint Decision):** Choose between **Sanity.io** (recommended for speed & zero maintenance) or **Headless WordPress**.
- [ ] **3. Legal & Regulatory Disclosures (Robert):** Provide final NMLS ID, state licensing text, and Treece Financial Group / broker disclosures.
- [ ] **4. Brand Assets & Links (Robert):** Deliver vector logo files (`SVG`/`EPS`), introductory video embed link, and live Calendly URL.

---

## Slide 6: Commercial Terms, Milestones & 90-Day SLA
- **Base Contract Value:** $1,775
- **Milestone Schedule (40 / 25 / 25 / 10):**
  - **40% ($710.00):** Kickoff, Discovery & Architecture Setup
  - **25% ($443.75):** Prototype & Single-Page UI/UX Sign-Off *(Current Milestone)*
  - **25% ($443.75):** 1:1 Excel Calculator Integration, Headless CMS & Pre-Launch Functional Review
  - **10% ($177.50):** Production GoDaddy DNS Cutover & 90-Minute Training Session
- **Governance & Ownership:**
  - **100% Ownership:** Robert retains full ownership of the domain, codebase, and assets upon final payment.
  - **Revisions:** 2 design rounds + 1 pre-launch functional review.
  - **Maintenance SLA:** 90 days post-launch bug support with a **48-hour response SLA** for critical issues.
