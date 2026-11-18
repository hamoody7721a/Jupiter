import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  const toggleLang = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = {
    ar: {
      nav: { home: 'الرئيسية', galaxy: 'المجرة', services: 'الخدمات', contact: 'اطلب مشروعك', cta: 'ابدأ مشروعك' },
      hero: {
        badge: 'JUPITER SOFTWARE SOLUTIONS',
        titlePart1: 'قوة الابتكار الرقمي في',
        titlePart2: 'أنظمة البرمجيات المتقدمة',
        desc: 'نحول رؤيتك إلى واقع برمجري فائق الأداء، بتصميم سينمائي وهوية بصرية متكاملة تحاكي أعماق الفضاء.',
        startBtn: 'ابدأ مشروعك الآن',
        servicesBtn: 'خدماتنا',
      },
      milkyWay: {
        networkBadge: 'JUPITER GALAXY NETWORK',
        title: 'مدارات الابتكار الرقمي',
        desc: 'نربط بين البرمجيات المتقدمة والتصميم السينمائي لنصنع لك حضوراً رقمياً فريداً يتخطى حدود المألوف.',
        features: [
          { title: 'أداء خارق للسرعة', desc: 'تحسين ملفات الأصول البرمجية وسرعة استجابة تصل لـ 0.1 ثانية.' },
          { title: 'معايير أمان صارمة', desc: 'تطبيق بروتوكولات حماية متقدمة ضد الثغرات وهجمات الاختراق.' },
          { title: 'هندسة نظيفة Clean Code', desc: 'بناء أنظمة قابلة للتوسع والصيانة بسهولة تامة مستقبلاً.' },
          { title: 'تكامل ذكي مع APIs', desc: 'ربط سلس مع خدمات السحاب والبوابات المالية العالمية.' },
        ],
      },
      services: {
        badge: 'JUPITER ORBITAL ECOSYSTEM',
        title: 'خدمات وحلول وكالة Jupiter',
        desc: 'نجمع بين الهندسة البرمجية الدقيقة والتصميم السينمائي لنبني لك حضوراً رقمياً ينافس كبرى الشركات العالمية.',
        customTitle: 'لديك مشروع برمجي معقد؟',
        customDesc: 'نحن جاهزون لدراسة فكرتك وتحويلها إلى بنية برمجية متكاملة وخاصة بك بالكامل.',
        customBtn: 'تحدث معنا الآن',
        list: [
          { title: 'تطوير مواقع React & Vite', category: 'FRONTEND ARCHITECTURE', desc: 'بناء تطبيقات ويب فائقة السرعة، تفاعلية بالكامل، ومصممة بأعلى معايير الأداء لتلبي تطلعات مشاريعك الكبرى.', stats: '0.5s Load Time' },
          { title: 'متاجر ومواقع WordPress', category: 'CMS & E-COMMERCE', desc: 'تأسيس مواقع تعريفية ومتاجر إلكترونية احترافية مخصصة بالكامل لسهولة الإدارة ومضاعفة المبيعات.', stats: '100% Custom' },
          { title: 'تطبيقات موبايل Flutter', category: 'CROSS-PLATFORM', desc: 'تطوير تطبيقات هاتف ذكي لأنظمة أندرويد وآيفون بكود برمجي موحد، أداء جبار، وتصميم واجهات مذهل.', stats: 'iOS & Android' },
          { title: 'أنظمة وبرمجيات C++', category: 'CORE SYSTEMS', desc: 'هندسة خوارزميات وأنظمة برمجية متقدمة وعالية الأداء للمعالجة الدقيقة والبيانات الضخمة.', stats: 'High Performance' },
          { title: 'تصميم هويات Adobe', category: 'BRANDING & UI/UX', desc: 'ابتكار هويات بصرية متكاملة وشعارات ترتقي بصورة علامتك التجارية وتترك انطباعاً لا ينسى.', stats: 'Cinematic Visuals' },
        ]
      },
      contactForm: {
        badge: 'JUPITER TRANSMISSION',
        title: 'أطلق مشروعك معنا في المدار',
        desc: 'املأ التفاصيل أدناه وسيتم تحويلك مباشرة لإرسالها عبر الواتساب.',
        namePlaceholder: 'الاسم الكامل',
        contactPlaceholder: 'رقم الواتساب أو وسيلة التواصل',
        messagePlaceholder: 'اكتب تفاصيل ومواصفات مشروعك هنا...',
        submitBtn: 'إرسال الطلب للواتساب',
        modalTitle: 'تم تجهيز طلبك بنجاح!',
        modalDesc: 'انقر أدناه للانتقال الفوري إلى الواتساب وإرسال تفاصيل مشروعك إلى رقم وكالة Jupiter.',
        modalBtn: 'متابعة إلى الواتساب الآن',
      }
    },
    en: {
      nav: { home: 'Home', galaxy: 'Galaxy', services: 'Services', contact: 'Contact', cta: 'Start Project' },
      hero: {
        badge: 'JUPITER SOFTWARE SOLUTIONS',
        titlePart1: 'The Power of Digital Innovation in',
        titlePart2: 'Advanced Software Systems',
        desc: 'We transform your vision into high-performance software reality with cinematic design and space-themed branding.',
        startBtn: 'Start Your Project',
        servicesBtn: 'Our Services',
      },
      milkyWay: {
        networkBadge: 'JUPITER GALAXY NETWORK',
        title: 'Digital Innovation Orbits',
        desc: 'Connecting advanced software with cinematic design to create a unique digital presence beyond boundaries.',
        features: [
          { title: 'Lightning Fast Performance', desc: 'Optimized code assets and response speeds reaching up to 0.1s.' },
          { title: 'Strict Security Standards', desc: 'Implementing advanced protection protocols against vulnerabilities.' },
          { title: 'Clean Architecture', desc: 'Building scalable and easily maintainable systems for the future.' },
          { title: 'Smart API Integration', desc: 'Seamless connection with cloud services and global payment gateways.' },
        ],
      },
      services: {
        badge: 'JUPITER ORBITAL ECOSYSTEM',
        title: 'Jupiter Agency Services & Solutions',
        desc: 'Combining precise software engineering with cinematic design to build a digital presence rivaling global giants.',
        customTitle: 'Have a complex software project?',
        customDesc: 'We are ready to study your idea and turn it into a fully customized, integrated software structure.',
        customBtn: 'Talk to us now',
        list: [
          { title: 'React & Vite Development', category: 'FRONTEND ARCHITECTURE', desc: 'Building lightning-fast, fully interactive web applications designed for peak performance.', stats: '0.5s Load Time' },
          { title: 'WordPress & E-Commerce', category: 'CMS & E-COMMERCE', desc: 'Establishing professional websites and custom online stores for easy management and doubled sales.', stats: '100% Custom' },
          { title: 'Flutter Mobile Apps', category: 'CROSS-PLATFORM', desc: 'Developing cross-platform mobile apps for Android & iOS with unified code and stunning UI.', stats: 'iOS & Android' },
          { title: 'C++ Systems & Software', category: 'CORE SYSTEMS', desc: 'Engineering advanced, high-performance algorithms and software for precise data processing.', stats: 'High Performance' },
          { title: 'Adobe Brand Design', category: 'BRANDING & UI/UX', desc: 'Creating integrated visual identities and logos that elevate your brand and leave lasting impressions.', stats: 'Cinematic Visuals' },
        ]
      },
      contactForm: {
        badge: 'JUPITER TRANSMISSION',
        title: 'Launch Your Project in Orbit',
        desc: 'Fill out the details below to be redirected directly via WhatsApp.',
        namePlaceholder: 'Full Name',
        contactPlaceholder: 'WhatsApp Number or Contact Info',
        messagePlaceholder: 'Write your project details and specifications here...',
        submitBtn: 'Send Request to WhatsApp',
        modalTitle: 'Your request is ready!',
        modalDesc: 'Click below to instantly transition to WhatsApp and send your project details to Jupiter Agency.',
        modalBtn: 'Continue to WhatsApp',
      }
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, text: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);