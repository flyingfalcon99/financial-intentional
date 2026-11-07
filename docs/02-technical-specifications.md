# Technical Specifications & Infrastructure Architecture

## 1. Decoupled Stack Overview
- **Frontend Framework:** Next.js (App Router, TypeScript, Server-Side Rendering + Static Edge Optimization).
- **Styling Architecture:** Custom Vanilla CSS Token System (`src/app/globals.css`) engineered for zero runtime CSS overhead and sub-2-second mobile First Contentful Paint (FCP).
- **Content Layer (Headless CMS Ready):**
  - Abstracted via `src/lib/site-content.ts` with typed interfaces (`SiteContent`, `MortgageProgram`, `AdvisoryPillar`, `RecruitingTrack`).
  - Ready for drop-in connection to **Sanity.io** or **Headless WordPress (WPGraphQL)** without modifying React component trees.
- **Hosting & Edge Network:** Vercel Production & Preview Deployments.

## 2. Hyperscaler SEO & AI Discoverability
- **Structured Data (JSON-LD):** Embedded `@graph` schema in `src/lib/seo-schema.ts` defining:
  - `FinancialService` & `MortgageLender` (Financial Intentional)
  - `Person` (Robert Wroblewski, NMLS & Advisory affiliations)
  - `WebSite` & `FAQPage` entities for direct citation by AI search engines (ChatGPT Search, Perplexity, Google AI Overviews).
- **Semantic HTML5:** Strict landmark hierarchy (`<header>`, `<main>`, `<section aria-labelledby="...">`, `<footer>`) and single `<h1>` enforcement.

## 3. DNS Cutover & Microsoft 365 Email Protection Protocol
- **Current Registrar / DNS Host:** GoDaddy.
- **Critical Requirement:** Microsoft 365 email routing (`MX`, `SPF/TXT`, `DKIM/CNAME`, `Autodiscover`) must remain **100% untouched** during web cutover.
- **Cutover Procedure (Epic 7):**
  1. Audit and export current GoDaddy Zone File backup prior to any edits.
  2. Update **only** the root `@` `A` record to Vercel's Anycast IP (`76.76.21.21`) and `www` `CNAME` record to `cname.vercel-dns.com`.
  3. Verify `MX` and `TXT` (`v=spf1 include:spf.protection.outlook.com -all`) records remain intact before saving changes.
