import React from 'react';
import Navbar from './components/Navbar';
import JupiterHero from './components/JupiterHero';
import MilkyWaySection from './components/MilkyWaySection';
import ServicesAndContact from './components/ServicesAndContact';
import Footer from './components/Footer';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { lang } = useLanguage();

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#030008] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      <Navbar />
      <main className="relative block">
        <JupiterHero />
        <MilkyWaySection />
        <ServicesAndContact />
      </main>
      <Footer />
    </div>
  );
}