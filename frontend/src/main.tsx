import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LanguageProvider } from './hooks/useLanguage'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </HelmetProvider>
);
