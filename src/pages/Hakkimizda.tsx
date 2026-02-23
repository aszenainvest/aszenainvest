import { useLanguage } from '../hooks/useLanguage';
import { Building2, MapPin, Calendar, Trophy, Award } from 'lucide-react';
import SEO from '../components/SEO';
import budapestSkyline from '../assets/budapest.jpg';
import investmentBuilding from '../assets/investment-building.jpg';

const Hakkimizda = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: MapPin, label: t('about.highlights.location'), color: 'text-primary' },
    { icon: Calendar, label: t('about.highlights.experience'), color: 'text-accent' },
    { icon: Trophy, label: t('about.highlights.since'), color: 'text-primary-light' },
    { icon: Building2, label: t('about.highlights.focus'), color: 'text-primary-deep' },
    { icon: Award, label: t('about.highlights.sectors'), color: 'text-accent' }
  ];


  return (
    <div>
      <SEO url="https://www.aszenainvest.hu" />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${budapestSkyline})` }}>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                {t('about.heroTitle')}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="prose prose-lg max-w-none text-foreground animate-slide-up text-center">
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                {t('about.description1')}
              </p>
              <p className="text-lg leading-relaxed mb-6">
                {t('about.description2')}
              </p>
              <p className="text-lg leading-relaxed mb-6">
                {t('about.description3')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('about.description4')}
              </p>
            </div>
          </div>

          {/* Enhanced Vision and Mission Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full px-8 py-3 mb-6 border-2 border-primary/30 shadow-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-primary font-bold text-base">{t('about.visionMission')}</span>
                <div className="w-2 h-2 bg-accent rounded-full"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent pb-4">
                {t('about.valuesTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="group p-10 rounded-3xl bg-gradient-to-br from-primary/10 via-white/50 to-primary/5 border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:scale-105 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 shadow-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">V</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-primary">{t('about.vision.title')}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.vision.description')}
                  </p>
                </div>
              </div>

              <div className="group p-10 rounded-3xl bg-gradient-to-br from-accent/10 via-white/50 to-accent/5 border-2 border-accent/20 shadow-2xl hover:shadow-3xl transition-all duration-500 animate-slide-up transform hover:scale-105 relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 shadow-lg">
                      <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">M</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-accent">{t('about.mission.title')}</h3>
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('about.mission.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Premium Highlights Grid (no 'Devamını Oku' title) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="p-5 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 shadow-soft hover:shadow-elevated transition-all animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-lg bg-white/70">
                    <highlight.icon className={`w-6 h-6 ${highlight.color}`} />
                  </div>
                  <div className="font-semibold text-foreground">{highlight.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hakkimizda;