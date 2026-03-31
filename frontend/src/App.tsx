import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Hakkimizda from "./pages/Hakkimizda";
import ProjeGelistirme from "./pages/ProjeGelistirme";
import ProjeYonetimi from "./pages/ProjeYonetimi";
import Iletisim from "./pages/Iletisim";
import NotFound from "./pages/NotFound";
import OrtakGirisimiIsbirlikleri from "./pages/OrtakGirisimiIsbirlikleri";
import TamamlananProjeler from "./pages/TamamlananProjeler";
import Tarim from "./pages/Tarim";
import YasamTarzi from "./pages/YasamTarzi";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin Routes (No Layout) */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* Public Routes (With Layout) */}
          <Route element={<Layout />}>
            {/* Root redirect to Turkish */}
            <Route path="/" element={<Navigate to="/tr" replace />} />
            
            {/* Language-prefixed redirects to admin */}
            <Route path="/tr/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/en/admin" element={<Navigate to="/admin/login" replace />} />
            <Route path="/ar/admin" element={<Navigate to="/admin/login" replace />} />
            
            {/* Turkish Routes */}
            <Route path="/tr" element={<Home />} />
            <Route path="/tr/hakkimizda" element={<Hakkimizda />} />
            <Route path="/tr/proje-gelistirme" element={<ProjeGelistirme />} />
            <Route path="/tr/proje-yonetimi" element={<ProjeYonetimi />} />
            <Route path="/tr/ortak-girisim-isbirlikleri" element={<OrtakGirisimiIsbirlikleri />} />
            <Route path="/tr/tamamlanan-projeler" element={<TamamlananProjeler />} />
            <Route path="/tr/tarim" element={<Tarim />} />
            <Route path="/tr/yasam-tarzi" element={<YasamTarzi />} />
            <Route path="/tr/iletisim" element={<Iletisim />} />
            
            {/* English Routes */}
            <Route path="/en" element={<Home />} />
            <Route path="/en/about" element={<Hakkimizda />} />
            <Route path="/en/project-development" element={<ProjeGelistirme />} />
            <Route path="/en/project-management" element={<ProjeYonetimi />} />
            <Route path="/en/partnerships" element={<OrtakGirisimiIsbirlikleri />} />
            <Route path="/en/completed-projects" element={<TamamlananProjeler />} />
            <Route path="/en/agriculture" element={<Tarim />} />
            <Route path="/en/lifestyle" element={<YasamTarzi />} />
            <Route path="/en/contact" element={<Iletisim />} />
            
            {/* Arabic Routes */}
            <Route path="/ar" element={<Home />} />
            <Route path="/ar/hakkimizda" element={<Hakkimizda />} />
            <Route path="/ar/proje-gelistirme" element={<ProjeGelistirme />} />
            <Route path="/ar/proje-yonetimi" element={<ProjeYonetimi />} />
            <Route path="/ar/ortak-girisim-isbirlikleri" element={<OrtakGirisimiIsbirlikleri />} />
            <Route path="/ar/tamamlanan-projeler" element={<TamamlananProjeler />} />
            <Route path="/ar/tarim" element={<Tarim />} />
            <Route path="/ar/yasam-tarzi" element={<YasamTarzi />} />
            <Route path="/ar/iletisim" element={<Iletisim />} />
            
            {/* Legacy routes - redirect to Turkish */}
            <Route path="/hakkimizda" element={<Navigate to="/tr/hakkimizda" replace />} />
            <Route path="/proje-gelistirme" element={<Navigate to="/tr/proje-gelistirme" replace />} />
            <Route path="/proje-yonetimi" element={<Navigate to="/tr/proje-yonetimi" replace />} />
            <Route path="/ortak-girisim-isbirlikleri" element={<Navigate to="/tr/ortak-girisim-isbirlikleri" replace />} />
            <Route path="/tamamlanan-projeler" element={<Navigate to="/tr/tamamlanan-projeler" replace />} />
            <Route path="/tarim" element={<Navigate to="/tr/tarim" replace />} />
            <Route path="/yasam-tarzi" element={<Navigate to="/tr/yasam-tarzi" replace />} />
            <Route path="/iletisim" element={<Navigate to="/tr/iletisim" replace />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

