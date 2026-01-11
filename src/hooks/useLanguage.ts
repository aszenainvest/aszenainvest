import React, { useState, useEffect, createContext, useContext } from 'react';
import trTranslations from '../i18n/tr.json';
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

export type Language = 'tr' | 'en' | 'ar';

type LanguageContextValue = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  tr: trTranslations,
  en: enTranslations,
  ar: arTranslations,
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('tr');

  // Detect language from URL on mount
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/tr')) {
      setLanguage('tr');
      localStorage.setItem('aszena-language', 'tr');
    } else if (pathname.startsWith('/en')) {
      setLanguage('en');
      localStorage.setItem('aszena-language', 'en');
    } else if (pathname.startsWith('/ar')) {
      setLanguage('ar');
      localStorage.setItem('aszena-language', 'ar');
    } else {
      // Check localStorage or default to Turkish
      const saved = localStorage.getItem('aszena-language') as Language;
      if (saved === 'tr' || saved === 'en' || saved === 'ar') {
        setLanguage(saved);
      }
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('aszena-language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language as Language];
    for (const k of keys) {
      value = value?.[k];
    }
    return (typeof value === 'string' ? value : value ?? key) as string;
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, changeLanguage, t } },
    children
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback to default behavior if provider is missing
    const fallbackT = (key: string): string => {
      const keys = key.split('.');
      let value: any = translations.tr;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    };
    return {
      language: 'tr' as Language,
      changeLanguage: () => {},
      t: fallbackT,
    };
  }
  return ctx;
};