import { useLanguage } from '../hooks/useLanguage';
import { CheckCircle, Clock, Target, Users, TrendingUp, Award, Star, Building2, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import budapestSkyline from '../assets/budapest-skyline.jpg';
import projectManagement from '../assets/project-management.jpg';
import matildBgImage from '../assets/matildbg.jpg';
import matildHotelImage from '../assets/matildhotel.jpg';
import airbaseImage from '../assets/airbase.jpg';

const ProjeYonetimi = () => {
  const { t } = useLanguage();

  const references = [
    { 
      name: t('projectManagement.references.matildPalace.name'), 
      location: t('projectManagement.references.matildPalace.location'), 
      description: t('projectManagement.references.matildPalace.description'),
      image: matildHotelImage
    },
    { 
      name: t('projectManagement.references.papaAirBase.name'), 
      location: t('projectManagement.references.papaAirBase.location'), 
      description: t('projectManagement.references.papaAirBase.description'),
      image: airbaseImage
    }
  ];

  const executionItems = [
    { icon: Clock, title: t('projectManagement.execution.implementation'), description: t('projectManagement.execution.implementationDesc') },
    { icon: CheckCircle, title: t('projectManagement.execution.quality'), description: t('projectManagement.execution.qualityDesc') },
    { icon: Award, title: t('projectManagement.execution.delivery'), description: t('projectManagement.execution.deliveryDesc') }
  ];

  const processSteps = [
    { step: 1, title: t('projectManagement.process.planning'), description: t('projectManagement.process.planningDesc'), icon: Target },
    { step: 2, title: t('projectManagement.process.design'), description: t('projectManagement.process.designDesc'), icon: Users },
    { step: 3, title: t('projectManagement.process.development'), description: t('projectManagement.process.developmentDesc'), icon: TrendingUp },
    { step: 4, title: t('projectManagement.process.testing'), description: t('projectManagement.process.testingDesc'), icon: CheckCircle },
    { step: 5, title: t('projectManagement.process.delivery'), description: t('projectManagement.process.deliveryDesc'), icon: Award }
  ];

  return (
    <div>
      <SEO url="https://www.aszenainvest.hu" />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${matildBgImage})` }}
        >
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content max-w-4xl animate-fade-in">
            <h1 className="hero-title">{t('projectManagement.title')}</h1>
            <p className="hero-subtitle">{t('projectManagement.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground mb-16 animate-slide-up">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              {t('projectManagement.description')}
            </p>
            <p className="text-lg leading-relaxed mb-6">
              {t('projectManagement.description2')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('projectManagement.description3')}
            </p>
          </div>

          {/* References Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('projectManagement.references.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {references.map((reference, index) => (
                <div key={index} className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 shadow-soft hover:shadow-elevated transition-all animate-slide-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="h-48 bg-gray-200 relative">
                    <img src={reference.image} alt={reference.name} className="w-full h-full object-fill" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{reference.name}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{reference.location}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{reference.description}</p>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Execution Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('projectManagement.execution.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {executionItems.map((item, index) => (
                <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 shadow-soft hover:shadow-elevated transition-all animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjeYonetimi;