import { useLanguage } from '../hooks/useLanguage';
import { CheckCircle, Building2, MapPin, Calendar, Star, Award } from 'lucide-react';
import SEO from '../components/SEO';
import matildBg2Image from '../assets/matildhotel.jpg';
import brownBeachImage from '../assets/brownbeachchalkida.jpg';
import sevenVillaImage from '../assets/7villaproject.png';
import hyattRegencyImage from '../assets/hyaatregency.jpg';
import hotelContinentalImage from '../assets/hotelconteinal.jpg';
import bluesunHotelImage from '../assets/bluesunhotel.jpeg';
import brownEviaImage from '../assets/ısla.jpeg';
import eviaHotelImage from '../assets/eviahotel.jpeg';
import evripidouImage from '../assets/evirpidou.jpeg';
import lePrimoreImage from '../assets/primore.jpg';
import matild1Image from '../assets/matild1.jpg';
import matild2Image from '../assets/matild2.jpg';
import matild3Image from '../assets/matild3.jpg';
import centralPalaceImage from '../assets/centralpalace.webp';
import eskiFabrikaImage from '../assets/eskifabrika.png';
import maarifImage from '../assets/maarif.webp';
import vittaHotelImage from '../assets/vitalhotel.jpg';

const TamamlananProjeler = () => {
  const { t } = useLanguage();

  const projectsUnsorted = [
    {
      title: t('projectManagement.references.centralPalace.name'),
      location: t('projectManagement.references.centralPalace.location'),
      year: '2016',
      type: t('projectManagement.references.centralPalace.type'),
      description: t('projectManagement.references.centralPalace.description'),
      image: centralPalaceImage
    },
    {
      title: t('projectManagement.references.eskiFabrika.name'),
      location: t('projectManagement.references.eskiFabrika.location'),
      year: '2018',
      type: t('projectManagement.references.eskiFabrika.type'),
      description: t('projectManagement.references.eskiFabrika.description'),
      image: eskiFabrikaImage
    },
    {
      title: t('projectManagement.references.maarif.name'),
      location: t('projectManagement.references.maarif.location'),
      year: '2022',
      type: t('projectManagement.references.maarif.type'),
      description: t('projectManagement.references.maarif.description'),
      image: maarifImage
    },
    {
      title: t('projectManagement.references.matildPalace.name'),
      location: t('projectManagement.references.matildPalace.location'),
      year: '2014 - 2021',
      type: t('projectManagement.references.matildPalace.type'),
      description: t('projectManagement.references.matildPalace.description'),
      image: matildBg2Image
    },
    {
      title: t('projectManagement.references.brownBeach.name'),
      location: t('projectManagement.references.brownBeach.location'),
      year: '2022',
      type: t('projectManagement.references.brownBeach.type'),
      description: t('projectManagement.references.brownBeach.description'),
      image: brownBeachImage
    },
    {
      title: t('projectManagement.references.bluesunHotel.name'),
      location: t('projectManagement.references.bluesunHotel.location'),
      year: '2022',
      type: t('projectManagement.references.bluesunHotel.type'),
      description: t('projectManagement.references.bluesunHotel.description'),
      image: bluesunHotelImage
    },
    {
      title: t('projectManagement.references.hotelContinental.name'),
      location: t('projectManagement.references.hotelContinental.location'),
      year: '2023',
      type: t('projectManagement.references.hotelContinental.type'),
      description: t('projectManagement.references.hotelContinental.description'),
      image: hotelContinentalImage
    },
    {
      title: t('projectManagement.references.brownBeachGreece.name'),
      location: t('projectManagement.references.brownBeachGreece.location'),
      year: '2023',
      type: t('projectManagement.references.brownBeachGreece.type'),
      description: t('projectManagement.references.brownBeachGreece.description'),
      image: brownEviaImage
    },
    {
      title: t('projectManagement.references.eviaHotel.name'),
      location: t('projectManagement.references.eviaHotel.location'),
      year: '2023',
      type: t('projectManagement.references.eviaHotel.type'),
      description: t('projectManagement.references.eviaHotel.description'),
      image: eviaHotelImage
    },
    {
      title: t('projectManagement.references.evripidouSuites.name'),
      location: t('projectManagement.references.evripidouSuites.location'),
      year: '2023',
      type: t('projectManagement.references.evripidouSuites.type'),
      description: t('projectManagement.references.evripidouSuites.description'),
      image: evripidouImage
    },
    {
      title: t('projectManagement.references.sevenVilla.name'),
      location: t('projectManagement.references.sevenVilla.location'),
      year: '2025',
      type: t('projectManagement.references.sevenVilla.type'),
      description: t('projectManagement.references.sevenVilla.description'),
      image: sevenVillaImage
    },
    {
      title: t('projectManagement.references.lePrimoreHotel.name'),
      location: t('projectManagement.references.lePrimoreHotel.location'),
      year: '2024-2025',
      type: t('projectManagement.references.lePrimoreHotel.type'),
      description: t('projectManagement.references.lePrimoreHotel.description'),
      image: lePrimoreImage
    },
    {
      title: t('projectManagement.references.hyattRegency.name'),
      location: t('projectManagement.references.hyattRegency.location'),
      year: '2025',
      type: t('projectManagement.references.hyattRegency.type'),
      description: t('projectManagement.references.hyattRegency.description'),
      image: hyattRegencyImage
    },
    {
      title: t('projectManagement.references.vittaHotel.name'),
      location: t('projectManagement.references.vittaHotel.location'),
      year: '2019',
      type: t('projectManagement.references.vittaHotel.type'),
      description: t('projectManagement.references.vittaHotel.description'),
      image: vittaHotelImage
    }
  ];

  // Sort projects chronologically from oldest to newest using the first 4 digits of the year
  const projects = projectsUnsorted.sort((a, b) => {
    const parseYear = (y: string) => {
      const m = y.match(/\d{4}/);
      return m ? parseInt(m[0], 10) : 0;
    };
    return parseYear(a.year) - parseYear(b.year);
  });


  const achievements = [
    {
      icon: Award,
      title: t('completedProjects.achievements.quality'),
      description: t('completedProjects.achievements.qualityDesc')
    },
  ];

  return (
    <div>
      <SEO 
        title="Completed Projects - Aszena Invest | Matild Palace & Premium Developments"
        description="Explore our portfolio of successfully completed projects across Hungary, Croatia, and Greece. Matild Palace Budapest, Central Palace Offices, luxury hotels, and 300M+ EUR developments delivered."
        keywords="completed projects, Matild Palace Budapest, Central Palace, hotel projects, luxury developments, real estate portfolio, Croatia hotels, Greece resorts, project references, construction achievements"
        url="https://www.aszenainvest.hu/tamamlanan-projeler"
      />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${matildBg2Image})` }}
        >
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content max-w-4xl animate-fade-in">
            <h1 className="hero-title">{t('completedProjects.title')}</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="content-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none text-foreground mb-16 animate-slide-up text-center">
              <p className="text-lg md:text-xl leading-relaxed font-medium">
                {t('completedProjects.description')}
              </p>
          </div>

          {/* Projects Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('completedProjects.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 shadow-soft hover:shadow-elevated transition-all animate-slide-up overflow-hidden" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="aspect-[16/9] bg-gray-200 relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{project.year}</span>
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

          {/* Achievements Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('completedProjects.achievements.title')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-6 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 shadow-soft hover:shadow-elevated transition-all animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 rounded-lg bg-accent/10">
                      <achievement.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{achievement.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Awards Timeline Section */}
          <div className="mb-16">
            <h2 className="section-title mb-8">{t('completedProjects.achievements.awards.title')}</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary-light"></div>
              
              {/* Timeline Items */}
              <div className="space-y-8">
                {(t('completedProjects.achievements.awards.timeline') as unknown as { year: string; awards: string }[]).map((award, index: number) => (
                  <div key={index} className="relative flex items-start space-x-6 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{award.year}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-primary/10 hover:shadow-elevated transition-all">
                      <div className="flex items-center space-x-3 mb-3">
                        <Award className="w-5 h-5 text-accent" />
                        <h3 className="text-lg font-semibold text-foreground">{award.year}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{award.awards}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MATILD Palace Gallery Slider */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">{t('completedProjects.gallery.title')}</h3>
            <div className="relative max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img 
                    src={matild1Image} 
                    alt="MATILD PALACE Interior 1" 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{t('completedProjects.gallery.luxuryInterior')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img 
                    src={matild2Image} 
                    alt="MATILD PALACE Interior 2" 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{t('completedProjects.gallery.awardWinningDesign')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img 
                    src={matild3Image} 
                    alt="MATILD PALACE Interior 3" 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{t('completedProjects.gallery.prestigiousSpace')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default TamamlananProjeler;
