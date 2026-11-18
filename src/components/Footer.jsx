import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { lang, text } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#030008] border-t border-purple-500/20 text-white pt-16 pb-10 overflow-hidden select-none z-20">
      {/* إضاءة خلفية نيون خفيفة */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* العمود الأول: الهوية والنبذة */}
          <div className="md:col-span-2 space-y-4">
            <a href="#hero" className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(157,78,221,0.4)] border border-purple-400/30">
                <Rocket className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-300" />
              </div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-purple-200 to-indigo-400 bg-clip-text text-transparent">
                JUPITER
              </span>
            </a>
            <p className="text-purple-200/70 text-sm max-w-md leading-relaxed">
              {text?.hero?.desc}
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300 mb-4">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-sm text-purple-200/70">
              <li><a href="#hero" className="hover:text-white transition-colors">{text?.nav?.home}</a></li>
              <li><a href="#milky-way" className="hover:text-white transition-colors">{text?.nav?.galaxy}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{text?.nav?.services}</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">{text?.nav?.contact}</a></li>
            </ul>
          </div>

          {/* العمود الثالث: تواصل والعودة للأعلى */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300 mb-4">
                {lang === 'ar' ? 'تواصل معنا' : 'Connect'}
              </h4>
              <div className="flex items-center gap-3">
                {/* أيقونة GitHub */}
                <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full bg-[#070312] border border-purple-500/30 flex items-center justify-center text-purple-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                {/* أيقونة LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-[#070312] border border-purple-500/30 flex items-center justify-center text-purple-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                {/* أيقونة التواصل */}
                <a href="#contact" aria-label="Contact" className="w-10 h-10 rounded-full bg-[#070312] border border-purple-500/30 flex items-center justify-center text-purple-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* زر الصعود للأعلى */}
            <button
              onClick={scrollToTop}
              className="mt-6 self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-xs font-semibold text-purple-200 hover:text-white transition-all cursor-pointer"
            >
              <span>{lang === 'ar' ? 'العودة للأعلى' : 'Back to Top'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* الشريط السفلي لحقوق النشر */}
        <div className="pt-8 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/60 gap-4">
          <p>© {new Date().getFullYear()} Jupiter Software Solutions. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-1.5">
            <span>{lang === 'ar' ? 'صُمم بشغف في المدار' : 'Crafted with passion in orbit'}</span>
            <Rocket className="w-3.5 h-3.5 text-purple-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}