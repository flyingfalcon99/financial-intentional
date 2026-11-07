'use client';

import React, { useState } from 'react';
import { SITE_CONTENT } from '@/lib/site-content';

export function HeroSection() {
  const [isPlayingBriefing, setIsPlayingBriefing] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const chapterNotes = [
    {
      heading: 'Chapter 1: Why "Intentional" Financing Matters',
      transcript:
        '“Most mortgage calculators only show Principal & Interest in a vacuum. At Financial Intentional, we structure your home loan around your actual liquidity target, tax bracket, and 5-to-10-year family horizon.”',
    },
    {
      heading: 'Chapter 2: Integrating Mortgage Debt with Wealth Advisory',
      transcript:
        '“In partnership with Treece Financial Group, we evaluate whether extra principal payments or strategic market investments create stronger risk-adjusted net worth for your household.”',
    },
    {
      heading: 'Chapter 3: How Our Custom Scenario Calculator Works',
      transcript:
        '“Use the interactive sliders below to test down payments, terms, and rates in real time—then send your exact scenario to my desk with one click for a verified underwriting review.”',
    },
  ];

  return (
    <section className="hero-section" aria-labelledby="hero-main-heading">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Core Brand Value Proposition & Direct CTAs */}
          <div>
            <span className="eyebrow eyebrow-on-dark">{SITE_CONTENT.hero.eyebrow}</span>
            <h1 className="hero-headline" id="hero-main-heading">
              {SITE_CONTENT.hero.headline}
            </h1>
            <p className="hero-subheadline">{SITE_CONTENT.hero.subheadline}</p>

            <div className="hero-cta-row">
              <a
                href={SITE_CONTENT.hero.primaryCta.href}
                className="btn btn-primary"
                id="hero-primary-cta"
              >
                <span>{SITE_CONTENT.hero.primaryCta.label}</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={SITE_CONTENT.hero.secondaryCta.href}
                className="btn btn-secondary-dark"
                id="hero-secondary-cta"
              >
                <span>{SITE_CONTENT.hero.secondaryCta.label}</span>
              </a>
            </div>

            {/* 3 Service Pillars Quick Jump Strip */}
            <div className="pillar-quick-strip" role="list" aria-label="Service Pillars">
              <a href="#mortgage" className="pillar-chip" role="listitem" id="hero-pillar-mortgage">
                <span className="pillar-chip-num">Pillar 01 • Primary Focus</span>
                <span className="pillar-chip-title">Mortgage Strategy & Loans →</span>
              </a>
              <a href="#advisory" className="pillar-chip" role="listitem" id="hero-pillar-advisory">
                <span className="pillar-chip-num">Pillar 02 • Treece Financial</span>
                <span className="pillar-chip-title">Holistic Wealth Advisory →</span>
              </a>
              <a
                href="#recruiting"
                className="pillar-chip"
                role="listitem"
                id="hero-pillar-recruiting"
              >
                <span className="pillar-chip-num">Pillar 03 • JSS Recruiting</span>
                <span className="pillar-chip-title">Executive Talent Search →</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Executive Video Briefing Embed */}
          <div className="video-briefing-card" id="hero-video-card">
            <div className="video-Stage">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/robert-video-briefing.jpg"
                alt="Robert Wroblewski — Founder of FinancialIntentional.com speaking in executive office"
                className="video-thumb-img"
              />
              <div className="video-overlay">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span className="video-badge-top">
                    {SITE_CONTENT.hero.videoBriefing.duration}
                  </span>
                  {isPlayingBriefing && (
                    <button
                      type="button"
                      onClick={() => setIsPlayingBriefing(false)}
                      style={{
                        background: 'rgba(7, 17, 32, 0.85)',
                        color: '#ffffff',
                        border: '1px solid rgba(255,255,255,0.25)',
                        borderRadius: '6px',
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      Close Preview
                    </button>
                  )}
                </div>

                {!isPlayingBriefing ? (
                  <button
                    type="button"
                    className="video-play-trigger"
                    id="hero-video-play-btn"
                    onClick={() => setIsPlayingBriefing(true)}
                    aria-label="Play Robert Wroblewski Executive Video Briefing"
                  >
                    <span className="play-circle" aria-hidden="true">
                      ▶
                    </span>
                    <span>
                      <strong style={{ display: 'block', fontSize: '1.02rem' }}>
                        {SITE_CONTENT.hero.videoBriefing.title}
                      </strong>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-on-dark-muted)',
                        }}
                      >
                        Click to preview {SITE_CONTENT.hero.videoBriefing.speaker}’s approach
                      </span>
                    </span>
                  </button>
                ) : (
                  <div
                    style={{
                      background: 'rgba(7, 17, 32, 0.94)',
                      border: '1px solid rgba(16, 185, 129, 0.45)',
                      borderRadius: '10px',
                      padding: '1rem',
                    }}
                    role="region"
                    aria-live="polite"
                  >
                    <div
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--emerald-400)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        marginBottom: '0.35rem',
                      }}
                    >
                      Now Previewing • {chapterNotes[activeChapterIndex].heading}
                    </div>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: '#ffffff',
                        lineHeight: 1.5,
                      }}
                    >
                      {chapterNotes[activeChapterIndex].transcript}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="video-chapters">
              <div
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-on-dark-muted)',
                  marginBottom: '0.45rem',
                  padding: '0 0.65rem',
                }}
              >
                Executive Briefing Chapters (Click to Jump)
              </div>
              {SITE_CONTENT.hero.videoBriefing.chapters.map((chapter, idx) => (
                <button
                  key={chapter.time}
                  type="button"
                  id={`video-chapter-btn-${idx}`}
                  className={`chapter-row ${
                    isPlayingBriefing && activeChapterIndex === idx ? 'active' : ''
                  }`}
                  onClick={() => {
                    setActiveChapterIndex(idx);
                    setIsPlayingBriefing(true);
                  }}
                >
                  <span>{chapter.label}</span>
                  <span className="chapter-time">{chapter.time}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges & SLA / Value Indicators */}
        <div className="trust-metrics-grid" aria-label="Key Trust Metrics">
          {SITE_CONTENT.hero.trustMetrics.map((metric) => (
            <div key={metric.label} className="trust-metric-card">
              <div className="trust-metric-value tabular-nums">{metric.value}</div>
              <div className="trust-metric-label">{metric.label}</div>
              <div className="trust-metric-detail">{metric.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
