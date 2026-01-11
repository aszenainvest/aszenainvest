import { useLanguage } from '../hooks/useLanguage';
import { Link } from 'react-router-dom';
import {
  Building2,
  Target,
  ArrowRight,
  Globe,
  Award,
  TrendingUp,
  Ruler,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import SEO from '../components/SEO';
import heroBudapest from '../assets/hero-budapest.jpg';

const Home = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Ruler, number: '+200.000 m²', label: t('stats.projectDevelopment') },
    { icon: Building2, number: '+300 mn €', label: t('stats.projectValue') }
  ];

  return (
    <div>
      <SEO 
        title="Aszena Invest - Budapest Real Estate Investment | Trust - Vision - Growth"
        description="Budapest-based real estate investment company with 30+ years of experience. Specializing in project development, management, and strategic partnerships across Hungary, Croatia, Greece, and Turkey."
        keywords="Aszena Invest, Budapest real estate, Hungary investment, project development, project management, real estate Budapest, property investment Hungary, hotel development, commercial real estate, joint ventures, Matild Palace, off-market properties"
        url="https://www.aszenainvest.hu"
      />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBudapest})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col justify-between min-h-[75vh]">
            {/* Enhanced Glass Card Content - Left Side */}
            <div className="w-full flex justify-start mb-10 pt-8 mt-auto order-2">
              <div className="backdrop-blur-sm bg-white/20 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 xl:p-6 shadow-2xl animate-fade-in w-full max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl hover:bg-white/15 transition-all duration-500 ml-2 md:ml-6 lg:ml-12 xl:ml-16">

                <h1 className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold text-white leading-tight mb-2 md:mb-3 lg:mb-4 bg-gradient-to-r from-white via-white/95 to-white/90 bg-clip-text text-transparent drop-shadow-lg">{t('hero.title')}</h1>
                <p className="text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-white/90 leading-relaxed mb-3 md:mb-4 lg:mb-5 font-medium drop-shadow-md">{t('hero.subtitle')}</p>
                <div className="mt-2 md:mt-3">
                  <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                    <Link to="/hakkimizda">
                      <Button className="btn-primary text-xs md:text-sm lg:text-base xl:text-lg px-3 md:px-4 lg:px-5 py-1.5 md:py-2 lg:py-2.5 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:bg-primary-deep">
                        {t('common.learnMore')}
                        <ArrowRight className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 ml-1 md:ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Refined Hero Stats - Top Right Row */}
            <div className="animate-slide-up order-0" style={{ animationDelay: '0.15s' }}>
              <div className="flex justify-start pr-2 md:pr-6 lg:pr-12 xl:pr-16 pt-4 md:pt-5 lg:pt-6">
                <div className="flex gap-2 md:gap-3 lg:gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="backdrop-blur-sm bg-white/15 border border-white/20 rounded-lg md:rounded-xl px-3 md:px-4 lg:px-5 py-2 md:py-2.5 lg:py-3 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
                      <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1">
                        <stat.icon className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 text-white" />
                        <span className="text-xs md:text-sm lg:text-base font-bold text-white">{stat.number}</span>
                      </div>
                      <div className="text-[10px] md:text-xs lg:text-sm text-white/90 font-semibold whitespace-nowrap">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Enhanced Achievements Section */}
      <section className="content-section bg-gradient-to-br from-primary/15 via-muted/40 to-accent/15 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.15'%3E%3Cpath d='M50 50c0-27.614 22.386-50 50-50v100c-27.614 0-50-22.386-50-50zm0 0c0 27.614-22.386 50-50 50V0c27.614 0 50 22.386 50 50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-16 left-8 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-32 right-16 w-20 h-20 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-16 left-1/3 w-28 h-28 bg-gradient-to-br from-primary/8 to-accent/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-accent/12 to-primary/12 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full px-8 py-3 mb-8 border-2 border-primary/30 shadow-lg">
              <Award className="w-6 h-6 text-primary" />
              <span className="text-primary font-bold text-base">{t('achievements.title')}</span>
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent leading-tight px-4 pb-8">{t('achievements.title')}</h2>
            <div className="max-w-3xl mx-auto px-4">
              <p className="section-subtitle text-lg md:text-xl text-muted-foreground font-medium leading-relaxed bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
                {t('achievements.subtitle')}
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-foreground mb-16 animate-slide-up">
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 shadow-xl">
              <p className="text-lg md:text-xl leading-relaxed mb-6 text-center font-medium text-foreground">
                {t('achievements.description')}
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-center text-muted-foreground">
                {t('achievements.description2')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-white/95 via-white/98 to-gray-50/95 backdrop-blur-md border-2 border-primary/30 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:scale-105 hover:-translate-y-3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="p-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 w-fit mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Building2 className="w-14 h-14 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-6 group-hover:text-primary-deep transition-colors duration-300">+300mn €</div>
                <div className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{t('achievements.stats.realEstate')}</div>
              </div>
            </div>

            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-white/95 via-white/98 to-gray-50/95 backdrop-blur-md border-2 border-accent/30 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:scale-105 hover:-translate-y-3 relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="p-8 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 w-fit mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <Ruler className="w-14 h-14 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-accent mb-6 group-hover:text-accent-deep transition-colors duration-300">+200.000 m²</div>
                <div className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors duration-300">{t('achievements.stats.projectDevelopment')}</div>
              </div>
            </div>

            <div className="group text-center p-10 rounded-3xl bg-gradient-to-br from-white/95 via-white/98 to-gray-50/95 backdrop-blur-md border-2 border-primary/30 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:scale-105 hover:-translate-y-3 relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="p-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 w-fit mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  <TrendingUp className="w-14 h-14 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-6 group-hover:text-primary-deep transition-colors duration-300">+350 mn €</div>
                <div className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{t('achievements.stats.projectManagement')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
