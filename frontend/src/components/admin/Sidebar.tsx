import { 
  LayoutDashboard, Globe, Menu as MenuIcon, 
  LayoutGrid, BarChart3, ShieldCheck, Trophy, 
  MousePointer2, Info, Construction, Briefcase, 
  CheckCircle2, TreeDeciduous, Activity, 
  Mail, LayoutPanelTop, Search, Settings, 
  LogOut 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const menuGroups = [
  {
    title: "Yönetim",
    items: [
      { id: "overview", label: "Genel Bakış", icon: LayoutDashboard },
      { id: "languages", label: "Dil Ayarları", icon: Globe },
      { id: "nav", label: "Navigasyon Menüsü", icon: MenuIcon },
    ],
  },
  {
    title: "Sayfa İçerikleri",
    items: [
      { id: "hero", label: "Hero Alanı", icon: LayoutGrid },
      { id: "stats", label: "İstatistikler", icon: BarChart3 },
      { id: "features", label: "Özellikler", icon: ShieldCheck },
      { id: "achievements", label: "Başarılarımız", icon: Trophy },
      { id: "cta", label: "Eylem Butonları", icon: MousePointer2 },
    ],
  },
  {
    title: "Kurumsal",
    items: [
      { id: "about", label: "Hakkımızda", icon: Info },
      { id: "projectDevelopment", label: "Proje Geliştirme", icon: Construction },
      { id: "projectManagement", label: "Proje Yönetimi", icon: Briefcase },
      { id: "completedProjects", label: "Tamamlanan Projeler", icon: CheckCircle2 },
      { id: "agriculture", label: "Tarım & Orman", icon: TreeDeciduous },
      { id: "lifestyle", label: "Yaşam Tarzı", icon: Activity },
    ],
  },
  {
    title: "Sistem",
    items: [
      { id: "contact", label: "İletişim Bilgileri", icon: Mail },
      { id: "footer", label: "Alt Bilgi (Footer)", icon: LayoutPanelTop },
      { id: "seo", label: "SEO Ayarları", icon: Search },
      { id: "settings", label: "Global Ayarlar", icon: Settings },
    ],
  },
];

export const Sidebar = ({ activeTab, setActiveTab, onLogout }: SidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white transition-all dark:!bg-navy-800 dark:text-white border-r border-gray-100 dark:border-white/5 z-50">
      {/* Brand */}
      <div className="mx-[56px] mt-[50px] flex items-center">
        <div className="mt-1 ml-1 h-2.5 font-sans text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          ASZENA <span className="font-medium">CMS</span>
        </div>
      </div>
      
      {/* Separator */}
      <div className="mt-[58px] mb-7 h-px bg-gray-200 dark:bg-white/10 mx-6" />

      {/* Nav Links */}
      <div className="overflow-y-auto h-[calc(100vh-250px)] custom-scrollbar px-2">
        {menuGroups.map((group) => (
          <div key={group.title} className="mb-8">
            <p className="pl-8 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30 mb-4">
              {group.title}
            </p>
            <ul className="space-y-2">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id} className="relative">
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={cn(
                        "flex w-full items-center py-3 pl-8 pr-4 transition-all duration-200 group",
                        isActive 
                          ? "text-navy-700 dark:text-white font-bold" 
                          : "text-gray-400 dark:text-white/40 hover:text-navy-700 dark:hover:text-white"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 mr-4 transition-colors",
                        isActive ? "text-navy-700 dark:text-white" : "text-gray-400 dark:text-white/20 group-hover:text-navy-700 dark:group-hover:text-white"
                      )} />
                      <span className="text-sm tracking-wide">{item.label}</span>
                    </button>
                    {isActive && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-l-full bg-navy-700 dark:bg-white transition-all" />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer / Logout */}
      <div className="absolute bottom-10 w-full px-6">
        <button 
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-3 py-4 rounded-2xl bg-gray-50 dark:bg-white/5 text-sm font-bold text-navy-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/5"
        >
          <LogOut className="h-4 w-4" /> 
          Sistemi Kapat
        </button>
      </div>
    </aside>
  );
};
