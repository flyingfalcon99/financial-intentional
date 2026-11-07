/**
 * FinancialIntentional.com — Decoupled Content Layer
 * --------------------------------------------------
 * Designed as the single source of truth for copy, credentials, disclosures,
 * and structured sections. In Epic 2/4, this module can fetch directly from
 * Sanity.io GROQ or Headless WordPress GraphQL with zero UI component rewrites.
 */

export interface TrustMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  duration: string;
  description: string;
}

export interface LoanProgramCard {
  id: string;
  title: string;
  badge: string;
  idealFor: string;
  highlights: string[];
}

export interface AdvisoryPillar {
  title: string;
  subtitle: string;
  description: string;
  outcomes: string[];
}

export interface RecruitingTrack {
  id: 'employers' | 'candidates';
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: string[];
  ctaText: string;
  inquiryTopic: string;
}

export interface ConsultationOption {
  id: string;
  title: string;
  duration: string;
  pillar: 'Mortgage' | 'Financial Advisory' | 'Corporate Recruiting';
  description: string;
  agenda: string[];
}

export const SITE_CONTENT = {
  brand: {
    name: 'Financial Intentional',
    domain: 'FinancialIntentional.com',
    founder: 'Robert Wroblewski',
    title: 'Mortgage Strategist • Financial Advisor • Executive Recruiter',
    nmlsId: 'NMLS #PENDING-HANDOFF',
    email: 'robert@financialintentional.com',
    phone: '(800) 555-0194',
    location: 'Serving Clients Nationwide • Personalized Strategy',
    calendlyDefaultUrl: 'https://calendly.com/financialintentional/strategy-call',
  },

  navigation: [
    { label: 'Mortgage Strategy', href: '#mortgage' },
    { label: 'Payment Calculator', href: '#calculator' },
    { label: 'Financial Advisory', href: '#advisory' },
    { label: 'Corporate Recruiting', href: '#recruiting' },
    { label: 'About Robert', href: '#about' },
    { label: 'Schedule & Contact', href: '#contact' },
  ],

  hero: {
    eyebrow: 'ROBERT WROBLEWSKI • PERSONAL BRAND HUB',
    headline: 'Every Mortgage & Wealth Decision—Engineered with Intention.',
    subheadline:
      'Most borrowers treat their mortgage as an isolated transaction. Robert Wroblewski aligns your home financing, long-term wealth strategy, and executive career trajectory into one cohesive blueprint.',
    primaryCta: {
      label: 'Model Your Mortgage Payment',
      href: '#calculator',
    },
    secondaryCta: {
      label: 'Book a 1-on-1 Strategy Call',
      href: '#contact',
    },
    videoBriefing: {
      title: 'Welcome to Financial Intentional',
      duration: '2:15 Executive Briefing',
      speaker: 'Robert Wroblewski',
      role: 'Founder, FinancialIntentional.com',
      summary:
        'See how structuring the right mortgage terms protects your liquidity, accelerates compound net worth, and eliminates costly blind spots.',
      chapters: [
        { time: '0:00', label: 'Why "Intentional" Financing Matters' },
        { time: '0:48', label: 'Integrating Mortgage Debt with Wealth Advisory' },
        { time: '1:35', label: 'How Our Custom Scenario Calculator Works' },
      ],
    },
    trustMetrics: [
      {
        value: '3 Pillars',
        label: 'Unified Expertise',
        detail: 'Mortgage Lending • Treece Financial Advisory • JSS Recruiting',
      },
      {
        value: '< 24 Hrs',
        label: 'Scenario Turnaround',
        detail: 'Direct line to Robert—never passed off to a call center queue',
      },
      {
        value: '100%',
        label: 'Transparent Math',
        detail: 'Every rate, fee, tax, and equity tradeoff modeled upfront',
      },
      {
        value: '5.0 ★',
        label: 'Client Fiduciary Mindset',
        detail: 'Long-term relationship guidance over one-time transactions',
      },
    ] as TrustMetric[],
  },

  mortgage: {
    eyebrow: 'PILLAR 01 • PRECISION MORTGAGE LENDING',
    headline: 'Home Financing Built Around Your Balance Sheet, Not Just a Rate Quote.',
    subheadline:
      'Whether you are purchasing your first home, upgrading to an executive residence, or restructuring existing equity, your mortgage should actively serve your broader financial plan.',
    processSteps: [
      {
        stepNumber: '01',
        title: 'Intentional Discovery & Cash-Flow Audit',
        duration: 'Day 1 (15–30 Min Call)',
        description:
          'We evaluate your liquidity goals, tax horizon, and monthly comfort zone before recommending loan structures.',
      },
      {
        stepNumber: '02',
        title: 'Custom Spreadsheet & Scenario Modeling',
        duration: 'Within 24 Hours',
        description:
          'Compare down payment tiers, term lengths, and rate buydown break-even points side by side with zero guesswork.',
      },
      {
        stepNumber: '03',
        title: 'Verified Pre-Approval & Rate Execution',
        duration: 'Days 2–5',
        description:
          'Strengthen your purchase offer with a rock-solid pre-approval letter and proactive market rate monitoring.',
      },
      {
        stepNumber: '04',
        title: 'Frictionless Underwriting to Closing Table',
        duration: '18–25 Days Avg.',
        description:
          'Clear milestone communication with you, your Realtor, and your CPA/financial advisor through final funding.',
      },
    ] as ProcessStep[],
    loanPrograms: [
      {
        id: 'conventional',
        title: 'Conventional & High-Balance Loans',
        badge: 'Most Popular',
        idealFor: 'Strong-credit buyers optimizing down payment vs. liquidity',
        highlights: [
          '3% to 20%+ flexible down payment structures',
          'Automatic PMI removal strategies at 80% LTV',
          '10, 15, 20, and 30-year fixed amortization options',
        ],
      },
      {
        id: 'jumbo',
        title: 'Executive Jumbo & Portfolio Financing',
        badge: 'High Net Worth',
        idealFor: 'Executives and business owners with complex compensation',
        highlights: [
          'RSU, bonus, K-1, and asset-depletion qualification expertise',
          'Competitive jumbo reserve and LTV structuring',
          'Coordinated directly with your wealth management portfolio',
        ],
      },
      {
        id: 'fha-va',
        title: 'VA & FHA Government-Backed Programs',
        badge: 'Low Down Payment',
        idealFor: 'Veterans, active-duty service members, and first-time buyers',
        highlights: [
          '$0 down payment & zero monthly PMI for eligible VA borrowers',
          '3.5% down FHA options with flexible credit guidelines',
          'Streamline refinance (IRRRL / FHA Streamline) readiness',
        ],
      },
      {
        id: 'refi-equity',
        title: 'Strategic Refinance & Equity Optimization',
        badge: 'Balance Sheet',
        idealFor: 'Homeowners lowering rates, shortening terms, or unlocking capital',
        highlights: [
          'Exact break-even month calculation before you commit',
          'Debt consolidation and renovation equity modeling',
          'Transition from 30-year to 15-year wealth building',
        ],
      },
    ] as LoanProgramCard[],
  },

  advisory: {
    eyebrow: 'PILLAR 02 • WEALTH & FINANCIAL ADVISORY',
    partnerName: 'Treece Financial Group',
    headline: 'Where Your Largest Liability Meets Your Long-Term Wealth Strategy.',
    subheadline:
      'In partnership with Treece Financial Group, Robert helps individuals and families bridge the gap between everyday cash-flow decisions and multi-decade wealth preservation.',
    pillars: [
      {
        title: 'Holistic Balance Sheet Alignment',
        subtitle: 'Asset & Liability Coordination',
        description:
          'Should you put 20% down, pay points, or keep capital invested in the market? We analyze both sides of your balance sheet simultaneously.',
        outcomes: [
          'Opportunity-cost analysis on home equity vs. market returns',
          'Tax-conscious debt and liquidity structuring',
          'Emergency reserve and cash-flow stress testing',
        ],
      },
      {
        title: 'Retirement & Investment Architecture',
        subtitle: 'Powered by Treece Financial Group',
        description:
          'Disciplined, evidence-based investment management designed to grow and protect your family’s purchasing power across market cycles.',
        outcomes: [
          '401(k), IRA, and taxable brokerage portfolio alignment',
          'Retirement income timeline and withdrawal sequencing',
          'Risk-adjusted asset allocation tailored to your life stage',
        ],
      },
      {
        title: 'Family Protection & Legacy Planning',
        subtitle: 'Risk Management & Continuity',
        description:
          'Ensure that a new mortgage or career transition is backed by appropriate life, disability, and estate coordination.',
        outcomes: [
          'Mortgage protection and income-replacement gap audits',
          'Education funding (529) and generational wealth roadmaps',
          'Collaborative coordination with your CPA and estate attorney',
        ],
      },
    ] as AdvisoryPillar[],
    disclosureTitle: 'Licensed Financial Advisory & Regulatory Disclosures',
    disclosureBody:
      'Advisory services are offered through Treece Financial Group. Mortgage lending services and financial advisory services are distinct engagements governed by separate regulatory frameworks; clients are never obligated to utilize both services. All NMLS, state licensing, broker affiliation, and FINRA/SEC BrokerCheck disclosures will be displayed in full upon final compliance text handoff prior to production launch.',
  },

  recruiting: {
    eyebrow: 'PILLAR 03 • CORPORATE & EXECUTIVE RECRUITING',
    partnerName: 'JSS Recruiting',
    headline: 'Connecting High-Impact Financial & Corporate Talent with Visionary Companies.',
    subheadline:
      'Through JSS Recruiting, Robert leverages deep financial industry fluency to evaluate leadership talent beyond resume buzzwords—matching cultural intentionality with bottom-line execution.',
    tracks: [
      {
        id: 'employers',
        badge: 'FOR HIRING ORGANIZATIONS',
        title: 'Retain Vetted Finance, Accounting & Operations Leaders',
        subtitle: 'Direct executive search led by a financial practitioner',
        description:
          'When hiring a Controller, CFO, VP of Finance, or Senior Analyst, generic recruiters miss technical nuances. Robert screens candidates practitioner-to-practitioner.',
        bulletPoints: [
          'Targeted headhunting in Accounting, Corporate Finance, Treasury & Operations',
          'Rigorous technical & cultural alignment vetting before candidates reach your inbox',
          'Fast shortlists with transparent placement guarantees via JSS Recruiting',
        ],
        ctaText: 'Request a Talent Search Consultation',
        inquiryTopic: 'Corporate Recruiting — Employer Talent Search (JSS Recruiting)',
      },
      {
        id: 'candidates',
        badge: 'FOR EXECUTIVE & FINANCE PROFESSIONALS',
        title: 'Confidential Career Advancement & Compensation Strategy',
        subtitle: 'Partner with an advisor who understands both your career and net worth',
        description:
          'Exploring your next leadership role requires discretion and strategic positioning. We connect high-performing professionals with unadvertised corporate opportunities.',
        bulletPoints: [
          '100% confidential representation with vetted regional and national employers',
          'Total compensation evaluation (base, bonus, equity, and relocation mortgage impact)',
          'Long-term career trajectory coaching rather than high-pressure placement',
        ],
        ctaText: 'Initiate a Confidential Career Conversation',
        inquiryTopic: 'Corporate Recruiting — Confidential Candidate Inquiry (JSS Recruiting)',
      },
    ] as RecruitingTrack[],
  },

  about: {
    eyebrow: 'ABOUT ROBERT WROBLEWSKI',
    headline: 'One Trusted Advisor Across the Three Biggest Decisions of Your Professional Life.',
    leadQuote:
      '“Buying a home, building retirement wealth, and advancing your career aren’t separate chapters—they directly fund and reinforce one another when approached with intention.”',
    bioParagraphs: [
      'Robert Wroblewski founded FinancialIntentional.com after seeing too many professionals receive fragmented advice: a mortgage lender pushing the maximum loan size, a financial advisor unaware of their real estate goals, and a recruiter focused only on the next job hop.',
      'By combining precision mortgage origination, comprehensive wealth advisory with Treece Financial Group, and corporate talent placement with JSS Recruiting, Robert provides a rare 360-degree vantage point.',
      'Whether you are running numbers on a home purchase at 9 PM on your phone or restructuring your family’s five-year financial plan, Robert brings clarity, spreadsheet rigor, and calm execution to every conversation.',
    ],
    credentials: [
      {
        category: 'Mortgage Origination',
        title: 'Licensed Mortgage Strategist',
        org: 'Residential Purchase, Jumbo & Refinance Lending (NMLS Pending Handoff)',
      },
      {
        category: 'Wealth Management',
        title: 'Affiliated Financial Advisor',
        org: 'Treece Financial Group — Holistic Wealth & Retirement Planning',
      },
      {
        category: 'Talent Acquisition',
        title: 'Corporate Recruiting Partner',
        org: 'JSS Recruiting — Finance, Accounting & Executive Placement',
      },
    ],
  },

  contact: {
    eyebrow: 'START THE CONVERSATION',
    headline: 'Lock In Your Custom Numbers or Book Directly on Robert’s Calendar.',
    subheadline:
      'Choose a quick discovery window via the integrated scheduler or send your scenario directly. Every inquiry goes straight to Robert.',
    consultationOptions: [
      {
        id: 'mortgage-15',
        title: '15-Minute Mortgage & Rate Strategy Call',
        duration: '15 Min • Phone or Zoom',
        pillar: 'Mortgage',
        description:
          'Review your calculator payment scenario, compare loan programs, and map out your pre-approval timeline.',
        agenda: [
          'Verify accurate property tax, insurance & PMI assumptions',
          'Compare 30-Yr vs. 15-Yr or rate buydown break-even math',
          'Outline next steps for a same-day pre-approval letter',
        ],
      },
      {
        id: 'advisory-30',
        title: '30-Minute Holistic Financial Alignment Session',
        duration: '30 Min • Zoom Video Briefing',
        pillar: 'Financial Advisory',
        description:
          'Explore how your real estate goals integrate with your investment portfolio and retirement roadmap via Treece Financial Group.',
        agenda: [
          'Cash-flow and liquidity allocation review',
          'Down payment vs. market investment tradeoff modeling',
          'Overview of Treece Financial Group advisory framework',
        ],
      },
      {
        id: 'recruiting-20',
        title: '20-Minute JSS Recruiting Briefing',
        duration: '20 Min • Confidential Call',
        pillar: 'Corporate Recruiting',
        description:
          'For hiring executives seeking finance/accounting talent or professionals exploring a confidential career move.',
        agenda: [
          'Role specification or confidential career target discussion',
          'Current market compensation benchmark overview',
          'Search timeline and shortlist milestones',
        ],
      },
    ] as ConsultationOption[],
    faqs: [
      {
        question: 'How accurate is the online Mortgage Calculator compared to my final loan quote?',
        answer:
          'Our interactive calculator provides an immediate, realistic breakdown of Principal & Interest, Property Taxes, Homeowners Insurance, HOA, and estimated PMI. Once we connect on a quick strategy call, Robert runs your exact figures through his proprietary underwriting workbook for cent-for-cent precision.',
      },
      {
        question: 'Do I have to use Treece Financial Group advisory services to get a mortgage with Robert?',
        answer:
          'Never. Each pillar—Mortgage Lending, Financial Advisory, and Corporate Recruiting—operates independently with zero bundling obligation. Clients simply appreciate having an advisor who understands how all three intersect.',
      },
      {
        question: 'How quickly can I receive a verified Pre-Approval Letter for a home offer?',
        answer:
          'In most cases, within 24 hours of completing your initial discovery call and uploading standard income/asset documentation.',
      },
    ],
  },
};
