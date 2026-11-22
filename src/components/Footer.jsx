import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Rocket, ArrowUp } from 'lucide-react';

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
                {/* أيقونة Instagram */}
                <a
                  href="https://www.instagram.com/jupi_teragency/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-[#070312] border border-purple-500/30 flex items-center justify-center text-purple-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                {/* أيقونة Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61596905182634"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-[#070312] border border-purple-500/30 flex items-center justify-center text-purple-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>

                {/* أيقونة WhatsApp */}
                <a
                  href="https://wa.me/963987415935"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#070312] border border-purple-500/30 flex items-center justify-center text-purple-300 hover:border-purple-400 hover:text-white hover:shadow-[0_0_15px_rgba(157,78,221,0.4)] transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M20.52 3.48A11.82 11.82 0 0012.07 0C5.49 0 .14 5.35.14 11.93c0 2.1.55 4.15 1.6 5.96L0 24l6.28-1.65a11.9 11.9 0 005.79 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.18-3.58-8.42zm-8.45 18.34h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.73.98 1-3.64-.24-.37a9.86 9.86 0 01-1.51-5.27c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 7c0 5.45-4.44 9.88-9.9 9.88zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
                  </svg>
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