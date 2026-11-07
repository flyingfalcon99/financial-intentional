'use client';

import React, { useState } from 'react';
import { SITE_CONTENT } from '@/lib/site-content';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <a
          href="#top"
          className="brand-lockup"
          id="header-brand-link"
          aria-label="Financial Intentional — Robert Wroblewski Home"
        >
          <span className="brand-monogram" aria-hidden="true">
            FI
          </span>
          <span>
            <span className="brand-text-primary">{SITE_CONTENT.brand.name}</span>
            <span className="brand-text-sub">{SITE_CONTENT.brand.founder}</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary Navigation">
          {SITE_CONTENT.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              id={`nav-link-${item.href.replace('#', '')}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            href="#calculator"
            className="btn btn-secondary-dark"
            id="header-calc-cta"
            style={{ minHeight: '40px', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            Calculator
          </a>
          <a
            href="#contact"
            className="btn btn-primary"
            id="header-book-cta"
            style={{ minHeight: '40px', padding: '0.5rem 1.1rem', fontSize: '0.85rem' }}
          >
            Book Strategy Call
          </a>
          <button
            type="button"
            className="mobile-menu-btn"
            id="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="mobile-drawer" aria-label="Mobile Navigation">
          {SITE_CONTENT.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              style={{ fontSize: '0.98rem', padding: '0.45rem 0', color: '#ffffff' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <a
              href="#calculator"
              className="btn btn-secondary-dark"
              style={{ flex: 1 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Run Numbers
            </a>
            <a
              href="#contact"
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Schedule Call
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
