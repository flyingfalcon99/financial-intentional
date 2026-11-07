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
- [ ] **2. Headless CMS Selection (Joint Decision):** Choose between **Sanity.io** (recommended for speed & $0/mo free tier) or **Headless WordPress**.
- [ ] **3. Legal & Regulatory Disclosures (Robert):** Provide final NMLS ID, state licensing text, and Treece Financial Group / broker disclosures.
- [ ] **4. Brand Assets & Links (Robert):** Deliver vector logo files (`SVG`/`EPS`), introductory video embed link, and live Calendly URL.

---

## Slide 6: Time & Effort to Production + Client Infrastructure Costs

### Part A: Remaining Time & Engineering Effort (~2.5 to 3.5 Weeks / 38–45 Hours)
- **Week 1 (12–15 Hours) — Epic 5: 1:1 Excel Calculator Engineering & QA**
  - Audit Robert’s `.xlsx` file, translate all named cells, lookup tables, and formulas into `src/lib/calculator-engine.ts`, and verify cent-for-cent parity against 10 spreadsheet test rows.
- **Week 2 (14–16 Hours) — Epic 2 & 4: Headless CMS, Resend Email & Final Assets**
  - Configure Sanity.io Studio (or Headless WP), wire Resend transactional email notifications for the lead form, embed final vector logos/video/live Calendly URL, and insert final NMLS & Treece Financial compliance text.
- **Week 3 (10–14 Hours) — Epic 6 & 7: SEO, Analytics, GoDaddy DNS Launch & Training**
  - Connect GA4 & Google Search Console, run Lighthouse mobile speed audits (<2s verification), execute GoDaddy web DNS cutover to Vercel (preserving Microsoft 365 email), and deliver the 90-minute training session.

### Part B: Client-Side Hosting, Email & SaaS Subscription Breakdown

| Service / Layer | Recommended Provider | Lean Launch Tier (Recommended) | Pro / Growth Tier (Optional) |
| :--- | :--- | :--- | :--- |
| **Frontend Edge Hosting** | **Vercel** | **$0 / mo** (Starter Tier) | **$20 / mo** (Vercel Pro) |
| **Headless CMS** | **Sanity.io** (or Headless WP) | **$0 / mo** (Free: 3 users, 100k API reqs/mo) | **$15 / mo** (if using managed WP host) |
| **Lead Form Email Delivery** | **Resend** (Transactional Email API) | **$0 / mo** (Free: 3,000 emails/mo) | **$20 / mo** (50,000+ emails/mo) |
| **Domain & Business Email** | **GoDaddy + Microsoft 365** | **Existing** (No new cost; M365 untouched) | **Existing** (~$6–$12/mo M365) |
| **Calendar Scheduling** | **Calendly** | **$0 / mo** (Basic: 1 consultation event type) | **$10–$12 / mo** (Multiple pillar event types) |
| **SEO, Analytics & CRM** | **Google GA4 + HubSpot CRM** | **$0 / mo** (GA4 + HubSpot Free CRM) | **$15–$20 / mo** (HubSpot Starter in Phase 2) |
| **Total New Recurring Cost** | | **$0 / month** | **~$10 to $32 / month** |

---

## Slide 7: One-Time Development Investment, Milestones & 90-Day SLA
- **One-Time Development Investment:** **$1,775**
- **Milestone Schedule (40 / 25 / 25 / 10):**
  - **40% ($710.00):** Kickoff, Discovery & Architecture Setup
  - **25% ($443.75):** Prototype & Single-Page UI/UX Sign-Off *(Current Milestone)*
  - **25% ($443.75):** 1:1 Excel Calculator Integration, Headless CMS & Pre-Launch Functional Review
  - **10% ($177.50):** Production GoDaddy DNS Cutover & 90-Minute Training Session
- **Governance & Ownership:**
  - **100% Ownership:** Robert retains full ownership of the domain, codebase, and assets upon final payment.
  - **Revisions:** 2 design rounds + 1 pre-launch functional review.
  - **Maintenance SLA:** 90 days post-launch bug support with a **48-hour response SLA** for critical issues.

---

## Slide 8: Immediate Next Steps
1. **Today:** Approve single-page layout, Navy/Emerald visual theme, and calculator UX flow (Milestone 2 Sign-Off).
2. **This Week:** Hand off the Excel mortgage workbook, vector logos, Calendly URL, and NMLS/Treece disclosure copy.
3. **3-Week Production Sprint:** Execute 1:1 Excel formula integration, Sanity CMS + Resend email wiring, GA4 setup, and GoDaddy DNS launch.
