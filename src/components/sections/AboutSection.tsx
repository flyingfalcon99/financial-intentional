'use client';

import React from 'react';
import { SITE_CONTENT } from '@/lib/site-content';

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-pad"
      style={{ backgroundColor: 'var(--surface-white)' }}
      aria-labelledby="about-section-heading"
    >
      <div className="container">
        <div className="hero-grid" style={{ alignItems: 'start' }}>
          {/* Left Column: Narrative & Philosophy */}
          <div>
            <span className="eyebrow">{SITE_CONTENT.about.eyebrow}</span>
            <h2 className="section-title" id="about-section-heading">
              {SITE_CONTENT.about.headline}
            </h2>

            <blockquote
              style={{
                fontFamily: 'var(--font-display), serif',
                fontSize: '1.22rem',
                fontStyle: 'italic',
                color: 'var(--navy-900)',
                borderLeft: '4px solid var(--emerald-600)',
                paddingLeft: '1.15rem',
                margin: '1.5rem 0',
                lineHeight: 1.5,
              }}
            >
              {SITE_CONTENT.about.leadQuote}
            </blockquote>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {SITE_CONTENT.about.bioParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Executive Credentials & Affiliations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div
              style={{
                backgroundColor: 'var(--navy-950)',
                color: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: 'var(--emerald-400)',
                  display: 'block',
                  marginBottom: '0.4rem',
                }}
              >
                Executive Profile & Affiliations
              </span>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                {SITE_CONTENT.brand.founder}
              </h3>
              <p
                style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-on-dark-muted)',
                  marginBottom: '1.5rem',
                }}
              >
                {SITE_CONTENT.brand.title}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {SITE_CONTENT.about.credentials.map((cred) => (
                  <div
                    key={cred.category}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '1rem 1.15rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.07em',
                        color: 'var(--emerald-400)',
                        display: 'block',
                      }}
                    >
                      {cred.category}
                    </span>
                    <strong
                      style={{
                        fontSize: '1rem',
                        color: '#ffffff',
                        display: 'block',
                        margin: '0.15rem 0',
                      }}
                    >
                      {cred.title}
                    </strong>
                    <span style={{ fontSize: '0.83rem', color: 'var(--text-on-dark-muted)' }}>
                      {cred.org}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
