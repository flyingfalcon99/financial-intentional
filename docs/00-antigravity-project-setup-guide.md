# Antigravity Project Setup Strategy

When importing this project into Antigravity to build out your multi-step execution plan, structuring your artifacts and workflows efficiently will be critical. Here is the recommended approach to configuring the workspace.

## 1. Document Structure & Artifacts
Set up a central "Knowledge Base" or "Documentation" hub in Antigravity containing these core artifacts:
*   **Business Context & SLA:** The agreed-upon commercial terms, payment milestones (40/25/25/10), and maintenance definitions.
*   **Technical Specifications:** The details on the Next.js/Vercel architecture.
*   **Design System & Assets:** The green/navy palette hex codes, typography choices, and a repository for Robert's logo files.
*   **Calculator Logic Map:** A dedicated document mapping the Excel inputs, variables, formulas, and required outputs.

## 2. Project Hierarchy (Epics & Tasks)
Structure the development plan using a top-down hierarchy. You can ask Antigravity to generate granular tasks based on these Epics:

*   **Epic 1: Discovery & Asset Handoff**
    *   *Tasks:* Review Excel file, secure high-res logos, finalize headless CMS choice, sign final agreement.
*   **Epic 2: Environment Setup & Infrastructure**
    *   *Tasks:* Scaffold Next.js app, set up Headless CMS, configure Vercel deployment pipeline, verify GoDaddy DNS limits.
*   **Epic 3: UI/UX Design & Prototyping**
    *   *Tasks:* Wireframe single-page scroll, apply green/navy theme, design mobile CTAs, conduct Client Review Round 1.
*   **Epic 4: Frontend Development (The Long-Scroll)**
    *   *Tasks:* Build Hero section, Mortgage section, Advisory section, About section, integrate Calendly embed.
*   **Epic 5: Calculator Engineering**
    *   *Tasks:* Translate Excel math to JavaScript functions, build React UI components (sliders/inputs), connect state, QA against Excel test cases.
*   **Epic 6: SEO, Analytics, & QA**
    *   *Tasks:* Implement JSON-LD schema, configure SSR meta tags, set up GA4/Search Console, run Lighthouse performance audits.
*   **Epic 7: Deployment & Handoff**
    *   *Tasks:* Point GoDaddy DNS to Vercel (protecting MX records), verify live functionality, execute final 10% payment, conduct 90-minute training session.

## 3. Using Antigravity Effectively
*   **Prompting for Sub-tasks:** Feed the *Calculator Engineering* Epic into Antigravity and ask it to write the exact React state-management acceptance criteria based on the variables found in Robert's Excel sheet.
*   **Risk Tracking:** Create a tag or board for "Dependencies/Blockers" (e.g., waiting on NMLS compliance text, waiting on Excel file).
*   **Phase 2 Sandbox:** Create a backlog section for "CRM Integration" so ideas discussed now don't clutter the Phase 1 sprint board.