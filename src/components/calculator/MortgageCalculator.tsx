'use client';

import React, { useMemo, useState } from 'react';
import {
  CALCULATOR_PRESETS,
  CalculatorInputs,
  CalculatorOutputs,
  CreditScoreTier,
  DEFAULT_CALCULATOR_INPUTS,
  LoanProgramType,
  LoanTermYears,
  calculateMortgageScenario,
  formatCurrency,
} from '@/lib/calculator-engine';

export interface SelectedScenarioHandoff {
  inputs: CalculatorInputs;
  outputs: CalculatorOutputs;
}

interface MortgageCalculatorProps {
  onLockScenario?: (scenario: SelectedScenarioHandoff) => void;
}

export function MortgageCalculator({ onLockScenario }: MortgageCalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_CALCULATOR_INPUTS);
  const [activePresetId, setActivePresetId] = useState<string>('conventional-20');
  const [showAdvancedAssumptions, setShowAdvancedAssumptions] = useState<boolean>(true);
  const [showEquityTable, setShowEquityTable] = useState<boolean>(false);

  const outputs = useMemo(() => calculateMortgageScenario(inputs), [inputs]);

  // Handlers keeping Home Price, Down Payment ($), and Down Payment (%) synchronized
  const handleHomePriceChange = (newPrice: number) => {
    const clampedPrice = Math.max(50000, Math.min(2500000, newPrice || 0));
    const syncedDownAmount = Math.round((clampedPrice * inputs.downPaymentPercent) / 100);
    setActivePresetId('custom');
    setInputs((prev) => ({
      ...prev,
      homePrice: clampedPrice,
      downPaymentAmount: syncedDownAmount,
    }));
  };

  const handleDownPaymentPercentChange = (newPercent: number) => {
    const clampedPercent = Math.max(0, Math.min(80, Number(newPercent.toFixed(1))));
    const syncedAmount = Math.round((inputs.homePrice * clampedPercent) / 100);
    setActivePresetId('custom');
    setInputs((prev) => ({
      ...prev,
      downPaymentPercent: clampedPercent,
      downPaymentAmount: syncedAmount,
    }));
  };

  const handleDownPaymentAmountChange = (newAmount: number) => {
    const maxDown = Math.round(inputs.homePrice * 0.8);
    const clampedAmount = Math.max(0, Math.min(maxDown, newAmount || 0));
    const syncedPercent =
      inputs.homePrice > 0
        ? Number(((clampedAmount / inputs.homePrice) * 100).toFixed(1))
        : 0;
    setActivePresetId('custom');
    setInputs((prev) => ({
      ...prev,
      downPaymentAmount: clampedAmount,
      downPaymentPercent: syncedPercent,
    }));
  };

  const handlePresetSelect = (presetId: string) => {
    const preset = CALCULATOR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePresetId(preset.id);
    setInputs(preset.inputs);
  };

  const handleLockScenarioClick = () => {
    if (onLockScenario) {
      onLockScenario({ inputs, outputs });
    }
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downPaymentQuickPercents = [3.5, 5, 10, 20, 25];
  const loanTerms: LoanTermYears[] = [30, 20, 15, 10];
  const creditTiers: CreditScoreTier[] = ['760+', '720-759', '680-719', '640-679'];
  const loanPrograms: { id: LoanProgramType; label: string }[] = [
    { id: 'conventional', label: 'Conventional' },
    { id: 'fha', label: 'FHA (3.5%+)' },
    { id: 'va', label: 'VA ($0 PMI)' },
    { id: 'jumbo', label: 'Jumbo' },
  ];

  return (
    <div className="calculator-shell" id="calculator" role="region" aria-label="Interactive Mortgage Payment Calculator">
      {/* Top Scenario Preset Bar */}
      <div className="calculator-top-bar">
        <div>
          <span
            style={{
              fontSize: '0.74rem',
              fontWeight: 700,
              letterSpacing: '0.09em',
              textTransform: 'uppercase',
              color: 'var(--emerald-400)',
              display: 'block',
            }}
          >
            Interactive Mortgage & Cash-Flow Modeler
          </span>
          <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>
            Test Real-Time Scenarios or Load a Quick Benchmark:
          </strong>
        </div>

        <div className="preset-pills" role="group" aria-label="Calculator Scenario Presets">
          {CALCULATOR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              id={`calc-preset-${preset.id}`}
              className={`preset-pill ${activePresetId === preset.id ? 'active' : ''}`}
              onClick={() => handlePresetSelect(preset.id)}
              title={preset.tagline}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Calculator Workspace */}
      <div className="calculator-body-grid">
        {/* Left Pane: Sliders & Direct Numeric Inputs */}
        <div className="calc-inputs-pane">
          {/* Loan Program Selector */}
          <div className="calc-control-group">
            <div className="calc-label-row">
              <label className="calc-label">Loan Program Structure</label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Adjusts PMI & LTV rules automatically
              </span>
            </div>
            <div className="segmented-row" role="group" aria-label="Loan Program Type">
              {loanPrograms.map((prog) => (
                <button
                  key={prog.id}
                  type="button"
                  id={`calc-prog-${prog.id}`}
                  className={`segment-btn ${inputs.loanProgram === prog.id ? 'active' : ''}`}
                  onClick={() => {
                    setActivePresetId('custom');
                    if (prog.id === 'va') {
                      setInputs((prev) => ({
                        ...prev,
                        loanProgram: 'va',
                        downPaymentPercent: 0,
                        downPaymentAmount: 0,
                      }));
                    } else if (prog.id === 'fha' && inputs.downPaymentPercent < 3.5) {
                      const amt = Math.round(inputs.homePrice * 0.035);
                      setInputs((prev) => ({
                        ...prev,
                        loanProgram: 'fha',
                        downPaymentPercent: 3.5,
                        downPaymentAmount: amt,
                      }));
                    } else {
                      setInputs((prev) => ({ ...prev, loanProgram: prog.id }));
                    }
                  }}
                >
                  {prog.label}
                </button>
              ))}
            </div>
          </div>

          {/* 1. Home Purchase Price */}
          <div className="calc-control-group">
            <div className="calc-label-row">
              <label htmlFor="calc-home-price-input" className="calc-label">
                Home Purchase Price
              </label>
              <div className="calc-input-box">
                <span className="calc-input-prefix">$</span>
                <input
                  id="calc-home-price-input"
                  type="number"
                  min={50000}
                  max={2500000}
                  step={5000}
                  value={inputs.homePrice}
                  onChange={(e) => handleHomePriceChange(Number(e.target.value))}
                  className="calc-numeric-input"
                  aria-label="Home Purchase Price in Dollars"
                />
              </div>
            </div>
            <input
              id="calc-home-price-slider"
              type="range"
              min={100000}
              max={2000000}
              step={5000}
              value={Math.min(2000000, inputs.homePrice)}
              onChange={(e) => handleHomePriceChange(Number(e.target.value))}
              className="calc-slider"
              aria-label="Home Purchase Price Slider"
            />
            <div className="calc-range-Bounds">
              <span>$100,000</span>
              <span>$500,000</span>
              <span>$1,000,000</span>
              <span>$2,000,000+</span>
            </div>
          </div>

          {/* 2. Down Payment ($ and % Synchronized) */}
          <div className="calc-control-group">
            <div className="calc-label-row" style={{ flexWrap: 'wrap' }}>
              <label htmlFor="calc-down-payment-input" className="calc-label">
                Down Payment ({inputs.downPaymentPercent}%)
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <div className="calc-input-box">
                  <span className="calc-input-prefix">$</span>
                  <input
                    id="calc-down-payment-input"
                    type="number"
                    min={0}
                    max={Math.round(inputs.homePrice * 0.8)}
                    step={1000}
                    value={inputs.downPaymentAmount}
                    onChange={(e) => handleDownPaymentAmountChange(Number(e.target.value))}
                    className="calc-numeric-input"
                    style={{ width: '92px' }}
                    aria-label="Down Payment Amount in Dollars"
                  />
                </div>
                <div className="calc-input-box">
                  <input
                    id="calc-down-percent-input"
                    type="number"
                    min={0}
                    max={80}
                    step={0.5}
                    value={inputs.downPaymentPercent}
                    onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
                    className="calc-numeric-input"
                    style={{ width: '52px' }}
                    aria-label="Down Payment Percentage"
                  />
                  <span className="calc-input-suffix">%</span>
                </div>
              </div>
            </div>

            <input
              id="calc-down-payment-slider"
              type="range"
              min={0}
              max={50}
              step={0.5}
              value={Math.min(50, inputs.downPaymentPercent)}
              onChange={(e) => handleDownPaymentPercentChange(Number(e.target.value))}
              className="calc-slider"
              aria-label="Down Payment Percentage Slider"
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}
            >
              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                Quick Down Payment Tiers:
              </span>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {downPaymentQuickPercents.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    id={`calc-down-pill-${pct}`}
                    onClick={() => handleDownPaymentPercentChange(pct)}
                    style={{
                      padding: '0.22rem 0.55rem',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: '5px',
                      border:
                        inputs.downPaymentPercent === pct
                          ? '1px solid var(--emerald-600)'
                          : '1px solid var(--border-strong)',
                      backgroundColor:
                        inputs.downPaymentPercent === pct
                          ? 'var(--emerald-50)'
                          : 'var(--surface-white)',
                      color:
                        inputs.downPaymentPercent === pct
                          ? 'var(--emerald-700)'
                          : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Interest Rate & Loan Term Row */}
          <div className="cards-grid-2" style={{ gap: '1.25rem' }}>
            <div className="calc-control-group">
              <div className="calc-label-row">
                <label htmlFor="calc-interest-rate-input" className="calc-label">
                  Interest Rate
                </label>
                <div className="calc-input-box">
                  <input
                    id="calc-interest-rate-input"
                    type="number"
                    min={2.0}
                    max={12.0}
                    step={0.125}
                    value={inputs.interestRate}
                    onChange={(e) => {
                      setActivePresetId('custom');
                      setInputs((prev) => ({
                        ...prev,
                        interestRate: Number(e.target.value),
                      }));
                    }}
                    className="calc-numeric-input"
                    style={{ width: '64px' }}
                    aria-label="Annual Interest Rate Percentage"
                  />
                  <span className="calc-input-suffix">%</span>
                </div>
              </div>
              <input
                id="calc-interest-rate-slider"
                type="range"
                min={3.0}
                max={9.5}
                step={0.125}
                value={Math.min(9.5, Math.max(3.0, inputs.interestRate))}
                onChange={(e) => {
                  setActivePresetId('custom');
                  setInputs((prev) => ({
                    ...prev,
                    interestRate: Number(e.target.value),
                  }));
                }}
                className="calc-slider"
                aria-label="Interest Rate Slider"
              />
              <div className="calc-range-Bounds">
                <span>3.00%</span>
                <span>6.25%</span>
                <span>9.50%</span>
              </div>
            </div>

            <div className="calc-control-group">
              <div className="calc-label-row">
                <label className="calc-label">Amortization Term</label>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  Payoff in {outputs.estimatedPayoffYear}
                </span>
              </div>
              <div className="segmented-row" role="group" aria-label="Loan Term in Years">
                {loanTerms.map((term) => (
                  <button
                    key={term}
                    type="button"
                    id={`calc-term-${term}`}
                    className={`segment-btn ${
                      inputs.loanTermYears === term ? 'active' : ''
                    }`}
                    onClick={() => {
                      setActivePresetId('custom');
                      setInputs((prev) => ({ ...prev, loanTermYears: term }));
                    }}
                  >
                    {term} Yr
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Toggleable Taxes, Insurance, HOA & Credit Score Drawer */}
          <div
            style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1rem',
            }}
          >
            <button
              type="button"
              id="calc-toggle-advanced"
              onClick={() => setShowAdvancedAssumptions((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: 'none',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.88rem',
                color: 'var(--navy-700)',
                cursor: 'pointer',
                padding: '0.25rem 0',
              }}
              aria-expanded={showAdvancedAssumptions}
            >
              <span>
                Taxes, Insurance, HOA & Credit Tier Assumptions (PITI Breakdown)
              </span>
              <span>{showAdvancedAssumptions ? 'Hide ▲' : 'Customize ▼'}</span>
            </button>

            {showAdvancedAssumptions && (
              <div
                style={{
                  marginTop: '1rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  padding: '1rem',
                  backgroundColor: 'var(--bg-ivory)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {/* Property Tax Rate */}
                <div className="calc-control-group">
                  <div className="calc-label-row">
                    <label htmlFor="calc-tax-rate-input" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      Property Tax Rate (%/yr)
                    </label>
                    <span className="tabular-nums" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                      {inputs.propertyTaxRate}%
                    </span>
                  </div>
                  <input
                    id="calc-tax-rate-input"
                    type="range"
                    min={0.3}
                    max={3.0}
                    step={0.05}
                    value={inputs.propertyTaxRate}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        propertyTaxRate: Number(e.target.value),
                      }))
                    }
                    className="calc-slider"
                  />
                </div>

                {/* Annual Homeowners Insurance */}
                <div className="calc-control-group">
                  <div className="calc-label-row">
                    <label htmlFor="calc-insurance-input" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      Home Insurance ($/yr)
                    </label>
                    <span className="tabular-nums" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                      {formatCurrency(inputs.annualInsurance)}/yr
                    </span>
                  </div>
                  <input
                    id="calc-insurance-input"
                    type="range"
                    min={600}
                    max={6000}
                    step={120}
                    value={inputs.annualInsurance}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        annualInsurance: Number(e.target.value),
                      }))
                    }
                    className="calc-slider"
                  />
                </div>

                {/* Monthly HOA Dues */}
                <div className="calc-control-group">
                  <div className="calc-label-row">
                    <label htmlFor="calc-hoa-input" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                      Monthly HOA Dues
                    </label>
                    <span className="tabular-nums" style={{ fontSize: '0.82rem', fontWeight: 700 }}>
                      {formatCurrency(inputs.monthlyHoa)}/mo
                    </span>
                  </div>
                  <input
                    id="calc-hoa-input"
                    type="range"
                    min={0}
                    max={800}
                    step={25}
                    value={inputs.monthlyHoa}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        monthlyHoa: Number(e.target.value),
                      }))
                    }
                    className="calc-slider"
                  />
                </div>

                {/* Credit Score Tier */}
                <div className="calc-control-group">
                  <label htmlFor="calc-credit-select" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                    Estimated Credit Tier
                  </label>
                  <select
                    id="calc-credit-select"
                    value={inputs.creditTier}
                    onChange={(e) =>
                      setInputs((prev) => ({
                        ...prev,
                        creditTier: e.target.value as CreditScoreTier,
                      }))
                    }
                    style={{
                      padding: '0.45rem 0.6rem',
                      borderRadius: '6px',
                      border: '1px solid var(--border-strong)',
                      backgroundColor: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      color: 'var(--navy-900)',
                    }}
                  >
                    {creditTiers.map((tier) => (
                      <option key={tier} value={tier}>
                        FICO {tier}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Live Monthly Payment Readout, PITI Breakdown & Handoff CTA */}
        <div className="calc-results-pane">
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                  color: 'var(--emerald-400)',
                }}
              >
                Estimated Monthly Payment
              </span>
              <span
                className="tabular-nums"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  backgroundColor:
                    outputs.ltvPercent <= 80
                      ? 'rgba(16, 185, 129, 0.16)'
                      : 'rgba(245, 158, 11, 0.18)',
                  color: outputs.ltvPercent <= 80 ? 'var(--emerald-400)' : '#fbbf24',
                }}
              >
                LTV: {outputs.ltvPercent}% • Loan: {formatCurrency(outputs.loanAmount)}
              </span>
            </div>

            <div className="monthly-payment-hero" id="calc-total-monthly-readout" aria-live="polite">
              {formatCurrency(outputs.totalMonthlyPayment)}
              <span
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 500,
                  color: 'var(--text-on-dark-muted)',
                  marginLeft: '0.35rem',
                }}
              >
                / month
              </span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-on-dark-muted)' }}>
              {outputs.pmiNote}
            </p>

            {/* Stacked Visual Proportion Bar */}
            <div className="stacked-bar-track" aria-hidden="true">
              {outputs.breakdown
                .filter((item) => item.amount > 0)
                .map((item) => (
                  <div
                    key={item.id}
                    className="stacked-bar-segment"
                    style={{
                      width: `${Math.max(3, item.percentage)}%`,
                      backgroundColor: item.color,
                    }}
                    title={`${item.label}: ${formatCurrency(item.amount)}/mo`}
                  />
                ))}
            </div>

            {/* Line-by-Line PITI + PMI + HOA Breakdown */}
            <div className="breakdown-list">
              {outputs.breakdown.map((item) => (
                <div key={item.id} className="breakdown-item">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span
                      className="breakdown-dot"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.label}</span>
                  </span>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: '#ffffff' }}>
                    {formatCurrency(item.amount)}
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 400,
                        color: 'var(--text-on-dark-muted)',
                        marginLeft: '0.35rem',
                      }}
                    >
                      ({Math.round(item.percentage)}%)
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Equity Build & Amortization Milestone Preview */}
            <div style={{ marginTop: '1rem' }}>
              <button
                type="button"
                id="calc-toggle-equity-btn"
                onClick={() => setShowEquityTable((prev) => !prev)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  borderRadius: '8px',
                  color: 'var(--emerald-400)',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  width: '100%',
                  textAlign: 'left',
                  display: 'flex',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <span>View Intentional Equity & Amortization Milestones</span>
                <span>{showEquityTable ? '▲' : '▼'}</span>
              </button>

              {showEquityTable && (
                <div
                  style={{
                    marginTop: '0.6rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px',
                    padding: '0.75rem',
                    fontSize: '0.78rem',
                  }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      fontWeight: 700,
                      color: 'var(--text-on-dark-muted)',
                      paddingBottom: '0.4rem',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <span>Milestone</span>
                    <span>Loan Balance</span>
                    <span>Est. Home Equity</span>
                  </div>
                  {outputs.equityMilestones.map((m) => (
                    <div
                      key={m.year}
                      className="tabular-nums"
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        padding: '0.38rem 0',
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      <span>
                        Yr {m.year} ({m.calendarYear})
                      </span>
                      <span>{formatCurrency(m.remainingBalance)}</span>
                      <span style={{ color: 'var(--emerald-400)', fontWeight: 600 }}>
                        {formatCurrency(m.estimatedEquity)} ({m.equityPercent}%)
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Conversion Action: Pass Scenario to Robert */}
          <div
            style={{
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            <button
              type="button"
              id="calc-lock-scenario-cta"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleLockScenarioClick}
            >
              <span>Lock In This {formatCurrency(outputs.totalMonthlyPayment)}/mo Scenario with Robert</span>
              <span aria-hidden="true">→</span>
            </button>
            <div
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-on-dark-muted)',
                textAlign: 'center',
              }}
            >
              Attaches your {formatCurrency(inputs.homePrice)} price &{' '}
              {inputs.downPaymentPercent}% down assumptions directly to Robert’s strategy form.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
