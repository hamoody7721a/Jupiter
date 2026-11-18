"use client";

import { useEffect, useState } from "react";
import { OrbitalHeroSection } from "./ui/orbital-hero-section";
import { Sparkles, Send, ArrowUpRight, CheckCircle2, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

export default function ServicesAndContact() {
  const narrow = useNarrow();
  const [selectedService, setSelectedService] = useState(0);
  const { text } = useLanguage();

  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmWhatsAppSend = () => {
    const phone = "+963987415935";
    const msgText = `مرحباً وكالة Jupiter، لدي مشروع أريد مناقشته:%0a- الاسم: ${formData.name}%0a- للتواصل: ${formData.contact}%0a- التفاصيل: ${formData.message}`;
    window.open(`https://wa.me/${phone}?text=${msgText}`, '_blank');
    setShowModal(false);
  };

  return (
    <section id="services" className="relative w-full bg-[#030008] text-white overflow-hidden select-none">
      <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-[#030008] via-[#030008]/70 to-transparent pointer-events-none z-30" />

      <OrbitalHeroSection scrim={narrow ? "top" : "left"} scrimStrength={narrow ? 0.94 : 0.92}>
        <div className="relative z-20 max-w-7xl mx-auto py-32 px-6 lg:px-20">
          
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-md text-purple-300 text-xs font-bold mb-4 shadow-[0_0_20px_rgba(157,78,221,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{text.services.badge}</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">{text.services.title}</h2>
            <p className="text-purple-200/70 text-base max-w-2xl mx-auto leading-relaxed">
              {text.services.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {text.services.list.map((s, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedService(idx)}
                className={`group relative rounded-3xl p-8 border backdrop-blur-xl transition-all duration-500 cursor-pointer flex flex-col justify-between overflow-hidden ${
                  selectedService === idx 
                    ? 'bg-[#070312]/90 border-purple-500/60 shadow-[0_0_30px_rgba(157,78,221,0.25)] scale-[1.02]' 
                    : 'bg-[#070312]/50 border-purple-500/20 hover:border-purple-400/40 hover:bg-[#070312]/80'
                }`}
              >
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono tracking-wider text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
                      {s.stats}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.2em] text-purple-400/80 uppercase block mb-1">{s.category}</span>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">{s.title}</h3>
                  <p className="text-purple-200/70 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}

            <div className="rounded-3xl bg-gradient-to-tr from-purple-600/20 via-indigo-600/10 to-transparent border border-purple-500/30 p-8 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-purple-300 uppercase block mb-2">CUSTOM SOLUTIONS</span>
                <h3 className="text-2xl font-bold mb-3 text-white">{text.services.customTitle}</h3>
                <p className="text-purple-200/80 text-sm leading-relaxed">{text.services.customDesc}</p>
              </div>
              <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-purple-300 hover:underline">
                <span>{text.services.customBtn}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div id="contact" className="max-w-4xl mx-auto rounded-3xl bg-[#070312]/90 border border-purple-500/30 backdrop-blur-2xl p-8 sm:p-14 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-[0.2em] text-purple-400 uppercase">{text.contactForm.badge}</span>
              <h3 className="text-3xl sm:text-4xl font-black mt-2 text-white">{text.contactForm.title}</h3>
              <p className="text-purple-200/70 text-sm mt-2">{text.contactForm.desc}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  required 
                  type="text" 
                  placeholder={text.contactForm.namePlaceholder} 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-purple-500/30 text-white text-sm focus:border-purple-400 focus:outline-none transition-colors" 
                />
                <input 
                  required 
                  type="text" 
                  placeholder={text.contactForm.contactPlaceholder} 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-purple-500/30 text-white text-sm focus:border-purple-400 focus:outline-none transition-colors" 
                />
              </div>

              <textarea 
                required 
                rows="4" 
                placeholder={text.contactForm.messagePlaceholder} 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl bg-black/60 border border-purple-500/30 text-white text-sm focus:border-purple-400 focus:outline-none transition-colors"
              ></textarea>

              <button type="submit" className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 font-black text-white flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(157,78,221,0.4)] transition-all text-base border border-purple-400/40">
                <span>{text.contactForm.submitBtn}</span>
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

        </div>
      </OrbitalHeroSection>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-[#090415] border border-purple-500/50 p-8 text-center shadow-[0_0_50px_rgba(157,78,221,0.4)]">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-purple-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(157,78,221,0.4)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-white mb-2">{text.contactForm.modalTitle}</h3>
            <p className="text-purple-200/70 text-sm mb-8 leading-relaxed">
              {text.contactForm.modalDesc}
            </p>

            <button 
              onClick={confirmWhatsAppSend}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:brightness-110 font-bold text-white flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all text-sm"
            >
              <span>{text.contactForm.modalBtn}</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}