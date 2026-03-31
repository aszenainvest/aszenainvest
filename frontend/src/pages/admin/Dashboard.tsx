import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Plus, BarChart3, Globe, Shield, MessageSquare, Activity, Database, Trophy } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Modular Admin Components
import { Sidebar } from "@/components/admin/Sidebar";
import { TopNav } from "@/components/admin/TopNav";
import { ModuleCard } from "@/components/admin/ModuleCard";
import { LanguageManager } from "@/components/admin/LanguageManager";

// --- Interfaces ---

interface DynamicLanguage {
  id: string;
  code: string;
  name: string;
  is_active: boolean;
  is_default: boolean;
}

const API_URL = "/api";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<DynamicLanguage[]>([]);
  const [data, setData] = useState<any>({
    nav: [], hero: [], stats: [], features: [], achievements: [], 
    cta: [], about: [], projectDevelopment: [], projectManagement: [], 
    completedProjects: [], agriculture: [], lifestyle: [], contact: [], 
    footer: [], seo: [], languages: []
  });
  const navigate = useNavigate();

  const fetchData = async (tab: string) => {
    if (tab === "overview") { setLoading(false); return; }
    
    setLoading(true);
    const token = localStorage.getItem("admin_token");
    if (!token) { navigate("/admin/login"); return; }
    
    try {
      const headers = { "Authorization": `Bearer ${token}` };
      
      // Fetch languages first as they are needed for ModuleCard
      const resLangs = await fetch(`${API_URL}/admin/languages`, { headers });
      const langData = await resLangs.json();
      setLanguages(langData);

      // Fetch the specific tab data
      // For general sections, we use the 'sections' or 'content' endpoint
      let endpoint = tab;
      if (["hero", "stats", "features", "achievements", "cta", "about", 
           "projectDevelopment", "projectManagement", "completedProjects", 
           "agriculture", "lifestyle", "contact", "footer", "seo", "nav"].includes(tab)) {
        endpoint = `sections/${tab}`;
      }

      const resData = await fetch(`${API_URL}/admin/${endpoint}`, { headers });
      const tabData = await resData.json();

      setData((prev: any) => ({ 
        ...prev, 
        [tab]: Array.isArray(tabData) ? tabData : [tabData] 
      }));
    } catch (e) {
      toast.error("Veri senkronizasyonu sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(activeTab); }, [activeTab]);

  const handleSave = async (tab: string, item: any) => {
    const token = localStorage.getItem("admin_token");
    try {
      const response = await fetch(`${API_URL}/admin/${tab}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(item)
      });
      if (response.ok) { 
        toast.success("Veri başarıyla güncellendi."); 
        fetchData(tab); 
      }
    } catch (e) { 
      toast.error("Kaydetme işlemi başarısız."); 
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/admin/login");
    toast.info("Oturum kapatıldı.");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-navy-900 text-navy-700 dark:text-white font-sans overflow-x-hidden">
      {/* Sidebar - Modular Component */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={logout} />

      <div className="flex-1 flex flex-col min-w-0 ml-72 relative">
        {/* Top Navigation - Modular Component */}
        <div className="px-4">
          <TopNav languages={languages} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
               <Loader2 className="h-10 w-10 animate-spin text-navy-700/20 dark:text-white/20" />
               <p className="text-xs font-bold uppercase tracking-widest text-navy-700/40 dark:text-white/20">Veriler Senkronize Ediliyor...</p>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in duration-700">
              {activeTab === "overview" && <DashboardOverview />}
              
              {activeTab === "languages" ? (
                 <LanguageManager languages={languages} onSave={(l: any) => handleSave("languages", l)} />
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {data[activeTab]?.length > 0 ? (
                    data[activeTab]?.map((item: any) => (
                      <ModuleCard key={item.id} type={activeTab} item={item} languages={languages} onSave={(upd: any) => handleSave(activeTab, upd)} />
                    ))
                  ) : activeTab !== "overview" && (
                    <Card className="p-16 bg-white dark:bg-navy-800 border-none shadow-horizon flex flex-col items-center justify-center rounded-2xl min-h-[400px]">
                       <Database className="h-12 w-12 text-navy-700/5 dark:text-white/5 mb-6" />
                       <p className="text-xs font-bold uppercase tracking-widest text-navy-700/20 dark:text-white/20">Henüz kayıtlı veri bulunamadı.</p>
                       <Button className="mt-6 bg-navy-700 dark:bg-white text-white dark:text-navy-900 rounded-xl px-8 h-12 font-bold text-xs uppercase tracking-wide">
                          Yeni Kayıt Ekle
                       </Button>
                    </Card>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="h-20" />
        </main>
      </div>
    </div>
  );
};

// Overview Statistics Component
const DashboardOverview = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatCard icon={Globe} label="Aktif Diller" value="3" sub="TR, EN, AR" />
    <StatCard icon={Trophy} label="Projeler" value="12" sub="+2 Tamamlandı" />
    <StatCard icon={Database} label="İçerik" value="84" sub="Tüm Modüller" />
    <StatCard icon={Shield} label="Güvenlik" value="SSL" sub="Aktif Bağlantı" />
    
    <div className="col-span-full mt-4 p-8 bg-white dark:bg-navy-800 rounded-2xl shadow-horizon flex items-center justify-between group overflow-hidden">
      <div>
        <h4 className="text-2xl font-bold text-navy-700 dark:text-white mb-1">Hoş Geldiniz, Yönetici</h4>
        <p className="text-xs font-medium text-gray-400 dark:text-white/40 uppercase tracking-widest leading-loose">
          Sistem genel durumu optimize edildi. Günlük yedekleme başarıyla tamamlandı.
        </p>
      </div>
      <div className="h-14 w-14 bg-gray-50 dark:bg-navy-900 rounded-2xl flex items-center justify-center text-navy-700 dark:text-white shadow-inner">
        <Activity className="h-6 w-6" />
      </div>
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, sub }: any) => (
  <Card className="bg-white dark:bg-navy-800 border-none p-5 rounded-2xl shadow-horizon group transition-all hover:scale-[1.02]">
    <div className="flex items-center">
      <div className="h-14 w-14 bg-gray-50 dark:bg-navy-900 rounded-full flex items-center justify-center text-navy-700 dark:text-white mr-4 transition-all group-hover:bg-navy-700 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-navy-900">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest">{label}</p>
        <h3 className="text-2xl font-bold text-navy-700 dark:text-white leading-tight">{value}</h3>
        <p className="text-[11px] font-medium text-navy-700/40 dark:text-white/20 mt-1">{sub}</p>
      </div>
    </div>
  </Card>
);

export default Dashboard;
