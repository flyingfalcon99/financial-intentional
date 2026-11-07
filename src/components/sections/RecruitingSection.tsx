'use client';

import React from 'react';
import { SITE_CONTENT } from '@/lib/site-content';

interface RecruitingSectionProps {
  onSelectTopic?: (topic: string) => void;
}

export function RecruitingSection({ onSelectTopic }: RecruitingSectionProps) {
  const handleTrackClick = (inquiryTopic: string) => {
    if (onSelectTopic) {
      onSelectTopic(inquiryTopic);
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="recruiting"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-warm-slate)' }}
      aria-labelledby="recruiting-section-heading"
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
          <div style={{ maxWidth: '740px' }}>
            <span className="eyebrow">{SITE_CONTENT.recruiting.eyebrow}</span>
            <h2 className="section-title" id="recruiting-section-heading">
              {SITE_CONTENT.recruiting.headline}
            </h2>
            <p className="section-subtitle">{SITE_CONTENT.recruiting.subheadline}</p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--surface-white)',
              border: '1px solid var(--border-strong)',
              borderRadius: 'var(--radius-md)',
              padding: '0.9rem 1.25rem',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--emerald-600)',
                display: 'block',
              }}
            >
              Executive Search Division
            </span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--navy-900)' }}>
              {SITE_CONTENT.recruiting.partnerName}
            </strong>
          </div>
        </div>

        <div className="cards-grid-2">
          {SITE_CONTENT.recruiting.tracks.map((track) => (
            <div
              key={track.id}
              className="surface-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1.5rem',
              }}
            >
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '0.73rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.28rem 0.65rem',
                    borderRadius: '6px',
                    backgroundColor:
                      track.id === 'employers' ? 'var(--navy-900)' : 'var(--emerald-50)',
                    color:
                      track.id === 'employers' ? '#ffffff' : 'var(--emerald-700)',
                    marginBottom: '0.9rem',
                  }}
                >
                  {track.badge}
                </span>

                <h3
                  style={{
                    fontSize: '1.38rem',
                    fontWeight: 700,
                    color: 'var(--navy-900)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {track.title}
                </h3>
                <p
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--emerald-700)',
                    marginBottom: '0.85rem',
                  }}
                >
                  {track.subtitle}
                </p>
                <p
                  style={{
                    fontSize: '0.94rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {track.description}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                  }}
                >
                  {track.bulletPoints.map((point) => (
                    <li
                      key={point}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.6rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <span style={{ color: 'var(--emerald-600)', fontWeight: 700 }}>✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                id={`recruiting-cta-${track.id}`}
                className={
                  track.id === 'employers' ? 'btn btn-primary' : 'btn btn-outline-navy'
                }
                style={{ width: '100%' }}
                onClick={() => handleTrackClick(track.inquiryTopic)}
              >
                <span>{track.ctaText}</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
