import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { Button } from "../components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Sayfa Bulunamadı
        </h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
          Ana sayfaya dönerek devam edebilirsiniz.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline"
            className="flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri Dön</span>
          </Button>
          
          <Button 
            onClick={() => window.location.href = '/'}
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Ana Sayfa</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
