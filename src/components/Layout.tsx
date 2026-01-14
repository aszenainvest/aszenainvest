import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { getRoute } from '../utils/routes';
import Navbar from './Navbar';

// Footer uses white logo
const logoAszena = '/aszena.png';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();

  // Detect language from URL and update context
  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.startsWith('/tr') && language !== 'tr') {
      changeLanguage('tr');
    } else if (pathname.startsWith('/en') && language !== 'en') {
      changeLanguage('en');
    } else if (pathname.startsWith('/ar') && language !== 'ar') {
      changeLanguage('ar');
    }
  }, [location.pathname, language, changeLanguage]);

  // RTL support for Arabic
  const isRTL = language === 'ar';

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: t('nav.home'), key: 'home' },
    { name: t('nav.about'), key: 'about' },
    { name: t('nav.partnerships'), key: 'partnerships' },
    { name: t('nav.completedProjects'), key: 'completedProjects' },
    { name: t('nav.agriculture'), key: 'agriculture' },
    { name: t('nav.projectManagement'), key: 'projectManagement' },
  ];
  const dropdownItems = [
    { name: t('nav.projectDevelopment'), key: 'projectDevelopment' },
    { name: t('nav.lifestyle'), key: 'lifestyle' },
  ];

  const allLinks = [...navItems, ...dropdownItems].map(item => ({
    ...item,
    href: getRoute(language, item.key)
  }));


  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Navbar />

      <main>{children}</main>

      <footer className="bg-gradient-to-br from-primary-deep via-primary to-primary-light text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img src={logoAszena} alt="Aszena Invest Logo" className="w-24 h-24 object-contain" loading="lazy" />
              </div>
              <p className="text-white/90 mb-4 text-lg font-semibold">Trust - Vision - Growth</p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <p className="text-white/90 text-lg font-medium italic text-center">
                  "Actions speak louder than words"
                </p>
                <p className="text-white/70 text-sm text-center mt-1">
                  The mirror is the work, not the words
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.links.about')}</h3>
              <div className="space-y-2">
                {allLinks.map((item) => (
                  <Link key={item.key} to={item.href} className="block text-white/80 hover:text-white transition-all duration-200 hover:translate-x-1">{item.name}</Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contact')}</h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@aszenainvest.hu"
                  className="w-full px-4 py-3 rounded-xl transition-all duration-300 text-left flex items-center space-x-3 bg-white/10 text-white hover:bg-white/20 hover:scale-105 border border-white/20"
                >
                  <span className="text-xl">📧</span>
                  <div>
                    <div className="font-semibold">contact@aszenainvest.hu</div>
                    <div className="text-xs opacity-70">{t('footer.contactDesc')}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">{t('footer.copyright')}</div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;