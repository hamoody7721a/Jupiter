import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Menu, X, Globe } from 'lucide-react';
import jupiterLogo from '../assets/jupiter-logo.jpeg';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, toggleLang, text } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: text.nav.home, href: '#hero' },
    { name: text.nav.galaxy, href: '#milky-way' },
    { name: text.nav.services, href: '#services' },
    { name: text.nav.contact, href: '#contact' },
  ];

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 z-50 mx-auto transition-all duration-500 flex items-center justify-between px-4 sm:px-6 ${
        isScrolled ? 'top-3 max-w-xl' : 'top-4 max-w-7xl'
      }`}
    >
      {/* اللوغو وزر تغيير اللغة (يظهر بوضوح تام على الموبايل والديسك تॉप) */}
      <div className="flex items-center gap-3">
        <a href="#hero" className="flex items-center py-1 transition-transform hover:scale-105">
          <img src={jupiterLogo} alt="Jupiter Logo" className="h-10 sm:h-14 w-auto object-contain rounded-xl" />
        </a>

        <button
          onClick={toggleLang}
          className="px-3 py-1.5 rounded-full bg-[#070312]/90 border border-purple-500/30 text-purple-200 hover:text-white text-xs font-bold flex items-center gap-1.5 backdrop-blur-md transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-purple-400" />
          <span>{lang === 'ar' ? 'EN' : 'AR'}</span>
        </button>
      </div>

      {/* الروابط للشاشات الكبيرة */}
      <div className={`hidden md:flex items-center gap-1 bg-[#070312]/80 border border-purple-500/30 backdrop-blur-2xl shadow-[0_0_30px_rgba(157,78,221,0.25)] transition-all duration-500 ${
        isScrolled ? 'mx-auto px-4 py-2 rounded-full justify-center' : 'px-6 py-2.5 rounded-full'
      }`}>
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="px-4 py-1.5 text-xs font-semibold text-purple-200/80 hover:text-white hover:bg-purple-500/20 rounded-full transition-all duration-300"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* زر ابدأ مشروعك للديسك توب */}
      <div className="hidden md:flex items-center">
        <a
          href="#contact"
          className="group px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-[0_0_25px_rgba(157,78,221,0.4)] transition-all duration-300 hover:brightness-110 border border-purple-400/40 flex items-center gap-2"
        >
          <Rocket className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
          <span>{text.nav.cta}</span>
        </a>
      </div>

      {/* زر القائمة المنسدلة (Hamburger) للهواتف */}
      <div className="flex items-center md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="p-2.5 rounded-full bg-[#070312]/90 border border-purple-500/30 text-purple-200 hover:text-white transition-colors backdrop-blur-md shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5 text-purple-400" />}
        </button>
      </div>

      {/* قائمة الموبايل المنسدلة */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="absolute top-20 inset-x-4 bg-[#070312]/98 border border-purple-500/40 backdrop-blur-3xl rounded-3xl p-6 shadow-2xl md:hidden z-50 flex flex-col gap-3 text-center"
        >
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="py-3 text-sm font-semibold text-purple-200 hover:text-white hover:bg-purple-500/20 rounded-xl transition-all border border-purple-500/10"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-bold shadow-[0_0_20px_rgba(157,78,221,0.4)] flex items-center justify-center gap-2 border border-purple-400/30"
          >
            <Rocket className="w-4 h-4" />
            <span>{text.nav.cta}</span>
          </a>
        </motion.div>
      )}
    </motion.header>
  );
}