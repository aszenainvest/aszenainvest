import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Building2, Mail, ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { Button } from './ui/button';
import { getRoute, getRouteKeyFromPath } from '../utils/routes';
// Header uses main logo; Footer uses white logo
const logoAszena = '/aszena.png';
const logoNoBackground = '/logo-white.svg';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

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

  // Get navigation items with language-prefixed URLs
  const getNavItems = () => {
    const baseItems = [
      { name: t('nav.home'), key: 'home' },
      { name: t('nav.about'), key: 'about' },
      { name: t('nav.partnerships'), key: 'partnerships' },
      { name: t('nav.completedProjects'), key: 'completedProjects' },
      { name: t('nav.agriculture'), key: 'agriculture' },
      { name: t('nav.projectManagement'), key: 'projectManagement' },
    ];
    return baseItems.map(item => ({
      ...item,
      href: getRoute(language, item.key),
    }));
  };

  const getDropdownItems = () => {
    const baseItems = [
      { name: t('nav.projectDevelopment'), key: 'projectDevelopment' },
      { name: t('nav.lifestyle'), key: 'lifestyle' },
    ];
    return baseItems.map(item => ({
      ...item,
      href: getRoute(language, item.key),
    }));
  };

  const mainNavigation = getNavItems();
  const dropdownItems = getDropdownItems();

  const allNavigation = [...mainNavigation, ...dropdownItems];

  const isActiveRoute = (href: string) => location.pathname === href;

  // Close dropdown when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element;
    if (!target.closest('.dropdown-container')) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener for clicking outside dropdown
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);

  // Scroll to top when location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm p-2">
        <div className="w-full px-6 sm:px-8 lg:px-24">
          <div className="flex justify-between items-center h-16 gap-4">
            <Link to={getRoute(language, 'home')} className="flex items-center">
              <img src={logoAszena} alt="Aszena Invest Logo" className="w-16 h-16 object-contain" loading="lazy" />
            </Link>

            {/* Desktop Navigation - with dropdown */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 overflow-visible whitespace-nowrap max-w-[60vw] lg:max-w-none">
              {mainNavigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`${
                    isActiveRoute(item.href)
                      ? 'nav-link-active bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent font-semibold'
                      : 'nav-link hover:text-primary'
                  } transition-all duration-200 text-sm lg:text-base px-2 py-1 rounded hover:bg-muted/50 truncate max-w-[100px] lg:max-w-none`}
                  title={item.name}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Dropdown Menu - Beautiful */}
              <div className="relative inline-block dropdown-container">
                <button
                  type="button"
                  onClick={() => {
                    console.log('Dropdown button clicked, current state:', isDropdownOpen);
                    console.log('Dropdown items:', dropdownItems);
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className={`flex items-center space-x-1 text-sm lg:text-base px-3 py-1.5 rounded-lg transition-all duration-200 ${
                    isDropdownOpen 
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg' 
                      : 'bg-muted/50 text-foreground hover:bg-muted hover:text-primary'
                  }`}
                >
                  <span>{t('nav.other')}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white/95 backdrop-blur-sm border-2 border-primary/20 rounded-xl shadow-2xl z-[99999] overflow-hidden">
                    <div className="p-2">
                      {dropdownItems.map((item, index) => (
                        <Link
                          key={item.key}
                          to={item.href}
                          className={`flex items-center px-4 py-3 text-sm transition-all duration-200 rounded-lg mx-1 mb-1 ${
                            isActiveRoute(item.href)
                              ? 'bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium shadow-sm'
                              : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-primary'
                          }`}
                          onClick={() => {
                            console.log('Dropdown link clicked:', item.href, item.name);
                            setIsDropdownOpen(false);
                          }}
                        >
                          <div className="w-2 h-2 rounded-full bg-primary/30 mr-3 flex-shrink-0"></div>
                          <span className="truncate">{item.name}</span>
                          {isActiveRoute(item.href) && (
                            <div className="ml-auto w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center bg-muted/30 rounded-lg p-1 backdrop-blur-sm border border-white/20 shadow-sm">
                <button 
                  onClick={() => {
                    const routeKey = getRouteKeyFromPath(location.pathname);
                    changeLanguage('tr');
                    navigate(getRoute('tr', routeKey), { replace: true });
                  }} 
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                    language === 'tr' 
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg transform scale-105' 
                      : 'text-muted-foreground hover:text-primary hover:bg-white/50'
                  }`}
                >
                  <span className="text-xs">🇹🇷</span>
                  <span>TR</span>
                </button>
                <button 
                  onClick={() => {
                    const routeKey = getRouteKeyFromPath(location.pathname);
                    changeLanguage('en');
                    navigate(getRoute('en', routeKey), { replace: true });
                  }} 
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                    language === 'en' 
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg transform scale-105' 
                      : 'text-muted-foreground hover:text-primary hover:bg-white/50'
                  }`}
                >
                  <span className="text-xs">🇬🇧</span>
                  <span>EN</span>
                </button>
                <button 
                  onClick={() => {
                    const routeKey = getRouteKeyFromPath(location.pathname);
                    changeLanguage('ar');
                    navigate(getRoute('ar', routeKey), { replace: true });
                  }} 
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                    language === 'ar' 
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg transform scale-105' 
                      : 'text-muted-foreground hover:text-primary hover:bg-white/50'
                  }`}
                >
                  <span className="text-xs">🇸🇦</span>
                  <span>AR</span>
                </button>
              </div>

            </div>

            {/* Mobile menu button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border shadow-lg">
            <div className="px-4 py-4 space-y-3">
              {allNavigation.map((item) => (
                <Link 
                  key={item.key} 
                  to={item.href} 
                  className={`block py-3 px-4 rounded-lg ${isActiveRoute(item.href) ? 'nav-link-active bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20' : 'nav-link hover:bg-muted'}`} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-2 pt-2">
                <div className="flex items-center bg-muted/30 rounded-lg p-1 backdrop-blur-sm border border-white/20 shadow-sm">
                  <button 
                    onClick={() => {
                      const routeKey = getRouteKeyFromPath(location.pathname);
                      changeLanguage('tr');
                      navigate(getRoute('tr', routeKey), { replace: true });
                    }} 
                    className={`px-2 py-2 rounded-md text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                      language === 'tr' 
                        ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg transform scale-105' 
                        : 'text-muted-foreground hover:text-primary hover:bg-white/50'
                    }`}
                  >
                    <span className="text-xs">🇹🇷</span>
                    <span>TR</span>
                  </button>
                  <button 
                    onClick={() => {
                      const routeKey = getRouteKeyFromPath(location.pathname);
                      changeLanguage('en');
                      navigate(getRoute('en', routeKey), { replace: true });
                    }} 
                    className={`px-2 py-2 rounded-md text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                      language === 'en' 
                        ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg transform scale-105' 
                        : 'text-muted-foreground hover:text-primary hover:bg-white/50'
                    }`}
                  >
                    <span className="text-xs">🇬🇧</span>
                    <span>EN</span>
                  </button>
                  <button 
                    onClick={() => {
                      const routeKey = getRouteKeyFromPath(location.pathname);
                      changeLanguage('ar');
                      navigate(getRoute('ar', routeKey), { replace: true });
                    }} 
                    className={`px-2 py-2 rounded-md text-xs font-medium transition-all duration-300 flex items-center space-x-1 ${
                      language === 'ar' 
                        ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-lg transform scale-105' 
                        : 'text-muted-foreground hover:text-primary hover:bg-white/50'
                    }`}
                  >
                    <span className="text-xs">🇸🇦</span>
                    <span>AR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="bg-gradient-to-br from-primary-deep via-primary to-primary-light text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <img src={logoNoBackground} alt="Aszena Invest Logo" className="w-24 h-24 object-contain" loading="lazy" />
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
                {allNavigation.map((item) => (
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