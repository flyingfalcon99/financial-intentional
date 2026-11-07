'use client';

import React from 'react';
import { SITE_CONTENT } from '@/lib/site-content';

export function Footer() {
  return (
    <>
      <footer
        style={{
          backgroundColor: 'var(--navy-950)',
          color: 'var(--text-on-dark-muted)',
          padding: '4rem 0 2.5rem',
          borderTop: '1px solid var(--border-dark)',
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2.25rem',
              paddingBottom: '2.5rem',
              borderBottom: '1px solid var(--border-dark)',
            }}
          >
            {/* Brand Column */}
            <div>
              <div className="brand-lockup" style={{ marginBottom: '0.85rem' }}>
                <span className="brand-monogram" aria-hidden="true">
                  FI
                </span>
                <span>
                  <span className="brand-text-primary">{SITE_CONTENT.brand.name}</span>
                  <span className="brand-text-sub">{SITE_CONTENT.brand.founder}</span>
                </span>
              </div>
              <p style={{ fontSize: '0.86rem', lineHeight: 1.6, marginBottom: '0.85rem' }}>
                Personal brand hub of {SITE_CONTENT.brand.founder}. Aligning residential mortgage
                strategy, holistic wealth advisory, and executive recruiting.
              </p>
              <div style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: 600 }}>
                {SITE_CONTENT.brand.nmlsId} • Equal Housing Opportunity
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <h4
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--emerald-400)',
                  marginBottom: '0.85rem',
                }}
              >
                Single-Page Navigation
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.88rem',
                }}
              >
                {SITE_CONTENT.navigation.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="nav-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Three Pillars Affiliations */}
            <div>
              <h4
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--emerald-400)',
                  marginBottom: '0.85rem',
                }}
              >
                Core Service Pillars
              </h4>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.55rem',
                  fontSize: '0.85rem',
                }}
              >
                <li>
                  <strong style={{ color: '#ffffff' }}>Mortgage Origination:</strong> Purchase,
                  Jumbo, VA/FHA & Strategic Refinance
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Financial Advisory:</strong> Affiliated with
                  Treece Financial Group
                </li>
                <li>
                  <strong style={{ color: '#ffffff' }}>Corporate Recruiting:</strong> Executive
                  Finance & Accounting via JSS Recruiting
                </li>
              </ul>
            </div>
          </div>

          {/* Regulatory & Infrastructure Footnote */}
          <div
            style={{
              paddingTop: '1.75rem',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            <p>
              <strong>Regulatory & Compliance Notice:</strong> All mortgage calculations displayed
              on FinancialIntentional.com are estimates for educational and planning purposes only
              and do not constitute a Loan Estimate (LE) or commitment to lend. Interest rates,
              property taxes, insurance, and PMI vary based on credit profile, property type, and
              underwriting approval. Final NMLS, state licensing, and Treece Financial Group
              regulatory disclosures will be populated prior to production launch.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: '1rem',
                color: '#94a3b8',
              }}
            >
              <span>
                © 2026 {SITE_CONTENT.brand.name} ({SITE_CONTENT.brand.founder}
                ). 100% Client-Owned Architecture.
              </span>
              <span>
                Engineered on Next.js SSR + Vercel Edge • GoDaddy DNS / Microsoft 365 Protected
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Thumb-Friendly Conversion Bar */}
      <div className="mobile-sticky-bar" role="navigation" aria-label="Mobile Quick Actions">
        <a
          href="#calculator"
          className="btn btn-secondary-dark"
          id="mobile-sticky-calc-btn"
          style={{ minHeight: '44px', padding: '0.5rem', fontSize: '0.84rem' }}
        >
          Calculate Payment
        </a>
        <a
          href="#contact"
          className="btn btn-primary"
          id="mobile-sticky-book-btn"
          style={{ minHeight: '44px', padding: '0.5rem', fontSize: '0.84rem' }}
        >
          Book Strategy Call
        </a>
      </div>
    </>
  );
}
