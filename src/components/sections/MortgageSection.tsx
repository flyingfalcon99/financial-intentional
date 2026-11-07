'use client';

import React from 'react';
import { SITE_CONTENT } from '@/lib/site-content';
import {
  MortgageCalculator,
  SelectedScenarioHandoff,
} from '@/components/calculator/MortgageCalculator';

interface MortgageSectionProps {
  onLockScenario?: (scenario: SelectedScenarioHandoff) => void;
}

export function MortgageSection({ onLockScenario }: MortgageSectionProps) {
  return (
    <section
      id="mortgage"
      className="section-pad"
      style={{ backgroundColor: 'var(--bg-ivory)' }}
      aria-labelledby="mortgage-section-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="eyebrow">{SITE_CONTENT.mortgage.eyebrow}</span>
          <h2 className="section-title" id="mortgage-section-heading">
            {SITE_CONTENT.mortgage.headline}
          </h2>
          <p className="section-subtitle">{SITE_CONTENT.mortgage.subheadline}</p>
        </div>

        {/* 4-Step Intentional Lending Roadmap */}
        <div className="cards-grid-4" style={{ marginBottom: '3.5rem' }}>
          {SITE_CONTENT.mortgage.processSteps.map((step) => (
            <div key={step.stepNumber} className="surface-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.85rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display), serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--emerald-600)',
                  }}
                >
                  {step.stepNumber}
                </span>
                <span
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '5px',
                    backgroundColor: 'var(--emerald-50)',
                    color: 'var(--emerald-700)',
                  }}
                >
                  {step.duration}
                </span>
              </div>
              <h3
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  color: 'var(--navy-900)',
                }}
              >
                {step.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Mortgage Calculator */}
        <div style={{ marginBottom: '4rem' }}>
          <MortgageCalculator onLockScenario={onLockScenario} />
        </div>

        {/* Core Loan Programs Grid */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <div>
              <span className="eyebrow">TAILORED LOAN ARCHITECTURE</span>
              <h3 style={{ fontSize: '1.65rem', fontWeight: 700 }}>
                Loan Programs Structured Around Your Financial Reality
              </h3>
            </div>
            <a href="#contact" className="btn btn-outline-navy" id="mortgage-custom-quote-cta">
              Request Custom Rate & Fee Worksheet →
            </a>
          </div>

          <div className="cards-grid-2">
            {SITE_CONTENT.mortgage.loanPrograms.map((program) => (
              <div key={program.id} className="surface-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '0.65rem',
                  }}
                >
                  <h4 style={{ fontSize: '1.22rem', fontWeight: 700, color: 'var(--navy-900)' }}>
                    {program.title}
                  </h4>
                  <span
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.65rem',
                      borderRadius: '6px',
                      backgroundColor: 'var(--navy-900)',
                      color: 'var(--emerald-400)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {program.badge}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    color: 'var(--emerald-700)',
                    marginBottom: '0.9rem',
                  }}
                >
                  Ideal For: {program.idealFor}
                </p>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {program.highlights.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.55rem',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <span style={{ color: 'var(--emerald-600)', fontWeight: 700 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
