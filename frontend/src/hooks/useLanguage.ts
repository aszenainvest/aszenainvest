import React, { useState, useEffect, createContext, useContext } from 'react';
import trTranslations from '../i18n/tr.json';
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

export type Language = 'tr' | 'en' | 'ar';

type LanguageContextValue = {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
  loading: boolean;
};

const localTranslations = {
  tr: trTranslations,
  en: enTranslations,
  ar: arTranslations,
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const API_URL = "/api"; // Railway URL buraya gelecek

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('tr');
  const [dynamicTranslations, setDynamicTranslations] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTranslations = async (lang: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/content/${lang}`);
      if (response.ok) {
        const data = await response.json();
        setDynamicTranslations(data);
      }
    } catch (error) {
      console.warn("Could not fetch remote translations, using local fallback.", error);
      setDynamicTranslations(null);
    } finally {
      setLoading(false);
    }
  };

  // Detect language and fetch translations
  useEffect(() => {
    const pathname = window.location.pathname;
    let currentLang: Language = 'tr';
    
    if (pathname.startsWith('/tr')) {
      currentLang = 'tr';
    } else if (pathname.startsWith('/en')) {
      currentLang = 'en';
    } else if (pathname.startsWith('/ar')) {
      currentLang = 'ar';
    } else {
      const saved = localStorage.getItem('aszena-language') as Language;
      if (saved === 'tr' || saved === 'en' || saved === 'ar') currentLang = saved;
    }
    
    setLanguage(currentLang);
    fetchTranslations(currentLang);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('aszena-language', lang);
    fetchTranslations(lang);
  };

  const t = (key: string): string => {
    // 1. Try dynamic translations from DB
    if (dynamicTranslations && dynamicTranslations[key]) {
      return dynamicTranslations[key];
    }

    // 2. Fallback to local JSON files (nested search)
    const keys = key.split('.');
    let value: any = localTranslations[language as Language];
    for (const k of keys) {
      value = value?.[k];
    }
    return (typeof value === 'string' ? value : value ?? key) as string;
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, changeLanguage, t, loading } },
    children
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      language: 'tr' as Language,
      changeLanguage: () => {},
      t: (key: string) => key,
      loading: false
    };
  }
  return ctx;
};