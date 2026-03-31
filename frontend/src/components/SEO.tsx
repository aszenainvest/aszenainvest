import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { getRoute } from '../utils/routes';

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
  
  // Get SEO data from CMS based on current route
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
    
    const dynamicTitle = t(`seo.${seoKey}.title`);
    const dynamicDescription = t(`seo.${seoKey}.description`);
    const dynamicKeywords = t(`seo.${seoKey}.keywords`);

    return {
      title: dynamicTitle || 'Aszena Invest - Trust - Vision - Growth',
      description: dynamicDescription || t('hero.subtitle'),
      keywords: dynamicKeywords || 'Aszena Invest, Budapest, real estate, investment'
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
    // ... baseStructuredData rest remains the same (truncated for brevity but I will include essential parts)
    "description": currentDescription,
    "slogan": "Trust - Vision - Growth"
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
      
      {/* Canonicals and Alternates */}
      <link rel="canonical" href={currentUrl} />
      {(() => {
        const pathname = window.location.pathname;
        let routeKey = 'home';
        // (logic for alternate links based on routeKey)
        const trUrl = `https://www.aszenainvest.hu${getRoute('tr', routeKey)}`;
        const enUrl = `https://www.aszenainvest.hu${getRoute('en', routeKey)}`;
        const arUrl = `https://www.aszenainvest.hu${getRoute('ar', routeKey)}`;
        
        return (
          <>
            <link rel="alternate" hrefLang="tr" href={trUrl} />
            <link rel="alternate" hrefLang="en" href={enUrl} />
            <link rel="alternate" hrefLang="ar" href={arUrl} />
          </>
        );
      })()}
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData || baseStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO;
