import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { getRoute } from '../utils/routes';
import trTranslations from '../i18n/tr.json';
import enTranslations from '../i18n/en.json';
import arTranslations from '../i18n/ar.json';

const translations = {
  tr: trTranslations,
  en: enTranslations,
  ar: arTranslations,
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url,
  type = 'website',
  structuredData
}) => {
  const { language, t } = useLanguage();
  
  // Get SEO data from i18n based on current route
  const getSEOData = () => {
    const pathname = window.location.pathname;
    let seoKey = 'home';
    
    if (pathname.includes('/hakkimizda') || pathname.includes('/about')) {
      seoKey = 'about';
    } else if (pathname.includes('/proje-gelistirme') || pathname.includes('/project-development')) {
      seoKey = 'projectDevelopment';
    } else if (pathname.includes('/proje-yonetimi') || pathname.includes('/project-management')) {
      seoKey = 'projectManagement';
    } else if (pathname.includes('/ortak-girisim') || pathname.includes('/partnerships')) {
      seoKey = 'partnerships';
    } else if (pathname.includes('/tamamlanan-projeler') || pathname.includes('/completed-projects')) {
      seoKey = 'completedProjects';
    } else if (pathname.includes('/tarim') || pathname.includes('/agriculture')) {
      seoKey = 'agriculture';
    } else if (pathname.includes('/yasam-tarzi') || pathname.includes('/lifestyle')) {
      seoKey = 'lifestyle';
    } else if (pathname.includes('/iletisim') || pathname.includes('/contact')) {
      seoKey = 'contact';
    }
    
    try {
      const langTranslations = translations[language as keyof typeof translations] as any;
      const seoData = langTranslations?.seo?.[seoKey];
      if (seoData && typeof seoData === 'object') {
        return {
          title: seoData.title || 'Aszena Invest - Trust - Vision - Growth',
          description: seoData.description || t('hero.subtitle'),
          keywords: seoData.keywords || 'Aszena Invest, Budapest, real estate, investment'
        };
      }
    } catch (e) {
      // Fallback if translation key doesn't exist
    }
    
    return {
      title: 'Aszena Invest - Trust - Vision - Growth',
      description: t('hero.subtitle'),
      keywords: 'Aszena Invest, Budapest, real estate, investment, project development, project management, Hungary, Croatia, Turkey, Middle East, joint ventures, partnerships, agriculture, lifestyle investments, Petrus 2017 Sailing Club, Olive Island Marina'
    };
  };
  
  const seoData = getSEOData();
  const defaultTitle = seoData.title;
  const defaultDescription = seoData.description;
  const defaultKeywords = seoData.keywords;
  
  const currentTitle = title || defaultTitle;
  const currentDescription = description || defaultDescription;
  const currentKeywords = keywords || defaultKeywords;
  const currentUrl = url || window.location.href;
  const htmlLang = language === 'tr' ? 'tr' : language === 'ar' ? 'ar' : 'en';
  const ogLocale = language === 'tr' ? 'tr_TR' : language === 'ar' ? 'ar_SA' : 'en_US';
  
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aszena Invest",
    "alternateName": "Aszena Investment Budapest",
    "url": "https://www.aszenainvest.hu",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.aszenainvest.hu/aszena.png",
      "width": "250",
      "height": "60"
    },
    "image": "https://www.aszenainvest.hu/og-image.jpg",
    "description": currentDescription,
    "foundingDate": "2010",
    "founder": {
      "@type": "Person",
      "name": "Aszena Invest Founders"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Budapest",
      "addressRegion": "Budapest",
      "addressCountry": "HU",
      "postalCode": "1051"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "47.4979",
      "longitude": "19.0402"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+36-1-XXX-XXXX",
        "contactType": "customer service",
        "email": "contact@aszenainvest.hu",
        "availableLanguage": ["Turkish", "English", "Arabic"],
        "areaServed": ["HU", "TR", "HR", "GR", "AE"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "contact@aszenainvest.hu",
        "availableLanguage": ["Turkish", "English", "Arabic"]
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/aszena-invest",
      "https://facebook.com/aszenainvest",
      "https://www.aszenainvest.hu"
    ],
    "slogan": "Trust - Vision - Growth",
    "knowsAbout": [
      "Real Estate Investment",
      "Project Development",
      "Project Management",
      "Property Acquisition",
      "Hotel Development",
      "Commercial Real Estate",
      "Residential Development",
      "Agriculture Investment",
      "Lifestyle Investments"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Hungary"
      },
      {
        "@type": "Country",
        "name": "Turkey"
      },
      {
        "@type": "Country",
        "name": "Croatia"
      },
      {
        "@type": "Country",
        "name": "Greece"
      },
      {
        "@type": "Country",
        "name": "United Arab Emirates"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Real Estate Investment Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Project Development",
            "description": "Comprehensive real estate project development services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Project Management",
            "description": "Full-scale project management from acquisition to completion"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Joint Ventures",
            "description": "Strategic partnerships and joint venture opportunities"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{currentTitle}</title>
      <meta name="description" content={currentDescription} />
      <meta name="keywords" content={currentKeywords} />
      <meta name="author" content="Aszena Invest" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={htmlLang} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={currentTitle} />
      <meta property="og:description" content={currentDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Aszena Invest" />
      <meta property="og:locale" content={ogLocale} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentTitle} />
      <meta name="twitter:description" content={currentDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#24248A" />
      <meta name="msapplication-TileColor" content="#24248A" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="HU-BU" />
      <meta name="geo.placename" content="Budapest" />
      <meta name="geo.position" content="47.4979;19.0402" />
      <meta name="ICBM" content="47.4979, 19.0402" />
      
      {/* Business Meta Tags */}
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      <meta name="revisit-after" content="7 days" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate Language Links */}
      {(() => {
        const pathname = window.location.pathname;
        let routeKey = 'home';
        
        if (pathname.includes('/hakkimizda') || pathname.includes('/about')) {
          routeKey = 'about';
        } else if (pathname.includes('/proje-gelistirme') || pathname.includes('/project-development')) {
          routeKey = 'projectDevelopment';
        } else if (pathname.includes('/proje-yonetimi') || pathname.includes('/project-management')) {
          routeKey = 'projectManagement';
        } else if (pathname.includes('/ortak-girisim') || pathname.includes('/partnerships')) {
          routeKey = 'partnerships';
        } else if (pathname.includes('/tamamlanan-projeler') || pathname.includes('/completed-projects')) {
          routeKey = 'completedProjects';
        } else if (pathname.includes('/tarim') || pathname.includes('/agriculture')) {
          routeKey = 'agriculture';
        } else if (pathname.includes('/yasam-tarzi') || pathname.includes('/lifestyle')) {
          routeKey = 'lifestyle';
        } else if (pathname.includes('/iletisim') || pathname.includes('/contact')) {
          routeKey = 'contact';
        }
        
        const trUrl = `https://www.aszenainvest.hu${getRoute('tr', routeKey)}`;
        const enUrl = `https://www.aszenainvest.hu${getRoute('en', routeKey)}`;
        const arUrl = `https://www.aszenainvest.hu${getRoute('ar', routeKey)}`;
        
        return (
          <>
            <link rel="alternate" hrefLang="tr" href={trUrl} />
            <link rel="alternate" hrefLang="en" href={enUrl} />
            <link rel="alternate" hrefLang="ar" href={arUrl} />
            <link rel="alternate" hrefLang="x-default" href={trUrl} />
          </>
        );
      })()}
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || baseStructuredData)}
      </script>
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEO;
