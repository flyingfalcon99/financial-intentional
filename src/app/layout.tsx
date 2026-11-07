import type { Metadata, Viewport } from 'next';
import './globals.css';
import { generateJsonLdSchema } from '@/lib/seo-schema';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#071120',
};

export const metadata: Metadata = {
  title: 'Financial Intentional | Robert Wroblewski — Mortgage Strategy, Wealth Advisory & Recruiting',
  description:
    'Personal brand hub of Robert Wroblewski (FinancialIntentional.com). Model your monthly mortgage payment in real time, align your home financing with Treece Financial Group wealth strategy, or connect with JSS Recruiting.',
  keywords: [
    'Robert Wroblewski',
    'Financial Intentional',
    'FinancialIntentional.com',
    'Interactive Mortgage Calculator',
    'Mortgage Strategist',
    'Treece Financial Group',
    'JSS Recruiting',
    'Holistic Wealth Advisory',
  ],
  authors: [{ name: 'Robert Wroblewski' }],
  openGraph: {
    title: 'Financial Intentional — Robert Wroblewski',
    description:
      'Precision mortgage lending, holistic wealth advisory (Treece Financial Group), and executive finance recruiting (JSS Recruiting).',
    url: 'https://financialintentional.com',
    siteName: 'Financial Intentional',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generateJsonLdSchema();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
