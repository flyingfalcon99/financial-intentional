'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { MortgageSection } from '@/components/sections/MortgageSection';
import { AdvisorySection } from '@/components/sections/AdvisorySection';
import { RecruitingSection } from '@/components/sections/RecruitingSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/layout/Footer';
import { SelectedScenarioHandoff } from '@/components/calculator/MortgageCalculator';

export function SinglePageHub() {
  const [lockedScenario, setLockedScenario] = useState<SelectedScenarioHandoff | null>(
    null
  );
  const [selectedTopic, setSelectedTopic] = useState<string>(
    'Mortgage Strategy & Custom Payment Review'
  );

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <MortgageSection
          onLockScenario={(scenario) => {
            setLockedScenario(scenario);
            setSelectedTopic('Mortgage Strategy & Custom Payment Review');
          }}
        />
        <AdvisorySection
          onSelectTopic={(topic) => {
            setSelectedTopic(topic);
          }}
        />
        <RecruitingSection
          onSelectTopic={(topic) => {
            setSelectedTopic(topic);
          }}
        />
        <AboutSection />
        <ContactSection
          lockedScenario={lockedScenario}
          selectedTopic={selectedTopic}
          onClearScenario={() => setLockedScenario(null)}
        />
      </main>
      <Footer />
    </>
  );
}
