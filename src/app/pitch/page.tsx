'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface SlideItem {
  id: string;
  tabLabel: string;
  badge: string;
  title: string;
  subtitle: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 'vision',
    tabLabel: '1. Vision',
    badge: 'Slide 01 • Executive Summary & Vision',
    title: 'Transforming FinancialIntentional.com into a High-Converting Personal Brand Hub',
    subtitle:
      'Prepared for Robert Wroblewski by Hemant (Evexta Innovations) — Prototype Architecture & Sign-Off Briefing',
  },
  {
    id: 'scope',
    tabLabel: '2. Prototype Scope',
    badge: 'Slide 02 • Live Prototype Scope',
    title: 'What Is Live Today at financial-intentional.vercel.app',
    subtitle:
      'Built from the ground up on the production Next.js framework—zero throwaway mockup code.',
  },
  {
    id: 'stack',
    tabLabel: '3. Tech Stack & DNS',
    badge: 'Slide 03 • Architecture, Hosting & Email Protection',
    title: 'Why We Pivoted from Monolithic WordPress to Decoupled Next.js + Vercel',
    subtitle:
      'Sub-2-second mobile speed and AI SEO discoverability while keeping GoDaddy Microsoft 365 email 100% untouched.',
  },
  {
    id: 'calculator',
    tabLabel: '4. Calculator Roadmap',
    badge: 'Slide 04 • Custom Calculator Engineering Roadmap',
    title: 'Two-Stage Calculator Strategy: UX Flow First, 1:1 Excel Precision Next',
    subtitle:
      'Clean architectural separation between the React slider UI and the underlying mathematical engine.',
  },
  {
    id: 'decisions',
    tabLabel: '5. Decision Points',
    badge: 'Slide 05 • Key Decision Points & Asset Handoff',
    title: '4 Items to Finalize to Move from Prototype Sign-Off to Production',
    subtitle:
      'Interactive checklist covering the Excel workbook audit, Headless CMS choice, NMLS disclosures, and brand assets.',
  },
  {
    id: 'effort-costs',
    tabLabel: '6. Effort & SaaS Costs',
    badge: 'Slide 06 • Time & Effort to Production + Client Infrastructure Costs',
    title: '3-Week Production Sprint & Near-Zero Recurring Software Overhead',
    subtitle:
      'Remaining Engineering Effort: ~2.5 to 3.5 Weeks (~38–45 Hrs) • Client New Monthly SaaS Overhead: $0/mo (Lean) to ~$10–$32/mo (Pro)',
  },
  {
    id: 'sla',
    tabLabel: '7. Milestones & SLA',
    badge: 'Slide 07 • One-Time Development Investment, Governance & 90-Day SLA',
    title: 'Transparent Milestone Schedule & Post-Launch Support Guarantees',
    subtitle:
      '$1,775 Base Scope • 40/25/25/10 Milestone Structure • 100% Client Ownership of Code, Domain & Assets.',
  },
  {
    id: 'next',
    tabLabel: '8. Sign-Off',
    badge: 'Slide 08 • Prototype Sign-Off & Next Steps',
    title: 'Securing Round 1 Approval & Launching Epic 4/5 Execution',
    subtitle:
      'Immediate action plan following approval of the single-page layout and interactive calculator flow.',
  },
];

export default function PitchDeckPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const current = SLIDES[activeSlide];

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--navy-950)',
        color: 'var(--text-on-dark)',
        padding: '2rem 0 4rem',
      }}
    >
      <div className="container">
        {/* Top Presentation Bar */}
        <div
          style={{
            backgroundColor: 'var(--navy-900)',
            border: '1px solid var(--border-dark)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.15rem 1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            marginBottom: '1.25rem',
          }}
        >
          <div className="brand-lockup">
            <span className="brand-monogram">FI</span>
            <div>
              <span className="brand-text-primary">
                FinancialIntentional.com — Executive Pitch Deck
              </span>
              <span className="brand-text-sub">
                Client: Robert Wroblewski • Partner: Hemant (Evexta Innovations)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
            <Link
              href="/"
              className="btn btn-secondary-dark"
              style={{ minHeight: '38px', padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
            >
              ← View Live Prototype Site
            </Link>
            <button
              type="button"
              onClick={() => setActiveSlide((s) => Math.max(0, s - 1))}
              disabled={activeSlide === 0}
              className="btn btn-secondary-dark"
              style={{
                minHeight: '38px',
                padding: '0.4rem 0.85rem',
                fontSize: '0.82rem',
                opacity: activeSlide === 0 ? 0.4 : 1,
              }}
            >
              ← Prev
            </button>
            <span
              className="tabular-nums"
              style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: 'var(--emerald-400)',
                padding: '0 0.4rem',
              }}
            >
              {activeSlide + 1} / {SLIDES.length}
            </span>
            <button
              type="button"
              onClick={() => setActiveSlide((s) => Math.min(SLIDES.length - 1, s + 1))}
              disabled={activeSlide === SLIDES.length - 1}
              className="btn btn-primary"
              style={{
                minHeight: '38px',
                padding: '0.4rem 0.95rem',
                fontSize: '0.82rem',
                opacity: activeSlide === SLIDES.length - 1 ? 0.4 : 1,
              }}
            >
              Next Slide →
            </button>
          </div>
        </div>

        {/* Slide Selector Strip */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.5rem',
          }}
        >
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveSlide(idx)}
              className={`preset-pill ${activeSlide === idx ? 'active' : ''}`}
            >
              {s.tabLabel}
            </button>
          ))}
        </div>

        {/* Active Slide Stage */}
        <div
          style={{
            backgroundColor: 'var(--navy-900)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.25rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div
            style={{
              borderBottom: '1px solid var(--border-dark)',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
            }}
          >
            <span className="eyebrow eyebrow-on-dark">{current.badge}</span>
            <h1
              style={{
                fontSize: 'clamp(1.65rem, 3vw, 2.35rem)',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.5rem',
              }}
            >
              {current.title}
            </h1>
            <p style={{ fontSize: '1rem', color: 'var(--text-on-dark-muted)' }}>
              {current.subtitle}
            </p>
          </div>

          {/* SLIDE 0: VISION */}
          {activeSlide === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div className="cards-grid-3">
                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span className="eyebrow eyebrow-on-dark">Key Driver 01</span>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                    Hyperscaler &amp; AI SEO Speed
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-on-dark-muted)' }}>
                    Sub-2-second mobile load times with semantic HTML5 and embedded JSON-LD structured
                    data so Google, ChatGPT Search, and Perplexity surface Robert’s authority.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span className="eyebrow eyebrow-on-dark">Key Driver 02</span>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                    Immediate Mobile Conversions
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-on-dark-muted)' }}>
                    Replaces multi-page click fatigue with a cohesive single-page long-scroll funnel,
                    tactile calculator sliders, and persistent thumb-friendly CTAs.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span className="eyebrow eyebrow-on-dark">Key Driver 03</span>
                  <h3 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                    Future-Proof Extensibility
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-on-dark-muted)' }}>
                    Cleanly decoupled Next.js architecture ready for Headless CMS management, 1:1
                    Excel formula mapping, and Phase 2 CRM integration (HubSpot/Salesforce).
                  </p>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                }}
              >
                <strong style={{ color: 'var(--emerald-400)', display: 'block', marginBottom: '0.5rem' }}>
                  Unified Brand Positioning Across Robert’s Three Pillars:
                </strong>
                <p style={{ fontSize: '0.92rem', color: '#ffffff' }}>
                  <strong>1. Precision Mortgage Lending</strong> (Primary Lead Engine) &bull;{' '}
                  <strong>2. Financial Advisory</strong> (Treece Financial Group Partnership) &bull;{' '}
                  <strong>3. Corporate Recruiting</strong> (JSS Recruiting Executive Search)
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 1: PROTOTYPE SCOPE */}
          {activeSlide === 1 && (
            <div className="cards-grid-2">
              {[
                {
                  title: '1. Executive Hero & Interactive Video Briefing',
                  desc: 'Features trust badges, direct anchor CTAs, 3-pillar quick navigation, and an interactive video briefing player with clickable chapter markers.',
                },
                {
                  title: '2. Mortgage Services & Real-Time React Calculator',
                  desc: '4-step lending roadmap, 4 loan program cards, and a live PITI + PMI calculator with synchronized sliders, presets, and equity milestones.',
                },
                {
                  title: '3. Treece Financial Advisory & Compliance Block',
                  desc: 'Positions mortgage debt alongside long-term investment strategy with a dedicated regulatory disclosure container ready for final compliance text.',
                },
                {
                  title: '4. JSS Recruiting Dual-Track Funnel',
                  desc: 'Separate, tailored conversion cards for Hiring Organizations seeking finance leadership and Executive Candidates exploring confidential moves.',
                },
                {
                  title: '5. Scenario-to-Lead Handoff & Calendly Hub',
                  desc: 'Visitors click "Lock In This Scenario" in the calculator to auto-attach their exact loan numbers to the native contact form alongside Calendly.',
                },
                {
                  title: '6. Hyperscaler SEO JSON-LD Schema',
                  desc: 'Pre-configured @graph schema defining FinancialService, Person (Robert Wroblewski), WebSite, and FAQPage entities in the SSR document head.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.35rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff' }}>{item.title}</h3>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.55rem',
                        borderRadius: '5px',
                        backgroundColor: 'var(--emerald-600)',
                        color: '#ffffff',
                      }}
                    >
                      Live in Prototype
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-on-dark-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 2: TECH STACK & DNS */}
          {activeSlide === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="cards-grid-2">
                <div
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: '#f87171',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Legacy Monolithic WordPress
                  </span>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      fontSize: '0.9rem',
                      color: 'var(--text-on-dark-muted)',
                    }}
                  >
                    <li>✕ Slow mobile load times due to heavy theme &amp; plugin scripts</li>
                    <li>✕ Generic calculator plugins that cannot run custom Excel logic</li>
                    <li>✕ Ongoing plugin vulnerabilities and database maintenance</li>
                    <li>✕ Clunky multi-page reloads that drop mobile conversion rates</li>
                  </ul>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '2px solid var(--emerald-500)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: 'var(--emerald-400)',
                      display: 'block',
                      marginBottom: '0.5rem',
                    }}
                  >
                    New Decoupled Next.js SSR + Vercel Edge Stack
                  </span>
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                      fontSize: '0.9rem',
                      color: '#ffffff',
                    }}
                  >
                    <li>✓ Instant global edge delivery via Vercel with SSR SEO</li>
                    <li>✓ Native React calculator with 0ms slider response time</li>
                    <li>✓ Headless CMS ready (manage content without touching code)</li>
                    <li>✓ Clean API layer ready for Phase 2 CRM webhooks</li>
                  </ul>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--navy-800)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.35rem',
                }}
              >
                <strong style={{ color: 'var(--emerald-400)', display: 'block', marginBottom: '0.35rem' }}>
                  GoDaddy DNS &amp; Microsoft 365 Email Guarantee:
                </strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-on-dark-muted)' }}>
                  During production launch (Epic 7), only the web traffic records (<code>@</code> A
                  record and <code>www</code> CNAME) are pointed to Vercel. All existing GoDaddy{' '}
                  <strong>MX, SPF, DKIM, and Microsoft 365 email routing records remain 100% untouched</strong>.
                </p>
              </div>
            </div>
          )}

          {/* SLIDE 3: CALCULATOR STRATEGY */}
          {activeSlide === 3 && (
            <div className="cards-grid-2">
              <div
                style={{
                  backgroundColor: 'var(--navy-800)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                }}
              >
                <span className="eyebrow eyebrow-on-dark">Phase A • Live Today</span>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.65rem' }}>
                  Interactive UI Flow &amp; Standard PITI Engine
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-on-dark-muted)',
                    marginBottom: '1rem',
                  }}
                >
                  Allows Robert to test and approve the exact customer experience on desktop and
                  mobile immediately:
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                  }}
                >
                  <li>✓ Synchronized Home Price, Down Payment ($ / %), Rate &amp; Term</li>
                  <li>✓ Conventional, FHA, VA ($0 PMI), and Jumbo rules</li>
                  <li>✓ Stacked visual PITI breakdown + Equity Amortization table</li>
                  <li>✓ 1-Click Scenario attachment to Robert’s lead capture form</li>
                </ul>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--navy-800)',
                  border: '1px solid var(--emerald-500)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                }}
              >
                <span className="eyebrow eyebrow-on-dark">Phase B • Epic 5 (Next Sprint)</span>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.65rem' }}>
                  1:1 Drop-In Mapping of Robert’s Excel Workbook
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-on-dark-muted)',
                    marginBottom: '1rem',
                  }}
                >
                  Because calculation math is isolated in <code>src/lib/calculator-engine.ts</code>,
                  swapping in Robert’s exact spreadsheet formulas requires zero UI rework:
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.88rem',
                  }}
                >
                  <li>✓ Direct audit of Robert’s `.xlsx` inputs, lookup tables &amp; formulas</li>
                  <li>✓ Cent-for-cent automated test verification against sample scenarios</li>
                  <li>
                    ✓ <em>Scope Caveat:</em> Standard math formulas are included in the $1,775 base
                    scope; complex VBA macros or paid external APIs are evaluated upon workbook audit
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* SLIDE 4: DECISION POINTS */}
          {activeSlide === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                {
                  key: 'excel',
                  title: '1. Handoff & Technical Audit of Robert’s Excel Workbook',
                  owner: 'Owner: Robert → Hemant',
                  detail:
                    'Provide the current mortgage calculator Excel file so Hemant can map every formula and verify standard math scope.',
                },
                {
                  key: 'cms',
                  title: '2. Finalize Headless CMS Choice (Sanity.io vs. Headless WordPress)',
                  owner: 'Joint Decision',
                  detail:
                    'Sanity.io offers the cleanest modern editing studio and $0/mo free tier; Headless WordPress is available if a familiar WP admin screen is preferred.',
                },
                {
                  key: 'compliance',
                  title: '3. Provide Final NMLS, State & Treece Financial Group Disclosures',
                  owner: 'Owner: Robert',
                  detail:
                    'Supply exact NMLS IDs, state licensing disclaimers, and broker affiliation text to populate the pre-built compliance slots.',
                },
                {
                  key: 'assets',
                  title: '4. Deliver Vector Brand Logos (SVG/EPS), Intro Video & Live Calendly URL',
                  owner: 'Owner: Robert',
                  detail:
                    'Provide high-resolution logo files, video embed URL, and active Calendly scheduling link.',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => toggleCheck(item.key)}
                  style={{
                    backgroundColor: checkedItems[item.key]
                      ? 'rgba(16, 185, 129, 0.12)'
                      : 'var(--navy-800)',
                    border: checkedItems[item.key]
                      ? '1px solid var(--emerald-500)'
                      : '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.15rem 1.35rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(checkedItems[item.key])}
                    onChange={() => {}}
                    style={{ marginTop: '0.25rem', width: '18px', height: '18px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '0.3rem',
                      }}
                    >
                      <strong style={{ fontSize: '1rem', color: '#ffffff' }}>{item.title}</strong>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--emerald-400)',
                        }}
                      >
                        {item.owner}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-on-dark-muted)' }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SLIDE 5: TIME & EFFORT TO PRODUCTION + CLIENT INFRASTRUCTURE COSTS */}
          {activeSlide === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {/* 3-Week Production Engineering Effort */}
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.85rem' }}>
                  Part A: Time &amp; Engineering Effort to Full Production (~2.5 to 3.5 Weeks / 38–45 Hrs)
                </h3>
                <div className="cards-grid-3">
                  <div
                    style={{
                      backgroundColor: 'var(--navy-800)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                    }}
                  >
                    <span className="eyebrow eyebrow-on-dark">Week 1 • 12–15 Hrs (Epic 5)</span>
                    <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                      1:1 Excel Calculator Engineering
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)' }}>
                      Audit Robert’s Excel workbook, translate exact formulas &amp; lookup tables into
                      TypeScript, and verify cent-for-cent parity against 10 spreadsheet test rows.
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--navy-800)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                    }}
                  >
                    <span className="eyebrow eyebrow-on-dark">Week 2 • 14–16 Hrs (Epic 2 &amp; 4)</span>
                    <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                      Headless CMS, Resend Email &amp; Assets
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)' }}>
                      Configure Sanity.io CMS Studio, wire Resend transactional lead notifications,
                      embed final vector logos/video/Calendly URL, and insert NMLS compliance text.
                    </p>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--navy-800)',
                      border: '1px solid var(--border-dark)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                    }}
                  >
                    <span className="eyebrow eyebrow-on-dark">Week 3 • 10–14 Hrs (Epic 6 &amp; 7)</span>
                    <h4 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                      SEO, Analytics &amp; GoDaddy DNS Launch
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)' }}>
                      Connect GA4 &amp; Google Search Console, run Lighthouse mobile audits, point
                      GoDaddy web DNS to Vercel (preserving M365 email), and host 90-min training.
                    </p>
                  </div>
                </div>
              </div>

              {/* Client-Side One-Time & Recurring SaaS Expenses */}
              <div
                style={{
                  backgroundColor: 'var(--navy-800)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.35rem',
                  overflowX: 'auto',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                  }}
                >
                  <h3 style={{ fontSize: '1.1rem', color: '#ffffff' }}>
                    Part B: Client-Side Hosting, Email &amp; SaaS Subscription Breakdown
                  </h3>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      padding: '0.3rem 0.75rem',
                      borderRadius: '6px',
                      backgroundColor: 'rgba(16, 185, 129, 0.16)',
                      color: 'var(--emerald-400)',
                    }}
                  >
                    Lean Launch Total: $0/mo New Overhead • Pro Tier: ~$10–$32/mo
                  </span>
                </div>

                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.14)',
                        color: 'var(--text-on-dark-muted)',
                      }}
                    >
                      <th style={{ padding: '0.6rem 0.5rem' }}>Service / Layer</th>
                      <th style={{ padding: '0.6rem 0.5rem' }}>Recommended Provider</th>
                      <th style={{ padding: '0.6rem 0.5rem' }}>Lean Tier (Launch Ready)</th>
                      <th style={{ padding: '0.6rem 0.5rem' }}>Pro / Growth Tier (Optional)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        service: 'Frontend Edge Hosting',
                        provider: 'Vercel',
                        lean: '$0 / mo (Starter)',
                        pro: '$20 / mo (Vercel Pro)',
                      },
                      {
                        service: 'Headless CMS',
                        provider: 'Sanity.io (or Headless WP)',
                        lean: '$0 / mo (Free: 3 users, 100k API reqs/mo)',
                        pro: '$15 / mo (only if using managed WP host)',
                      },
                      {
                        service: 'Lead Form Email Service',
                        provider: 'Resend (Transactional Email API)',
                        lean: '$0 / mo (Free: 3,000 emails/mo)',
                        pro: '$20 / mo (50,000+ emails/mo)',
                      },
                      {
                        service: 'Domain & Business Email',
                        provider: 'GoDaddy + Microsoft 365 (Existing)',
                        lean: 'Existing (No new cost)',
                        pro: 'Existing M365 (~$6–$12/mo)',
                      },
                      {
                        service: 'Calendar Booking',
                        provider: 'Calendly',
                        lean: '$0 / mo (Basic: 1 event type)',
                        pro: '$10–$12 / mo (Multi-pillar event types)',
                      },
                      {
                        service: 'SEO, Analytics & Phase 2 CRM',
                        provider: 'Google GA4 + HubSpot CRM',
                        lean: '$0 / mo (GA4 + HubSpot Free CRM)',
                        pro: '$15–$20 / mo (HubSpot Starter in Phase 2)',
                      },
                    ].map((row) => (
                      <tr
                        key={row.service}
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                      >
                        <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600, color: '#ffffff' }}>
                          {row.service}
                        </td>
                        <td style={{ padding: '0.6rem 0.5rem', color: 'var(--text-on-dark-muted)' }}>
                          {row.provider}
                        </td>
                        <td
                          style={{
                            padding: '0.6rem 0.5rem',
                            fontWeight: 700,
                            color: 'var(--emerald-400)',
                          }}
                        >
                          {row.lean}
                        </td>
                        <td style={{ padding: '0.6rem 0.5rem', color: 'var(--text-on-dark-muted)' }}>
                          {row.pro}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SLIDE 6: SLA & MILESTONES */}
          {activeSlide === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div className="cards-grid-4">
                {[
                  {
                    step: 'Milestone 1 (40%)',
                    amount: '$710.00',
                    label: 'Kickoff & Discovery',
                    desc: 'Contract execution, architecture setup & initial asset handoff.',
                    active: false,
                  },
                  {
                    step: 'Milestone 2 (25%) • Current',
                    amount: '$443.75',
                    label: 'Prototype & UX Sign-Off',
                    desc: 'Approval of single-page layout, Vercel speed & interactive calculator flow.',
                    active: true,
                  },
                  {
                    step: 'Milestone 3 (25%)',
                    amount: '$443.75',
                    label: 'Excel & CMS Integration',
                    desc: '1:1 Excel calculator parity, CMS wiring & pre-launch functional QA.',
                    active: false,
                  },
                  {
                    step: 'Milestone 4 (10%)',
                    amount: '$177.50',
                    label: 'Production Launch',
                    desc: 'GoDaddy DNS cutover to Vercel, live verification & 90-min training.',
                    active: false,
                  },
                ].map((m) => (
                  <div
                    key={m.step}
                    style={{
                      backgroundColor: 'var(--navy-800)',
                      border: m.active
                        ? '2px solid var(--emerald-500)'
                        : '1px solid var(--border-dark)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.73rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        color: m.active ? 'var(--emerald-400)' : 'var(--text-on-dark-muted)',
                      }}
                    >
                      {m.step}
                    </span>
                    <div
                      className="tabular-nums"
                      style={{
                        fontSize: '1.6rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: '0.35rem 0',
                      }}
                    >
                      {m.amount}
                    </div>
                    <strong style={{ fontSize: '0.92rem', color: '#ffffff', display: 'block' }}>
                      {m.label}
                    </strong>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-on-dark-muted)',
                        marginTop: '0.35rem',
                      }}
                    >
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="cards-grid-3">
                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                  }}
                >
                  <strong style={{ color: 'var(--emerald-400)', display: 'block', marginBottom: '0.3rem' }}>
                    100% Client Ownership
                  </strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)' }}>
                    Robert retains 100% ownership of the domain, source code repository, and brand
                    assets upon final payment.
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                  }}
                >
                  <strong style={{ color: 'var(--emerald-400)', display: 'block', marginBottom: '0.3rem' }}>
                    Structured Revisions
                  </strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)' }}>
                    Includes 2 design revision rounds and 1 pre-launch functional QA review.
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.25rem',
                  }}
                >
                  <strong style={{ color: 'var(--emerald-400)', display: 'block', marginBottom: '0.3rem' }}>
                    90-Day Post-Launch SLA
                  </strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-on-dark-muted)' }}>
                    90 days of post-launch bug support with a 48-hour response SLA for critical
                    issues.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 7: NEXT STEPS */}
          {activeSlide === 7 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              <div className="cards-grid-3">
                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span className="eyebrow eyebrow-on-dark">Action 01 • Today</span>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.45rem' }}>
                    Sign Off on Prototype Flow
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-on-dark-muted)' }}>
                    Approve the single-page section order, Navy/Emerald visual direction, and
                    interactive calculator UX on Vercel.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span className="eyebrow eyebrow-on-dark">Action 02 • This Week</span>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.45rem' }}>
                    Deliver Excel &amp; Compliance Assets
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-on-dark-muted)' }}>
                    Send the mortgage Excel workbook, vector logos, Calendly URL, and NMLS/Treece
                    disclosure text.
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: 'var(--navy-800)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                  }}
                >
                  <span className="eyebrow eyebrow-on-dark">Action 03 • 3-Week Sprint</span>
                  <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.45rem' }}>
                    Execute Epic 4, 5, 6 &amp; 7 Build
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-on-dark-muted)' }}>
                    Integrate 1:1 Excel formulas, connect Sanity CMS + Resend + GA4, and execute
                    GoDaddy DNS cutover.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="btn btn-primary">
                  Open Live Interactive Prototype →
                </Link>
                <Link href="/#calculator" className="btn btn-secondary-dark">
                  Jump Directly to Mortgage Calculator →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
