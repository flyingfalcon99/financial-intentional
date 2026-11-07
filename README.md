# FinancialIntentional.com — Foundational Next.js Prototype

**Client:** Robert Wroblewski (`FinancialIntentional.com`)  
**Engineering Partner:** Hemant (Evexta Innovations)

## 1. Overview & Prototype Scope
This repository contains the foundational **Next.js (App Router + TypeScript)** Single-Page Application (SPA) prototype for **FinancialIntentional.com**. It is engineered from the ground up to serve as the production foundation rather than throwaway prototype code:

- **Single-Page Long-Scroll Flow:**
  1. **Executive Hero Section:** Brand positioning, trust metrics, 3-pillar quick navigation, and interactive **Executive Video Briefing** player with chapter markers.
  2. **Precision Mortgage Services & Interactive Calculator:** 4-step lending roadmap, real-time **React Mortgage & PITI Calculator** with synchronized sliders/inputs, scenario presets, equity amortization milestones, and 1-click scenario handoff to the lead form.
  3. **Financial Advisory (Treece Financial Group):** Holistic wealth alignment pillars and modular regulatory/compliance disclosure banner.
  4. **Corporate Recruiting (JSS Recruiting):** Dual-track presentation for Hiring Organizations and Confidential Executive Candidates.
  5. **About Robert Wroblewski:** Executive narrative, philosophy quote, and cross-pillar credentials.
  6. **Lead Capture & Calendly Scheduling Hub:** Native `/api/leads` form (with honeypot anti-spam and attached calculator scenario summary) alongside an interactive Calendly consultation scheduler and SEO FAQ block.

## 2. Project Structure & Antigravity Knowledge Base

```text
financial-intentional/
├── docs/                                   # Antigravity Knowledge Base
│   ├── 01-business-context-and-sla.md      # 40/25/25/10 milestones & 90-day SLA
│   ├── 02-technical-specifications.md      # Next.js SSR, Vercel, GoDaddy M365 DNS safety
│   ├── 03-design-system-and-assets.md      # Executive Navy & Intentional Emerald tokens
│   ├── 04-calculator-logic-map.md          # PITI math & Excel 1:1 replacement contract
│   └── 05-risks-blockers-and-phase2.md     # Epic 1 blockers & Phase 2 CRM Sandbox
├── src/
│   ├── app/
│   │   ├── api/leads/route.ts              # Lead capture API + Phase 2 CRM webhook hook
│   │   ├── globals.css                     # Vanilla CSS Token System (Navy & Emerald)
│   │   ├── layout.tsx                      # SSR Metadata & Hyperscaler JSON-LD (@graph)
│   │   └── page.tsx                        # Server Component entry
│   ├── components/
│   │   ├── SinglePageHub.tsx               # Client state coordinator for scenario handoff
│   │   ├── calculator/MortgageCalculator.tsx
│   │   ├── layout/{Header,Footer}.tsx
│   │   └── sections/{Hero,Mortgage,Advisory,Recruiting,About,Contact}Section.tsx
│   └── lib/
│       ├── calculator-engine.ts            # Pure TypeScript mortgage calculation engine
│       ├── site-content.ts                 # Decoupled CMS-ready content store
│       └── seo-schema.ts                   # Structured JSON-LD generator
```

## 3. Running Locally & Deploying to Vercel

```bash
# Start development server
npm run dev

# Verify production build
npm run build
npm run start
```
