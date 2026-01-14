import { useLanguage } from '../hooks/useLanguage';
import { Leaf, TrendingUp, Globe, Zap, Droplets, Sun, MapPin, BarChart3, Wheat, TreePine, CheckCircle, Trees, LandPlot } from 'lucide-react';
import SEO from '../components/SEO';
import tarimImage from '../assets/tarım.jpg';

const Tarim = () => {
  const { t } = useLanguage();

  const focusAreas = [
    {
      icon: Zap,
      title: t('agriculture.focus.technology'),
      description: t('agriculture.focus.technologyDesc'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Leaf,
      title: t('agriculture.focus.sustainability'),
      description: t('agriculture.focus.sustainabilityDesc'),
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: Globe,
      title: t('agriculture.focus.export'),
      description: t('agriculture.focus.exportDesc'),
      color: 'from-blue-500 to-blue-600'
    }
  ];


  const stats = [
    {
      icon: LandPlot,
      value: t('agriculture.stats.area'),
      label: t('agriculture.stats.areaDesc'),
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Trees,
      value: t('agriculture.stats.forestArea'),
      label: t('agriculture.stats.forestAreaDesc'),
      color: 'from-emerald-500 to-green-600'
    },
    {
      icon: MapPin,
      value: t('agriculture.stats.location'),
      label: t('agriculture.stats.locationDesc'),
      color: 'from-blue-500 to-cyan-600'
    }
  ];


  return (
    <div>
      <SEO url="https://www.aszenainvest.hu" />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${tarimImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 via-emerald-500/70 to-green-400/60"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content max-w-4xl animate-fade-in">
            <h1 className="hero-title">{t('agriculture.title')}</h1>
            <p className="hero-subtitle">{t('agriculture.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground mb-16 animate-slide-up">
            <p className="text-lg md:text-xl leading-relaxed">
              {t('agriculture.description')}
            </p>
          </div>

          {/* Stats Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('agriculture.stats.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-soft hover:shadow-elevated transition-all animate-slide-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="relative p-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 shadow-lg`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                      <p className="text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Areas */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('agriculture.focus.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {focusAreas.map((area, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-soft hover:shadow-elevated transition-all duration-500 animate-slide-up transform hover:-translate-y-2" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative p-8">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${area.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <area.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agriculture and Forest Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('agriculture.agricultureForest.title')}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Agriculture Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 shadow-soft hover:shadow-elevated transition-all duration-500 animate-slide-up transform hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-200/20 to-emerald-200/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Wheat className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{t('agriculture.agricultureForest.agriculture.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{t('agriculture.agricultureForest.agriculture.description')}</p>
                  <ul className="space-y-3">
                    {(t('agriculture.agricultureForest.agriculture.features') as unknown as string[]).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-full bg-green-100">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="text-muted-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Forest Card */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 shadow-soft hover:shadow-elevated transition-all duration-500 animate-slide-up transform hover:-translate-y-2" style={{ animationDelay: '0.1s' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="relative p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TreePine className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{t('agriculture.agricultureForest.forest.title')}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{t('agriculture.agricultureForest.forest.description')}</p>
                  <ul className="space-y-3">
                    {(t('agriculture.agricultureForest.forest.features') as unknown as string[]).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="p-1.5 rounded-full bg-blue-100">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-muted-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>


        </div>
      </section>
    </div>
  );
};

export default Tarim;
