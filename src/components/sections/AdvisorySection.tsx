'use client';

import React from 'react';
import { SITE_CONTENT } from '@/lib/site-content';

interface AdvisorySectionProps {
  onSelectTopic?: (topic: string) => void;
}

export function AdvisorySection({ onSelectTopic }: AdvisorySectionProps) {
  const handleAdvisoryInquiry = () => {
    if (onSelectTopic) {
      onSelectTopic('Financial Advisory — Treece Financial Group Consultation');
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="advisory"
      className="section-pad"
      style={{
        backgroundColor: 'var(--navy-900)',
        color: 'var(--text-on-dark)',
        borderTop: '1px solid var(--border-dark)',
        borderBottom: '1px solid var(--border-dark)',
      }}
      aria-labelledby="advisory-section-heading"
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          <div style={{ maxWidth: '720px' }}>
            <span className="eyebrow eyebrow-on-dark">{SITE_CONTENT.advisory.eyebrow}</span>
            <h2 className="section-title" id="advisory-section-heading" style={{ color: '#ffffff' }}>
              {SITE_CONTENT.advisory.headline}
            </h2>
            <p className="section-subtitle" style={{ color: 'var(--text-on-dark-muted)' }}>
              {SITE_CONTENT.advisory.subheadline}
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.35)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.25rem',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--emerald-400)',
                display: 'block',
              }}
            >
              Affiliated Advisory Partner
            </span>
            <strong style={{ fontSize: '1.15rem', color: '#ffffff' }}>
              {SITE_CONTENT.advisory.partnerName}
            </strong>
          </div>
        </div>

        {/* 3 Advisory Pillars */}
        <div className="cards-grid-3" style={{ marginBottom: '2.75rem' }}>
          {SITE_CONTENT.advisory.pillars.map((pillar) => (
            <div
              key={pillar.title}
              style={{
                backgroundColor: 'var(--navy-800)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.25rem',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: 'var(--emerald-400)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'block',
                    marginBottom: '0.35rem',
                  }}
                >
                  {pillar.subtitle}
                </span>
                <h3 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.65rem' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-on-dark-muted)', marginBottom: '1.15rem' }}>
                  {pillar.description}
                </p>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                {pillar.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    style={{
                      fontSize: '0.85rem',
                      color: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                    }}
                  >
                    <span style={{ color: 'var(--emerald-400)', fontWeight: 700 }}>•</span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compliance & Licensing Disclosure Block (Required by Spec Section 3 & 6) */}
        <div
          style={{
            backgroundColor: 'rgba(7, 17, 32, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
          }}
        >
          <div style={{ flex: '1 1 540px' }}>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
                color: 'var(--emerald-400)',
                marginBottom: '0.35rem',
              }}
            >
              {SITE_CONTENT.advisory.disclosureTitle}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-on-dark-muted)', lineHeight: 1.55 }}>
              {SITE_CONTENT.advisory.disclosureBody}
            </p>
          </div>

          <button
            type="button"
            id="advisory-schedule-cta"
            className="btn btn-primary"
            onClick={handleAdvisoryInquiry}
          >
            Schedule a Wealth Alignment Review →
          </button>
        </div>
      </div>
    </section>
  );
}
