import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Mail, Phone, MapPin, Send, Check, AlertTriangle, Building2, Clock, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import SEO from '../components/SEO';
import budapestSkyline from '../assets/budapest-skyline.jpg';
import budapestContact from '../assets/budapest-contact.jpg';

const Iletisim = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message || !formData.consent) {
      toast({
        title: t('contact.form.messageSent'),
        description: t('contact.form.validationError'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t('contact.form.messageSent'),
        description: t('contact.form.success'),
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false
      });
    } catch (error) {
      toast({
        title: t('contact.form.messageSent'),
        description: t('contact.form.error'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      label: t('common.phoneLabel'),
      value: t('common.phone'),
      color: 'text-primary'
    },
    {
      icon: Mail,
      label: t('common.emailLabel'),
      value: t('common.email'),
      color: 'text-accent'
    },
    {
      icon: MapPin,
      label: t('common.addressLabel'),
      value: t('common.address'),
      color: 'text-primary-light'
    }
  ];

  return (
    <div>
      <SEO 
        title="Contact Us - Aszena Invest | Get in Touch with Our Team"
        description="Contact Aszena Invest for real estate investment opportunities in Budapest and Central Europe. Email: contact@aszenainvest.hu. Located in Budapest, Hungary. Available in Turkish, English, and Arabic."
        keywords="contact Aszena Invest, Budapest office, real estate inquiries, investment consultation, contact information, email contact, Hungary office, get in touch, business inquiries"
        url="https://www.aszenainvest.hu/iletisim"
      />
      {/* Hero Section */}
      <section className="hero-section relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${budapestSkyline})` }}
        >
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content max-w-3xl animate-fade-in">
            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              {t('contact.title')}
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-white/90">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="content-section bg-gradient-to-br from-muted/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-up">
              <div className="investment-card bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg">
                <h2 className="text-2xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  {t('contact.formTitle')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Adınız ve soyadınız"
                      className="w-full border-primary/20 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="ornek@email.com"
                      className="w-full border-primary/20 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+90 XXX XXX XX XX"
                      className="w-full border-primary/20 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Mesajınızı buraya yazın..."
                      rows={5}
                      className="w-full border-primary/20 focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={(e) => handleInputChange('consent', e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary focus:ring-primary border-primary/30 rounded"
                      required
                    />
                    <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed">
                      {t('contact.form.consent')} *
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary-light hover:from-primary-deep hover:to-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 py-4 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>{t('contact.form.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t('contact.form.submit')}</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <div className="space-y-8">
                {/* Contact Details */}
                <div className="investment-card bg-white/80 backdrop-blur-sm border border-primary/20 shadow-lg">
                  <h2 className="text-2xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                    {t('contact.contactInfo')}
                  </h2>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                        <div className={`p-3 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10`}>
                          <info.icon className={`w-5 h-5 ${info.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">
                            {info.label}
                          </h3>
                          <p className="text-muted-foreground">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budapest Image */}
                <div className="investment-card p-0 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 shadow-lg">
                  <img 
                    src={budapestContact} 
                    alt="Beautiful Budapest cityscape"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6 bg-white/90">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 mx-auto mb-4 text-primary" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{t('contact.budapest')}</h3>
                      <p className="text-muted-foreground">{t('contact.hungary')}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {t('contact.locationDescription')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="investment-card bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 text-center">
                    <Building2 className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <h3 className="font-semibold text-foreground mb-1">Prestijli Lokasyonlar</h3>
                    <p className="text-sm text-muted-foreground">Budapeşte'nin en değerli bölgelerinde</p>
                  </div>
                  <div className="investment-card bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 text-center">
                    <Clock className="w-8 h-8 mx-auto mb-3 text-accent" />
                    <h3 className="font-semibold text-foreground mb-1">Hızlı Yanıt</h3>
                    <p className="text-sm text-muted-foreground">24 saat içinde dönüş</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Iletisim;