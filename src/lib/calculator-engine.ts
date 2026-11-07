/**
 * FinancialIntentional.com — Modular Mortgage Calculator Engine
 * -------------------------------------------------------------
 * Architecture Note (Epic 5 Ready):
 * This pure TypeScript engine powers the interactive React calculator UI.
 * In the prototype phase, it executes standard amortization + PITI/PMI math.
 * Once Robert Wroblewski's custom Excel workbook is audited in Epic 1/5,
 * only `calculateMortgageScenario()` needs to be updated for 1:1 spreadsheet parity.
 */

export type LoanTermYears = 30 | 20 | 15 | 10;
export type CreditScoreTier = '760+' | '720-759' | '680-719' | '640-679';
export type LoanProgramType = 'conventional' | 'fha' | 'va' | 'jumbo';

export interface CalculatorInputs {
  homePrice: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  interestRate: number; // Annual percentage, e.g., 6.25
  loanTermYears: LoanTermYears;
  propertyTaxRate: number; // Annual percentage of home price, e.g., 1.15
  annualInsurance: number; // Annual dollar amount, e.g., 1680
  monthlyHoa: number; // Monthly dollar amount
  creditTier: CreditScoreTier;
  loanProgram: LoanProgramType;
}

export interface PaymentBreakdownItem {
  id: 'pi' | 'tax' | 'insurance' | 'pmi' | 'hoa';
  label: string;
  shortLabel: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface EquityMilestone {
  year: number;
  calendarYear: number;
  remainingBalance: number;
  estimatedEquity: number;
  equityPercent: number;
  cumulativeInterest: number;
}

export interface CalculatorOutputs {
  loanAmount: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  ltvPercent: number;
  principalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  totalInterestOverLife: number;
  totalCostOfLoan: number;
  estimatedPayoffYear: number;
  requiresPmi: boolean;
  pmiNote: string;
  breakdown: PaymentBreakdownItem[];
  equityMilestones: EquityMilestone[];
}

export interface CalculatorPreset {
  id: string;
  name: string;
  tagline: string;
  inputs: CalculatorInputs;
}

export const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  homePrice: 485000,
  downPaymentAmount: 97000,
  downPaymentPercent: 20,
  interestRate: 6.25,
  loanTermYears: 30,
  propertyTaxRate: 1.15,
  annualInsurance: 1680,
  monthlyHoa: 0,
  creditTier: '760+',
  loanProgram: 'conventional',
};

export const CALCULATOR_PRESETS: CalculatorPreset[] = [
  {
    id: 'conventional-20',
    name: 'Intentional 20% Down',
    tagline: 'Zero PMI conventional structure',
    inputs: {
      homePrice: 485000,
      downPaymentAmount: 97000,
      downPaymentPercent: 20,
      interestRate: 6.25,
      loanTermYears: 30,
      propertyTaxRate: 1.15,
      annualInsurance: 1680,
      monthlyHoa: 0,
      creditTier: '760+',
      loanProgram: 'conventional',
    },
  },
  {
    id: 'first-time-5',
    name: 'First-Time Buyer (5% Down)',
    tagline: 'Preserve liquidity for investments',
    inputs: {
      homePrice: 395000,
      downPaymentAmount: 19750,
      downPaymentPercent: 5,
      interestRate: 6.375,
      loanTermYears: 30,
      propertyTaxRate: 1.15,
      annualInsurance: 1500,
      monthlyHoa: 65,
      creditTier: '720-759',
      loanProgram: 'conventional',
    },
  },
  {
    id: 'wealth-accelerator-15',
    name: '15-Year Wealth Accelerator',
    tagline: 'Rapid equity build & interest savings',
    inputs: {
      homePrice: 550000,
      downPaymentAmount: 110000,
      downPaymentPercent: 20,
      interestRate: 5.625,
      loanTermYears: 15,
      propertyTaxRate: 1.2,
      annualInsurance: 1850,
      monthlyHoa: 0,
      creditTier: '760+',
      loanProgram: 'conventional',
    },
  },
  {
    id: 'executive-jumbo',
    name: 'Executive Home ($950k)',
    tagline: 'Tailored high-balance strategy',
    inputs: {
      homePrice: 950000,
      downPaymentAmount: 190000,
      downPaymentPercent: 20,
      interestRate: 6.5,
      loanTermYears: 30,
      propertyTaxRate: 1.25,
      annualInsurance: 2800,
      monthlyHoa: 180,
      creditTier: '760+',
      loanProgram: 'jumbo',
    },
  },
];

/**
 * Annual PMI factor lookup table by credit score tier and LTV band.
 * Used for prototype estimation; replaceable with Robert's exact spreadsheet table.
 */
function getAnnualPmiFactor(
  ltvPercent: number,
  creditTier: CreditScoreTier,
  loanProgram: LoanProgramType
): number {
  if (loanProgram === 'va') {
    return 0; // VA loans have no monthly PMI
  }
  if (loanProgram === 'fha') {
    return ltvPercent > 90 ? 0.0055 : 0.005; // Standard FHA annual MIP factor
  }
  if (ltvPercent <= 80) {
    return 0;
  }

  const tierMap: Record<CreditScoreTier, number> = {
    '760+': ltvPercent > 90 ? 0.0046 : 0.0032,
    '720-759': ltvPercent > 90 ? 0.0062 : 0.0044,
    '680-719': ltvPercent > 90 ? 0.0085 : 0.006,
    '640-679': ltvPercent > 90 ? 0.0115 : 0.0082,
  };

  return tierMap[creditTier];
}

export function calculateMortgageScenario(
  rawInputs: CalculatorInputs
): CalculatorOutputs {
  const homePrice = Math.max(50000, Math.min(5000000, rawInputs.homePrice || 0));
  const downPaymentAmount = Math.max(
    0,
    Math.min(homePrice * 0.9, rawInputs.downPaymentAmount || 0)
  );
  const downPaymentPercent =
    homePrice > 0 ? (downPaymentAmount / homePrice) * 100 : 0;

  const loanAmount = Math.max(0, homePrice - downPaymentAmount);
  const ltvPercent = homePrice > 0 ? (loanAmount / homePrice) * 100 : 0;

  const totalMonths = rawInputs.loanTermYears * 12;
  const monthlyRate = Math.max(0, rawInputs.interestRate) / 100 / 12;

  let principalAndInterest = 0;
  if (loanAmount > 0) {
    if (monthlyRate === 0) {
      principalAndInterest = loanAmount / totalMonths;
    } else {
      const compound = Math.pow(1 + monthlyRate, totalMonths);
      principalAndInterest =
        loanAmount * ((monthlyRate * compound) / (compound - 1));
    }
  }

  const monthlyPropertyTax =
    (homePrice * Math.max(0, rawInputs.propertyTaxRate)) / 100 / 12;
  const monthlyInsurance = Math.max(0, rawInputs.annualInsurance) / 12;
  const monthlyHoa = Math.max(0, rawInputs.monthlyHoa);

  const pmiFactor = getAnnualPmiFactor(
    ltvPercent,
    rawInputs.creditTier,
    rawInputs.loanProgram
  );
  const monthlyPmi = (loanAmount * pmiFactor) / 12;
  const requiresPmi = monthlyPmi > 0;

  let pmiNote = 'No monthly PMI required at 80% LTV or below.';
  if (rawInputs.loanProgram === 'va') {
    pmiNote = 'VA Benefit: $0 monthly private mortgage insurance required.';
  } else if (rawInputs.loanProgram === 'fha') {
    pmiNote = 'Includes estimated FHA Monthly Mortgage Insurance Premium (MIP).';
  } else if (requiresPmi) {
    const neededFor20 = Math.max(0, homePrice * 0.2 - downPaymentAmount);
    pmiNote = `Est. PMI included (LTV ${ltvPercent.toFixed(1)}%). Add $${Math.round(
      neededFor20
    ).toLocaleString()} down to eliminate PMI immediately.`;
  }

  const totalMonthlyPayment =
    principalAndInterest +
    monthlyPropertyTax +
    monthlyInsurance +
    monthlyPmi +
    monthlyHoa;

  const totalCostOfLoan = principalAndInterest * totalMonths;
  const totalInterestOverLife = Math.max(0, totalCostOfLoan - loanAmount);
  const currentYear = 2026;
  const estimatedPayoffYear = currentYear + rawInputs.loanTermYears;

  const safeTotal = totalMonthlyPayment > 0 ? totalMonthlyPayment : 1;

  const breakdown: PaymentBreakdownItem[] = [
    {
      id: 'pi',
      label: 'Principal & Interest',
      shortLabel: 'P&I',
      amount: Math.round(principalAndInterest),
      percentage: (principalAndInterest / safeTotal) * 100,
      color: '#10B981', // Intentional Emerald
    },
    {
      id: 'tax',
      label: 'Property Taxes',
      shortLabel: 'Taxes',
      amount: Math.round(monthlyPropertyTax),
      percentage: (monthlyPropertyTax / safeTotal) * 100,
      color: '#0EA5E9', // Executive Sky
    },
    {
      id: 'insurance',
      label: 'Homeowners Insurance',
      shortLabel: 'Insurance',
      amount: Math.round(monthlyInsurance),
      percentage: (monthlyInsurance / safeTotal) * 100,
      color: '#F59E0B', // Warm Amber
    },
    {
      id: 'pmi',
      label: 'Mortgage Insurance (PMI)',
      shortLabel: 'PMI',
      amount: Math.round(monthlyPmi),
      percentage: (monthlyPmi / safeTotal) * 100,
      color: '#6366F1', // Slate Indigo
    },
    {
      id: 'hoa',
      label: 'HOA Dues',
      shortLabel: 'HOA',
      amount: Math.round(monthlyHoa),
      percentage: (monthlyHoa / safeTotal) * 100,
      color: '#94A3B8', // Muted Slate
    },
  ];

  // Generate equity milestones (Year 1, 5, 10, and Loan Term end)
  const milestoneYears = Array.from(
    new Set([
      1,
      5,
      Math.min(10, rawInputs.loanTermYears),
      rawInputs.loanTermYears,
    ])
  ).sort((a, b) => a - b);

  const equityMilestones: EquityMilestone[] = milestoneYears.map((yr) => {
    const monthsElapsed = yr * 12;
    let remainingBalance = 0;

    if (loanAmount > 0 && monthsElapsed < totalMonths) {
      if (monthlyRate === 0) {
        remainingBalance = loanAmount * (1 - monthsElapsed / totalMonths);
      } else {
        const compoundTotal = Math.pow(1 + monthlyRate, totalMonths);
        const compoundElapsed = Math.pow(1 + monthlyRate, monthsElapsed);
        remainingBalance =
          loanAmount *
          ((compoundTotal - compoundElapsed) / (compoundTotal - 1));
      }
    }

    const principalPaid = Math.max(0, loanAmount - remainingBalance);
    const totalPaidSoFar = principalAndInterest * monthsElapsed;
    const cumulativeInterest = Math.max(0, totalPaidSoFar - principalPaid);
    const estimatedEquity = downPaymentAmount + principalPaid;
    const equityPercent =
      homePrice > 0 ? (estimatedEquity / homePrice) * 100 : 100;

    return {
      year: yr,
      calendarYear: currentYear + yr,
      remainingBalance: Math.round(remainingBalance),
      estimatedEquity: Math.round(estimatedEquity),
      equityPercent: Math.min(100, Number(equityPercent.toFixed(1))),
      cumulativeInterest: Math.round(cumulativeInterest),
    };
  });

  return {
    loanAmount: Math.round(loanAmount),
    downPaymentAmount: Math.round(downPaymentAmount),
    downPaymentPercent: Number(downPaymentPercent.toFixed(1)),
    ltvPercent: Number(ltvPercent.toFixed(1)),
    principalAndInterest: Math.round(principalAndInterest),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyInsurance: Math.round(monthlyInsurance),
    monthlyPmi: Math.round(monthlyPmi),
    monthlyHoa: Math.round(monthlyHoa),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    totalInterestOverLife: Math.round(totalInterestOverLife),
    totalCostOfLoan: Math.round(totalCostOfLoan),
    estimatedPayoffYear,
    requiresPmi,
    pmiNote,
    breakdown,
    equityMilestones,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}
