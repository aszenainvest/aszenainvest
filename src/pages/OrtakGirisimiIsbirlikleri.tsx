import { useLanguage } from '../hooks/useLanguage';
import { MapPin, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import partnershipImage from '../assets/partnership.jpg';
import holidayImage from '../assets/holiday.png';
import nationalImage from '../assets/national.png';
import areaImage from '../assets/area.png';
import donobeImage from '../assets/donobe.png';
import roofImage from '../assets/roof.png';
import istabulImage from '../assets/istanbul.jpeg';

const OrtakGirisimiIsbirlikleri = () => {
  const { t } = useLanguage();


  const projects = [
    {
      title: t('partnerships.projects.holidayInn.name'),
      location: t('partnerships.projects.holidayInn.location'),
      type: t('partnerships.projects.holidayInn.type'),
      description: t('partnerships.projects.holidayInn.description'),
      image: holidayImage
    },
    {
      title: t('partnerships.projects.nationalPark.name'),
      location: t('partnerships.projects.nationalPark.location'),
      type: t('partnerships.projects.nationalPark.type'),
      description: t('partnerships.projects.nationalPark.description'),
      image: nationalImage
    },
    {
      title: t('partnerships.projects.militaryArea.name'),
      location: t('partnerships.projects.militaryArea.location'),
      type: t('partnerships.projects.militaryArea.type'),
      description: t('partnerships.projects.militaryArea.description'),
      image: areaImage
    },
    {
      title: t('partnerships.projects.donobeResort.name'),
      location: t('partnerships.projects.donobeResort.location'),
      type: t('partnerships.projects.donobeResort.type'),
      description: t('partnerships.projects.donobeResort.description'),
      image: donobeImage
    },
    {
      title: t('partnerships.projects.roofTopProject.name'),
      location: t('partnerships.projects.roofTopProject.location'),
      type: t('partnerships.projects.roofTopProject.type'),
      description: t('partnerships.projects.roofTopProject.description'),
      image: roofImage
    },
    {
      title: t('partnerships.projects.commercialOffice.name'),
      location: t('partnerships.projects.commercialOffice.location'),
      type: t('partnerships.projects.commercialOffice.type'),
      description: t('partnerships.projects.commercialOffice.description'),
      image: istabulImage
    },
    {
      title: t('partnerships.projects.croatiaProject.name'),
      location: t('partnerships.projects.croatiaProject.location'),
      type: t('partnerships.projects.croatiaProject.type'),
      description: t('partnerships.projects.croatiaProject.description'),
      image: null, // Kum saati icon kullanacağız
      icon: Clock
    },
    {
      title: t('partnerships.projects.austriaProject.name'),
      location: t('partnerships.projects.austriaProject.location'),
      type: t('partnerships.projects.austriaProject.type'),
      description: t('partnerships.projects.austriaProject.description'),
      image: null, // Kum saati icon kullanacağız
      icon: Clock
    }
  ];


  return (
    <div>
      <SEO 
        title="Joint Ventures & Partnerships - Aszena Invest | Strategic Investment Opportunities"
        description="Strategic partnerships and joint venture opportunities in Hungary and Central Europe. Holiday Inn, Danube Nature Resort, and premium development projects. Partner with Aszena Invest for success."
        keywords="joint ventures Hungary, real estate partnerships, investment partnerships, strategic alliances, co-development, Holiday Inn Budapest, Danube resort, partnership opportunities, investor relations"
        url="https://www.aszenainvest.hu/ortak-girisim-isbirlikleri"
      />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${areaImage})` }}
        >
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content max-w-4xl animate-fade-in">
            <h1 className="hero-title">{t('partnerships.title')}</h1>
            <p className="hero-subtitle">{t('partnerships.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground mb-16 animate-slide-up">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              {t('partnerships.description')}
            </p>
            <p className="text-lg leading-relaxed">
              {t('partnerships.description2')}
            </p>
          </div>


          {/* Projects Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('partnerships.projects.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 shadow-soft hover:shadow-elevated transition-all animate-slide-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                  {project.image ? (
                    <div className="h-48 bg-gray-200 relative">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-orange-100 to-amber-100 relative flex items-center justify-center">
                      <div className="text-center">
                        <project.icon className="w-16 h-16 text-orange-500 mx-auto mb-2" />
                        <p className="text-orange-600 font-medium">Under Negotiations</p>
                      </div>
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-end mb-2">
                      <span className="text-sm text-muted-foreground">{project.type}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.location}</span>
                    </div>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>
    </div>
  );
};

export default OrtakGirisimiIsbirlikleri;
