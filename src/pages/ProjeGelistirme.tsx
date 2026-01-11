import { useLanguage } from '../hooks/useLanguage';
import { Target, Search, FileCheck, Presentation } from 'lucide-react';
import SEO from '../components/SEO';
import projectDevelopmentImage from '../assets/projectdevelopment.jpeg';

const ProjeGelistirme = () => {
  const { t } = useLanguage();

  const processCards = [
    {
      icon: Search,
      title: t('development.cards.offmarket'),
      description: t('development.cards.offmarketDesc'),
      color: 'text-primary'
    },
    {
      icon: FileCheck,
      title: t('development.cards.feasibility'),
      description: t('development.cards.feasibilityDesc'),
      color: 'text-accent'
    },
    {
      icon: Target,
      title: t('development.cards.permits'),
      description: t('development.cards.permitsDesc'),
      color: 'text-primary-light'
    },
    {
      icon: Presentation,
      title: t('development.cards.sales'),
      description: t('development.cards.salesDesc'),
      color: 'text-primary-deep'
    }
  ];

  return (
    <div>
      <SEO 
        title="Project Development - Aszena Invest | Off-Market Real Estate Opportunities"
        description="Comprehensive project development services in Hungary and Central Europe. Off-market property sourcing, feasibility studies, permit acceleration, and investor presentation. 200,000+ m² developed."
        keywords="project development Hungary, off-market properties, real estate development Budapest, feasibility studies, property permits, investment opportunities, land development, commercial development"
        url="https://www.aszenainvest.hu/proje-gelistirme"
      />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${projectDevelopmentImage})` }}
        >
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content max-w-3xl animate-fade-in">
            <h1 className="hero-title">
              {t('development.title')}
            </h1>
            <p className="hero-subtitle">
              {t('development.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro Content */}

          {/* Principle Callout - Moved to top */}
          <div className="mb-16">
            <div className="bg-gradient-primary p-8 rounded-2xl text-white text-center animate-scale-in">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-medium italic text-center">
                  {t('development.principle')}
                </h3>
              </div>
            </div>
          </div>

          {/* Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {processCards.map((card, index) => (
              <div key={index} className="investment-card animate-slide-up group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center">
                  <div className={`inline-flex p-4 rounded-full bg-muted group-hover:bg-primary/10 transition-colors mb-4`}>
                    <card.icon className={`w-8 h-8 ${card.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-foreground animate-slide-up">
              <p className="text-lg leading-relaxed mb-6">
                {t('projectDevelopment.overview.p1')}
              </p>

              <p className="text-lg leading-relaxed mb-6">
                {t('projectDevelopment.overview.p2')}
              </p>

              <p className="text-lg leading-relaxed mb-8">
                {t('projectDevelopment.overview.p3')}
              </p>
            </div>

            <div className="mb-16">
              <div className="prose prose-lg max-w-none text-foreground animate-slide-up">
                <div className="prose prose-lg max-w-none text-foreground">
                  <p className="text-lg md:text-xl leading-relaxed">
                    {t('development.description')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjeGelistirme;