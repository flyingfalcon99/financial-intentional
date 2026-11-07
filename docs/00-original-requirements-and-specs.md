# Project Requirements and Specifications: FinancialIntentional.com

## 1. Executive Summary
**Client:** Robert Wroblewski
**Developer:** Hemant (Evexta Innovations)
**Project Goal:** Create a modern, mobile-first, single-page application (SPA) website to serve as Robert's personal brand hub. The primary focus is mortgage lead generation, supported by financial advisory and corporate recruiting. 
**Key Drivers:** High performance for AI discoverability (Hyperscaler SEO), immediate mobile conversions, and a foundation that supports future CRM integrations.

## 2. Architecture & Technology Stack
To support the transition from a multi-page site to a high-performance SPA, the architecture will pivot from a monolithic WordPress build to a decoupled (headless) stack.
*   **Frontend:** Next.js (React) utilizing Server-Side Rendering (SSR) for optimal SEO and performance.
*   **Backend/CMS:** Headless WordPress (via GraphQL) or Sanity.io. This allows Robert to manage content/blogs easily without frontend plugin bloat.
*   **Hosting/Deployment:** Vercel (Frontend) for edge-network speed.
*   **DNS & Email:** GoDaddy (existing). DNS records will be pointed to Vercel for web traffic, ensuring Microsoft 365 email routing remains completely untouched.

## 3. Functional Requirements
*   **Single-Page Layout (Long-Scroll):**
    *   *Hero Section:* Trust badges, prominent Calls to Action (CTAs), introductory video embed.
    *   *Mortgage Services:* Value proposition, process overview, and the interactive Mortgage Calculator.
    *   *Financial Advisory:* Overview of Treece Financial Group relationship and licensed disclosures.
    *   *Corporate Recruiting:* JSS Recruiting overview and inquiry path.
    *   *About Robert:* Bio, credentials, and affiliations.
    *   *Contact & Booking:* Integrated form and Calendly embed.
*   **Custom Mortgage Calculator:**
    *   Direct 1:1 mapping of logic from Robert's provided Excel workbook.
    *   UI components (sliders, inputs) built natively in React/Next.js for instant calculation without page reloads.
*   **Lead Capture & Scheduling:**
    *   Native contact form with email notifications and anti-spam.
    *   Calendly integration embedded into the UI flow.

## 4. Non-Functional Requirements (NFRs)
*   **Performance & SEO ("Hyperscaler SEO"):** Sub-2-second load times on mobile. Implementation of robust JSON-LD schema markup, semantic HTML, and dynamic meta tags via Next.js.
*   **Analytics & Tracking:** Integration of Google Analytics 4 (GA4) and Google Search Console to monitor inquiry origins and index health.
*   **Design & UI/UX:** Adherence to the provided green and navy color palette and high-resolution logo files. Mobile-first design prioritizing thumb-friendly CTAs.
*   **Future Extensibility:** The React-based architecture must allow for seamless API-driven CRM integration (e.g., HubSpot/Salesforce) in Phase 2.

## 5. Commercial & SLA Clarifications (To be finalized in contract)
*   **Ownership:** Robert retains 100% ownership of the site, domain, and source code upon final payment.
*   **Revisions:** Defined as 2 design rounds and 1 pre-launch functional review.
*   **Maintenance:** 90 days of limited post-launch support with defined SLAs (e.g., 48-hour response for critical bugs).

## 6. Decision Points & Caveats
*   **Calculator Complexity Risk:** *Decision Point:* Hemant must review the Excel file immediately. *Caveat:* If the workbook contains complex macros or API dependencies outside of standard math formulas, the timeline and $1,775 cost must be renegotiated.
*   **CMS Selection:** *Decision Point:* Choose between Headless WordPress (better if Hemant/Robert are highly accustomed to WP) or Sanity.io (cleaner developer experience for Next.js).
*   **Legal Compliance:** *Caveat:* Robert is strictly responsible for providing all required NMLS, state, and broker affiliation disclosures prior to launch.
*   **Asset Handoff:** *Decision Point:* Ensure Robert provides vector-based (SVG/EPS) or high-res transparent PNG logos before design kickoff.

## 7. Reference Summary
*   **Architecture/Stack Benchmark:** [Kingfisher Mortgages Case Study](https://efesop.com/case-studies/kingfisher-mortgages) (Next.js + Headless CMS for a broker).
*   **UI/UX Inspiration:** [SecureVest Next.js Template](https://themeforest.net/item/securevest-modern-digital-banking-financial-services-nextjs-template/64514005) (Native React calculators and clean data presentation).
*   **Single-Page Flow:** [ConvertFlow Mortgage Landing Pages](https://www.convertflow.com/campaigns/mortgage-landing-pages) (Optimized long-scroll conversion funnels).