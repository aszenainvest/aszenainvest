import { ArrowRight, LucideIcon, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  link: string;
  linkText: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features, 
  link, 
  linkText, 
  image, 
  imageAlt,
  reverse = false 
}: ServiceCardProps) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:gap-16' : ''}`}>
      {/* Content */}
      <div className={`animate-slide-up ${reverse ? 'lg:order-2' : ''}`}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
            <Icon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="section-title !mb-0 text-left bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {description}
        </p>
        
        {features.length > 0 && (
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        )}
        
        <Link to={link}>
          <Button className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-deep hover:to-primary text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group px-8 py-4 text-lg font-semibold">
            {linkText}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Image */}
      <div className={`animate-slide-up ${reverse ? 'lg:order-1' : ''}`} style={{animationDelay: '0.2s'}}>
        <div className="investment-card p-0 overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 relative">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-80 lg:h-96 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/25 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary-deep/20 to-transparent">
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-white/80 text-sm line-clamp-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;