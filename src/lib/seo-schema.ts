/**
 * FinancialIntentional.com — Hyperscaler SEO & AI Discoverability Schema
 * ----------------------------------------------------------------------
 * Generates rich JSON-LD structured data (@graph) so search engines and
 * AI engines (ChatGPT Search, Perplexity, Google AI Overviews) accurately
 * parse Robert Wroblewski's three service pillars and FAQ answers.
 */

import { SITE_CONTENT } from './site-content';

export function generateJsonLdSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://financialintentional.com/#website',
        url: 'https://financialintentional.com',
        name: SITE_CONTENT.brand.name,
        description: SITE_CONTENT.hero.subheadline,
        publisher: {
          '@id': 'https://financialintentional.com/#person',
        },
      },
      {
        '@type': 'Person',
        '@id': 'https://financialintentional.com/#person',
        name: SITE_CONTENT.brand.founder,
        jobTitle: SITE_CONTENT.brand.title,
        url: 'https://financialintentional.com',
        email: SITE_CONTENT.brand.email,
        telephone: SITE_CONTENT.brand.phone,
        worksFor: [
          {
            '@type': 'FinancialService',
            name: 'Financial Intentional',
          },
          {
            '@type': 'Organization',
            name: 'Treece Financial Group',
          },
          {
            '@type': 'EmploymentAgency',
            name: 'JSS Recruiting',
          },
        ],
        knowsAbout: [
          'Mortgage Lending',
          'Residential Home Loans',
          'Amortization & PITI Modeling',
          'Holistic Financial Planning',
          'Executive Finance & Accounting Recruiting',
        ],
      },
      {
        '@type': 'FinancialService',
        '@id': 'https://financialintentional.com/#business',
        name: 'Financial Intentional — Robert Wroblewski',
        url: 'https://financialintentional.com',
        founder: {
          '@id': 'https://financialintentional.com/#person',
        },
        description:
          'Personal brand hub of Robert Wroblewski offering precision mortgage origination, holistic financial advisory with Treece Financial Group, and corporate recruiting with JSS Recruiting.',
        areaServed: 'US',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Intentional Financial & Career Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'MortgageLoan',
                name: 'Precision Residential Mortgage Lending & Refinancing',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Holistic Wealth Advisory (Treece Financial Group)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Executive & Corporate Recruiting (JSS Recruiting)',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://financialintentional.com/#faq',
        mainEntity: SITE_CONTENT.contact.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };
}
