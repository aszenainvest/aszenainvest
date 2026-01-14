import { useLanguage } from '../hooks/useLanguage';
import { Anchor, MapPin, Users, Heart, Globe, Award, Sailboat } from 'lucide-react';
import SEO from '../components/SEO';
import yatImage from '../assets/yat.jpeg';
import petrusLogo from '../assets/petrus.png';

const YasamTarzi = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Anchor,
      title: t('lifestyle.focus.items.sports'),
      description: t('lifestyle.focus.items.sportsDesc')
    },
    {
      icon: MapPin,
      title: t('lifestyle.focus.items.marina'),
      description: t('lifestyle.focus.items.marinaDesc')
    },
    {
      icon: Users,
      title: t('lifestyle.focus.items.community'),
      description: t('lifestyle.focus.items.communityDesc')
    },
    {
      icon: Heart,
      title: t('lifestyle.focus.items.culture'),
      description: t('lifestyle.focus.items.cultureDesc')
    }
  ];

  const stats = [
    { number: '2017', label: t('lifestyle.stats.founded') },
    { number: '6.278', label: t('lifestyle.stats.coastline') },
    { number: '1.244', label: t('lifestyle.stats.islands') }
  ];

  return (
    <div>
      <SEO url="https://www.aszenainvest.hu" />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${yatImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-cyan-500/70 to-blue-400/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content max-w-4xl animate-fade-in">
            <h1 className="hero-title">{t('lifestyle.title')}</h1>
            <p className="hero-subtitle">{t('lifestyle.subtitle')}</p>
            <div className="grid grid-cols-3 gap-8 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm md:text-base uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground mb-16 animate-slide-up">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              {t('lifestyle.description')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('lifestyle.description2')}
            </p>
          </div>

          {/* Petrus 2017 Sailing Club Logo - Enhanced */}
          <div className="mb-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-2 border-blue-200/50 shadow-2xl animate-slide-up group hover:shadow-3xl transition-all duration-500">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30V0c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              
              <div className="relative z-10 p-12 text-center">
                <div className="mb-8">
                  <div className="mb-6">
                    <img 
                      src={petrusLogo} 
                      alt="Petrus 2017 Sailing Club Logo" 
                      className="h-24 md:h-32 mx-auto mb-4 drop-shadow-lg"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="max-w-4xl mx-auto">
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {t('lifestyle.projects.petrus')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Section - Enhanced */}
          <div className="mb-20">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-2 border-blue-200/50 shadow-2xl animate-slide-up group hover:shadow-3xl transition-all duration-500">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='0.3'%3E%3Cpath d='M0 0h60v60H0V0zm30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30V0c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
              
              <div className="relative z-10 p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                    <MapPin className="w-20 h-20 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('lifestyle.projects.oliveTitle')}</h3>
                  <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                    {t('lifestyle.projects.olive')}
                  </p>
                </div>
                
                {/* Google Maps Embed */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-blue-300/50 h-80 group-hover:shadow-xl transition-all duration-300">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2877.1234567890123!2d15.1683271!3d44.0957234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4761f977c5b0efef%3A0x42457d593c7065c2!2sOlive%20Island%20Marina%20Croatia%20Sutomiscica!5e0!3m2!1str!2str!4v1703000000000!5m2!1str!2str"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('lifestyle.projects.oliveMapTitle')}
                    className="rounded-2xl"
                  ></iframe>
                  
                  {/* Overlay with Info */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800">{t('lifestyle.projects.oliveTitle')}</h4>
                        <p className="text-xs text-blue-600">{t('lifestyle.projects.oliveLocation')}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-blue-300/30 rounded-full blur-xl animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-cyan-300/30 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YasamTarzi;
