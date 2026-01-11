import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hakkimizda" element={<Hakkimizda />} />
            <Route path="/proje-gelistirme" element={<ProjeGelistirme />} />
            <Route path="/proje-yonetimi" element={<ProjeYonetimi />} />
            <Route path="/ortak-girisim-isbirlikleri" element={<OrtakGirisimiIsbirlikleri />} />
            <Route path="/tamamlanan-projeler" element={<TamamlananProjeler />} />
            <Route path="/tarim" element={<Tarim />} />
            <Route path="/yasam-tarzi" element={<YasamTarzi />} />
            <Route path="/iletisim" element={<Iletisim />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
