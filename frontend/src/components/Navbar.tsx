
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getRoute, getRouteKeyFromPath } from '../utils/routes';
import { Button } from './ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from './ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';


const Navbar = () => {
    const { language, changeLanguage, t } = useLanguage();
    const logoAszena = t('nav.logo') || '/aszena.png';
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActiveRoute = (href: string) => location.pathname === href;

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

    const allNavigation = [
        ...navItems.map(item => ({ ...item, href: getRoute(language, item.key) })),
        ...dropdownItems.map(item => ({ ...item, href: getRoute(language, item.key) }))
    ];

    const handleLanguageChange = (lang: 'tr' | 'en' | 'ar') => {
        const routeKey = getRouteKeyFromPath(location.pathname);
        changeLanguage(lang);
        navigate(getRoute(lang, routeKey), { replace: true });
    };

    const LanguageSelector = ({ mobile = false }) => (
        <div className={`flex items-center gap-2 ${mobile ? 'w-full justify-center mt-6' : ''}`}>
            {(['tr', 'en', 'ar'] as const).map((lang) => (
                <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`
            px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300
            ${language === lang
                            ? 'bg-primary text-primary-foreground shadow-md transform scale-105'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                        }
          `}
                >
                    {lang === 'tr' ? 'TR' : lang === 'en' ? 'EN' : 'AR'}
                </button>
            ))}
        </div>
    );

    return (
        <header
            className={`
        sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border/50' : 'bg-background/50 backdrop-blur-sm border-transparent'}
      `}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        to={getRoute(language, 'home')}
                        className="flex-shrink-0 transition-transform duration-300 hover:scale-105"
                    >
                        <img
                            src={logoAszena}
                            alt="Aszena Invest"
                            className={`object-contain transition-all duration-300 ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navItems.map((item) => {
                            const href = getRoute(language, item.key);
                            const active = isActiveRoute(href);
                            return (
                                <Link
                                    key={item.key}
                                    to={href}
                                    className={`
                    relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                    text-foreground/80 hover:text-primary hover:bg-muted/50
                    ${active ? 'text-primary bg-primary/5 font-semibold' : ''}
                  `}
                                >
                                    {item.name}
                                    {active && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
                                    )}
                                </Link>
                            );
                        })}

                        {/* More Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-foreground/80 hover:text-primary font-medium ml-1"
                                >
                                    {t('nav.other')} <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 overflow-hidden rounded-xl border-primary/10 shadow-lg">
                                {dropdownItems.map((item) => {
                                    const href = getRoute(language, item.key);
                                    const active = isActiveRoute(href);
                                    return (
                                        <DropdownMenuItem key={item.key} asChild>
                                            <Link
                                                to={href}
                                                className={`
                          cursor-pointer flex items-center gap-2 px-3 py-2.5
                          ${active ? 'text-primary bg-primary/5 font-medium' : 'text-foreground/80'}
                        `}
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
                                                {item.name}
                                            </Link>
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="ml-4 pl-4 border-l border-border/50">
                            <LanguageSelector />
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted/50">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-primary/10">
                                <SheetHeader className="text-left border-b border-border/50 pb-4 mb-4">
                                    <SheetTitle>
                                        <img src={logoAszena} alt="Aszena" className="h-10 object-contain" />
                                    </SheetTitle>
                                </SheetHeader>

                                <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-180px)] py-2">
                                    {allNavigation.map((item) => {
                                        const active = isActiveRoute(item.href);
                                        return (
                                            <SheetClose key={item.key} asChild>
                                                <Link
                                                    to={item.href}
                                                    className={`
                            group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200
                            ${active
                                                            ? 'bg-primary/5 text-primary font-semibold shadow-sm border border-primary/10'
                                                            : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                                                        }
                          `}
                                                >
                                                    <span className="text-base">{item.name}</span>
                                                    {active && <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-sm" />}
                                                </Link>
                                            </SheetClose>
                                        );
                                    })}
                                </div>

                                <div className="mt-auto pt-6 border-t border-border/50">
                                    <p className="text-xs text-center text-muted-foreground mb-3 font-medium uppercase tracking-wider text-[10px]">Language</p>
                                    <LanguageSelector mobile />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
