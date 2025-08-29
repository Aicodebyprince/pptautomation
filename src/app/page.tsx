"use client";

import { useState } from 'react';
import { defaultData } from '@/lib/data';
import type { CMMIData } from '@/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/sections/hero';
import { Agenda } from '@/components/sections/agenda';
import { Scope } from '@/components/sections/scope';
import { PracticeAreas } from '@/components/sections/practice-areas';
import { Approach } from '@/components/sections/approach';
import { Roles } from '@/components/sections/roles';
import { Pocs } from '@/components/sections/pocs';
import { Teams } from '@/components/sections/teams';
import { SuccessFactors } from '@/components/sections/success-factors';
import { Reporting } from '@/components/sections/reporting';
import { Communication } from '@/components/sections/communication';
import { Updates } from '@/components/sections/updates';
import { Escalation } from '@/components/sections/escalation';
import { Delays } from '@/components/sections/delays';
import { NextSteps } from '@/components/sections/next-steps';
import { QA } from '@/components/sections/qa';
import { ThankYou } from '@/components/sections/thank-you';
import { EditForm } from '@/components/edit-form';
import { Download } from '@/components/sections/download';

export default function Home() {
  const [data, setData] = useState<CMMIData>(defaultData);

  const handleUpdate = (newData: CMMIData) => {
    setData(newData);
  };

  const navLinks = [
    { href: '#', label: 'Home' },
    { href: '#agenda', label: 'Agenda' },
    { href: '#scope', label: 'Scope' },
    { href: '#practice-areas', label: 'Practice Areas' },
    { href: '#approach', label: 'Approach' },
    { href: '#roles', label: 'Roles' },
    { href: '#teams', label: 'Teams' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header navLinks={navLinks} />
      <main className="flex-1">
        <Hero data={data} />
        <Agenda />
        <Scope data={data} />
        <PracticeAreas cmmiModel={data.cmmiModel} />
        <Approach data={data} />
        <Roles data={data} />
        <Pocs data={data} />
        <Teams data={data} />
        <SuccessFactors />
        <Reporting data={data} />
        <Communication data={data} />
        <Updates data={data} />
        <Escalation data={data} />
        <Delays />
        <NextSteps data={data} />
        <QA />
        <Download data={data} />
        <ThankYou />
      </main>
      <Footer />
      <EditForm data={data} onUpdate={handleUpdate} />
    </div>
  );
}
