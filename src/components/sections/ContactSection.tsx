'use client';

import React, { useEffect, useState } from 'react';
import { SITE_CONTENT } from '@/lib/site-content';
import { formatCurrency } from '@/lib/calculator-engine';
import { SelectedScenarioHandoff } from '@/components/calculator/MortgageCalculator';

interface ContactSectionProps {
  lockedScenario: SelectedScenarioHandoff | null;
  selectedTopic: string;
  onClearScenario: () => void;
}

export function ContactSection({
  lockedScenario,
  selectedTopic,
  onClearScenario,
}: ContactSectionProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryPillar, setInquiryPillar] = useState(
    'Mortgage Strategy & Custom Payment Review'
  );
  const [preferredTimeframe, setPreferredTimeframe] = useState(
    'Purchasing or Refinancing within 30–60 Days'
  );
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    ok: boolean;
    referenceId?: string;
    message?: string;
    error?: string;
  } | null>(null);

  // Interactive Calendly Scheduling Preview State
  const [activeConsultationId, setActiveConsultationId] = useState<string>('mortgage-15');
  const [selectedDay, setSelectedDay] = useState<string>('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM EST');
  const [calendlyBooked, setCalendlyBooked] = useState<boolean>(false);

  useEffect(() => {
    if (selectedTopic) {
      setInquiryPillar(selectedTopic);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (lockedScenario) {
      setInquiryPillar('Mortgage Strategy & Custom Payment Review');
    }
  }, [lockedScenario]);

  const activeConsultation =
    SITE_CONTENT.contact.consultationOptions.find((c) => c.id === activeConsultationId) ||
    SITE_CONTENT.contact.consultationOptions[0];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          inquiryPillar,
          preferredTimeframe,
          message,
          honeypot,
          calculatorScenario: lockedScenario
            ? {
                homePrice: lockedScenario.inputs.homePrice,
                downPaymentAmount: lockedScenario.inputs.downPaymentAmount,
                downPaymentPercent: lockedScenario.inputs.downPaymentPercent,
                interestRate: lockedScenario.inputs.interestRate,
                loanTermYears: lockedScenario.inputs.loanTermYears,
                totalMonthlyPayment: lockedScenario.outputs.totalMonthlyPayment,
                loanProgram: lockedScenario.inputs.loanProgram,
              }
            : null,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setSubmitResult({
          ok: false,
          error: data.error || 'Submission failed. Please check your details.',
        });
      } else {
        setSubmitResult({
          ok: true,
          referenceId: data.referenceId,
          message: data.message,
        });
      }
    } catch {
      setSubmitResult({
        ok: false,
        error: 'Network error while submitting. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const availableDays = ['Tomorrow', 'Thu, Nov 12', 'Fri, Nov 13', 'Mon, Nov 16'];
  const availableSlots = ['9:00 AM EST', '10:30 AM EST', '1:30 PM EST', '4:00 PM EST'];

  return (
    <section
      id="contact"
      className="section-pad"
      style={{
        backgroundColor: 'var(--bg-ivory)',
        borderTop: '1px solid var(--border-subtle)',
      }}
      aria-labelledby="contact-section-heading"
    >
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">{SITE_CONTENT.contact.eyebrow}</span>
          <h2 className="section-title" id="contact-section-heading">
            {SITE_CONTENT.contact.headline}
          </h2>
          <p className="section-subtitle">{SITE_CONTENT.contact.subheadline}</p>
        </div>

        <div className="cards-grid-2" style={{ alignItems: 'start' }}>
          {/* Left Column: Native Lead Capture Form with Attached Calculator Scenario */}
          <div className="surface-card" id="lead-capture-card">
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              Send Your Scenario or Inquiry Directly to Robert
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
              }}
            >
              Direct email notification with anti-spam protection • Phase 2 CRM-ready payload
            </p>

            {/* Attached Calculator Scenario Banner */}
            {lockedScenario && (
              <div
                id="attached-scenario-badge"
                style={{
                  backgroundColor: 'var(--emerald-50)',
                  border: '1px solid var(--emerald-500)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.9rem 1rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      color: 'var(--emerald-700)',
                      display: 'block',
                    }}
                  >
                    ✓ Attached Calculator Scenario
                  </span>
                  <strong
                    className="tabular-nums"
                    style={{ fontSize: '0.92rem', color: 'var(--navy-900)' }}
                  >
                    {formatCurrency(lockedScenario.outputs.totalMonthlyPayment)}/mo •{' '}
                    {formatCurrency(lockedScenario.inputs.homePrice)} Home ({lockedScenario.inputs.downPaymentPercent}% Down @{' '}
                    {lockedScenario.inputs.interestRate}% for {lockedScenario.inputs.loanTermYears} Yrs)
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={onClearScenario}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                >
                  Remove
                </button>
              </div>
            )}

            {submitResult?.ok ? (
              <div
                id="lead-submit-confirmation"
                style={{
                  backgroundColor: 'var(--navy-900)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.75rem',
                }}
                role="status"
                aria-live="polite"
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    backgroundColor: 'var(--emerald-600)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    marginBottom: '0.75rem',
                  }}
                >
                  Reference ID: {submitResult.referenceId}
                </span>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                  Thank You, {fullName}—Robert Has Your Details.
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-on-dark-muted)', marginBottom: '1.25rem' }}>
                  {submitResult.message} Expect a personal response within 1 business day.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary-dark"
                  onClick={() => setSubmitResult(null)}
                >
                  Submit Another Scenario
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Anti-spam Honeypot */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="cards-grid-2" style={{ gap: '1rem' }}>
                  <div>
                    <label
                      htmlFor="lead-full-name"
                      style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="lead-full-name"
                      type="text"
                      required
                      placeholder="e.g., Jordan Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-strong)',
                        backgroundColor: 'var(--bg-ivory)',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-email"
                      style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      placeholder="jordan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-strong)',
                        backgroundColor: 'var(--bg-ivory)',
                      }}
                    />
                  </div>
                </div>

                <div className="cards-grid-2" style={{ gap: '1rem' }}>
                  <div>
                    <label
                      htmlFor="lead-phone"
                      style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}
                    >
                      Mobile Phone
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      placeholder="(555) 234-5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-strong)',
                        backgroundColor: 'var(--bg-ivory)',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-pillar-select"
                      style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}
                    >
                      Primary Area of Focus
                    </label>
                    <select
                      id="lead-pillar-select"
                      value={inquiryPillar}
                      onChange={(e) => setInquiryPillar(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-strong)',
                        backgroundColor: 'var(--bg-ivory)',
                      }}
                    >
                      <option value="Mortgage Strategy & Custom Payment Review">
                        Mortgage Strategy & Custom Payment Review
                      </option>
                      <option value="Verified Mortgage Pre-Approval Letter">
                        Verified Mortgage Pre-Approval Letter
                      </option>
                      <option value="Refinance & Equity Optimization">
                        Refinance & Equity Optimization
                      </option>
                      <option value="Financial Advisory — Treece Financial Group Consultation">
                        Financial Advisory — Treece Financial Group Consultation
                      </option>
                      <option value="Corporate Recruiting — Employer Talent Search (JSS Recruiting)">
                        Corporate Recruiting — Employer Talent Search (JSS Recruiting)
                      </option>
                      <option value="Corporate Recruiting — Confidential Candidate Inquiry (JSS Recruiting)">
                        Corporate Recruiting — Confidential Candidate Inquiry (JSS Recruiting)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lead-timeframe"
                    style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}
                  >
                    Target Timeline
                  </label>
                  <select
                    id="lead-timeframe"
                    value={preferredTimeframe}
                    onChange={(e) => setPreferredTimeframe(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-ivory)',
                    }}
                  >
                    <option value="Immediate / Active Offer Within 30 Days">
                      Immediate / Active Offer Within 30 Days
                    </option>
                    <option value="Purchasing or Refinancing within 30–60 Days">
                      Purchasing or Refinancing within 30–60 Days
                    </option>
                    <option value="Planning 3–6 Months Ahead">
                      Planning 3–6 Months Ahead
                    </option>
                    <option value="Long-Term Wealth / Career Exploration">
                      Long-Term Wealth / Career Exploration
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="lead-message"
                    style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}
                  >
                    Questions or Context for Robert
                  </label>
                  <textarea
                    id="lead-message"
                    rows={3}
                    placeholder="Share property location, liquidity goals, or specific questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: 'var(--bg-ivory)',
                    }}
                  />
                </div>

                {submitResult?.error && (
                  <div
                    style={{
                      padding: '0.75rem',
                      borderRadius: '6px',
                      backgroundColor: '#fef2f2',
                      color: '#b91c1c',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {submitResult.error}
                  </div>
                )}

                <button
                  type="submit"
                  id="lead-submit-btn"
                  className="btn btn-primary"
                  disabled={submitting}
                  style={{ width: '100%' }}
                >
                  {submitting
                    ? 'Sending to Robert’s Desk...'
                    : 'Send My Scenario & Request Strategy Review →'}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Integrated Calendly Booking Interface */}
          <div
            className="surface-card"
            id="calendly-booking-card"
            style={{
              backgroundColor: 'var(--navy-950)',
              color: '#ffffff',
              border: '1px solid var(--border-dark)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <div>
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
                  Calendly Direct Integration
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ffffff' }}>
                  Book Instant Time on Robert’s Calendar
                </h3>
              </div>
            </div>

            {/* Session Type Tabs */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.55rem',
                marginBottom: '1.25rem',
              }}
              role="tablist"
              aria-label="Consultation Session Types"
            >
              {SITE_CONTENT.contact.consultationOptions.map((option) => {
                const isSelected = option.id === activeConsultationId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    id={`calendly-tab-${option.id}`}
                    onClick={() => {
                      setActiveConsultationId(option.id);
                      setCalendlyBooked(false);
                    }}
                    style={{
                      textAlign: 'left',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected
                        ? '1px solid var(--emerald-500)'
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      backgroundColor: isSelected
                        ? 'rgba(16, 185, 129, 0.14)'
                        : 'rgba(255, 255, 255, 0.04)',
                      color: '#ffffff',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <strong style={{ fontSize: '0.92rem' }}>{option.title}</strong>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: 'var(--emerald-400)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {option.duration}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-on-dark-muted)',
                        marginTop: '0.25rem',
                      }}
                    >
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Interactive Day & Time Slot Picker */}
            {!calendlyBooked ? (
              <div
                style={{
                  backgroundColor: 'var(--navy-900)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.15rem',
                }}
              >
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  1. Select a Day ({activeConsultation.pillar})
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '0.45rem',
                    marginBottom: '1rem',
                  }}
                >
                  {availableDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      style={{
                        padding: '0.45rem 0.35rem',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        border:
                          selectedDay === day
                            ? '1px solid var(--emerald-500)'
                            : '1px solid rgba(255,255,255,0.14)',
                        backgroundColor:
                          selectedDay === day
                            ? 'var(--emerald-600)'
                            : 'rgba(255,255,255,0.04)',
                        color: '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  2. Select a Time Window
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.45rem',
                    marginBottom: '1.15rem',
                  }}
                >
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        border:
                          selectedSlot === slot
                            ? '1px solid var(--emerald-400)'
                            : '1px solid rgba(255,255,255,0.14)',
                        backgroundColor:
                          selectedSlot === slot
                            ? 'rgba(16, 185, 129, 0.22)'
                            : 'rgba(255,255,255,0.04)',
                        color: '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  id="calendly-confirm-slot-btn"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => setCalendlyBooked(true)}
                >
                  Confirm {selectedDay} at {selectedSlot} →
                </button>
              </div>
            ) : (
              <div
                id="calendly-booking-confirmed"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.14)',
                  border: '1px solid var(--emerald-500)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.35rem',
                }}
                role="status"
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--emerald-400)',
                    marginBottom: '0.3rem',
                  }}
                >
                  ✓ Calendar Hold Reserved (Prototype Preview)
                </div>
                <h4 style={{ fontSize: '1.12rem', marginBottom: '0.35rem' }}>
                  {activeConsultation.title}
                </h4>
                <p style={{ fontSize: '0.86rem', color: '#e2e8f0', marginBottom: '0.9rem' }}>
                  Scheduled for <strong>{selectedDay}</strong> at{' '}
                  <strong>{selectedSlot}</strong>. In production, Robert’s live Calendly embed
                  dispatches a calendar invite and Zoom link automatically.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary-dark"
                  onClick={() => setCalendlyBooked(false)}
                >
                  Change Time Window
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Hyperscaler SEO FAQ Block */}
        <div style={{ marginTop: '4rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            Frequently Asked Questions
          </h3>
          <div className="cards-grid-3">
            {SITE_CONTENT.contact.faqs.map((faq) => (
              <div key={faq.question} className="surface-card">
                <h4
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 700,
                    color: 'var(--navy-900)',
                    marginBottom: '0.6rem',
                  }}
                >
                  {faq.question}
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
