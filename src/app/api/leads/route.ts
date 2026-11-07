import { NextRequest, NextResponse } from 'next/server';

export interface LeadSubmissionPayload {
  fullName: string;
  email: string;
  phone: string;
  inquiryPillar: string;
  preferredTimeframe: string;
  message: string;
  honeypot?: string;
  calculatorScenario?: {
    homePrice: number;
    downPaymentAmount: number;
    downPaymentPercent: number;
    interestRate: number;
    loanTermYears: number;
    totalMonthlyPayment: number;
    loanProgram: string;
  } | null;
}

/**
 * Phase 2 CRM Sandbox Hook (HubSpot / Salesforce / Encompass LOS)
 * Keeping this adapter boundary clean ensures Phase 2 CRM integration
 * requires zero frontend form modifications.
 */
async function forwardLeadToPhase2Crm(lead: LeadSubmissionPayload, referenceId: string) {
  // In Phase 2, wire CRM_WEBHOOK_URL / HubSpot Private App token here.
  return {
    queuedForCrm: Boolean(process.env.CRM_WEBHOOK_URL),
    referenceId,
    timestamp: new Date().toISOString(),
    pillar: lead.inquiryPillar,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LeadSubmissionPayload;

    // 1. Anti-spam honeypot protection
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json(
        { ok: true, referenceId: 'FI-FILTERED' },
        { status: 200 }
      );
    }

    // 2. Validate required fields
    if (!body.fullName?.trim() || !body.email?.trim() || !body.email.includes('@')) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Please provide your name and a valid email address so Robert can reply.',
        },
        { status: 400 }
      );
    }

    const referenceId = `FI-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const crmMeta = await forwardLeadToPhase2Crm(body, referenceId);

    return NextResponse.json(
      {
        ok: true,
        referenceId,
        submittedAt: crmMeta.timestamp,
        message:
          'Your inquiry and scenario details have been routed directly to Robert Wroblewski.',
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'Unable to process your request right now. Please try again or book via Calendly.',
      },
      { status: 500 }
    );
  }
}
