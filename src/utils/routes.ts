// URL mapping for different languages
export const routeMap: Record<string, Record<string, string>> = {
  tr: {
    home: '/tr',
    about: '/tr/hakkimizda',
    projectDevelopment: '/tr/proje-gelistirme',
    projectManagement: '/tr/proje-yonetimi',
    partnerships: '/tr/ortak-girisim-isbirlikleri',
    completedProjects: '/tr/tamamlanan-projeler',
    agriculture: '/tr/tarim',
    lifestyle: '/tr/yasam-tarzi',
    contact: '/tr/iletisim',
  },
  en: {
    home: '/en',
    about: '/en/about',
    projectDevelopment: '/en/project-development',
    projectManagement: '/en/project-management',
    partnerships: '/en/partnerships',
    completedProjects: '/en/completed-projects',
    agriculture: '/en/agriculture',
    lifestyle: '/en/lifestyle',
    contact: '/en/contact',
  },
  ar: {
    home: '/ar',
    about: '/ar/hakkimizda',
    projectDevelopment: '/ar/proje-gelistirme',
    projectManagement: '/ar/proje-yonetimi',
    partnerships: '/ar/ortak-girisim-isbirlikleri',
    completedProjects: '/ar/tamamlanan-projeler',
    agriculture: '/ar/tarim',
    lifestyle: '/ar/yasam-tarzi',
    contact: '/ar/iletisim',
  },
};

// Reverse mapping: from URL to route key
export const urlToRouteKey: Record<string, string> = {
  // Turkish
  '/tr': 'home',
  '/tr/hakkimizda': 'about',
  '/tr/proje-gelistirme': 'projectDevelopment',
  '/tr/proje-yonetimi': 'projectManagement',
  '/tr/ortak-girisim-isbirlikleri': 'partnerships',
  '/tr/tamamlanan-projeler': 'completedProjects',
  '/tr/tarim': 'agriculture',
  '/tr/yasam-tarzi': 'lifestyle',
  '/tr/iletisim': 'contact',
  // English
  '/en': 'home',
  '/en/about': 'about',
  '/en/project-development': 'projectDevelopment',
  '/en/project-management': 'projectManagement',
  '/en/partnerships': 'partnerships',
  '/en/completed-projects': 'completedProjects',
  '/en/agriculture': 'agriculture',
  '/en/lifestyle': 'lifestyle',
  '/en/contact': 'contact',
  // Arabic
  '/ar': 'home',
  '/ar/hakkimizda': 'about',
  '/ar/proje-gelistirme': 'projectDevelopment',
  '/ar/proje-yonetimi': 'projectManagement',
  '/ar/ortak-girisim-isbirlikleri': 'partnerships',
  '/ar/tamamlanan-projeler': 'completedProjects',
  '/ar/tarim': 'agriculture',
  '/ar/yasam-tarzi': 'lifestyle',
  '/ar/iletisim': 'contact',
  // Legacy routes (redirect to Turkish)
  '/': 'home',
  '/hakkimizda': 'about',
  '/proje-gelistirme': 'projectDevelopment',
  '/proje-yonetimi': 'projectManagement',
  '/ortak-girisim-isbirlikleri': 'partnerships',
  '/tamamlanan-projeler': 'completedProjects',
  '/tarim': 'agriculture',
  '/yasam-tarzi': 'lifestyle',
  '/iletisim': 'contact',
};

// Get route for a specific language
export const getRoute = (lang: 'tr' | 'en' | 'ar', routeKey: string): string => {
  return routeMap[lang]?.[routeKey] || routeMap.tr[routeKey] || '/tr';
};

// Get current route key from pathname
export const getRouteKeyFromPath = (pathname: string): string => {
  return urlToRouteKey[pathname] || 'home';
};

