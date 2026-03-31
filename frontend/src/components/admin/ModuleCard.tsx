import { useState } from "react";
import { 
  Settings2, Save, Trash2, Globe, Flag, 
  ChevronRight, LayoutGrid, Info, Calendar, MapPin
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Define which fields are available for each module type
const FIELD_MAP: Record<string, { label: string; key: string; type: "input" | "textarea" }[]> = {
  hero: [
    { label: "Ana Başlık", key: "title", type: "input" },
    { label: "Alt Başlık", key: "subtitle", type: "textarea" },
    { label: "Buton Yazısı", key: "cta", type: "input" },
  ],
  stats: [
    { label: "Bölüm Başlığı", key: "title", type: "input" },
    { label: "Proje Geliştirme Etiketi", key: "projectDevelopment", type: "input" },
    { label: "Sözleşme Değeri Etiketi", key: "projectValue", type: "input" },
    { label: "Ödül Etiketi", key: "awardWinning", type: "input" },
  ],
  features: [
    { label: "Başlık", key: "title", type: "input" },
    { label: "Alt Başlık", key: "subtitle", type: "textarea" },
    { label: "Lokasyon - Başlık", key: "location_title", type: "input" },
    { label: "Lokasyon - Açıklama", key: "location_description", type: "textarea" },
    { label: "Uzmanlık - Başlık", key: "expertise_title", type: "input" },
    { label: "Uzmanlık - Açıklama", key: "expertise_description", type: "textarea" },
    { label: "Kalite - Başlık", key: "quality_title", type: "input" },
    { label: "Kalite - Açıklama", key: "quality_description", type: "textarea" },
  ],
  achievements: [
    { label: "Başlık", key: "title", type: "input" },
    { label: "Alt Başlık", key: "subtitle", type: "input" },
    { label: "Açıklama 1", key: "description", type: "textarea" },
    { label: "Açıklama 2", key: "description2", type: "textarea" },
    { label: "Gayrimenkul İstatistik Etiketi", key: "stats_realEstate", type: "input" },
    { label: "Proje Geliştirme İstatistik Etiketi", key: "stats_projectDevelopment", type: "input" },
    { label: "Yönetim İstatistik Etiketi", key: "stats_projectManagement", type: "input" },
  ],
  about: [
    { label: "Sayfa Başlığı", key: "title", type: "input" },
    { label: "Alt Başlık", key: "subtitle", type: "input" },
    { label: "Şirket Adı", key: "companyName", type: "input" },
    { label: "Hero Başlık", key: "heroTitle", type: "input" },
    { label: "Hero Alt Başlık", key: "heroSubtitle", type: "input" },
    { label: "Paragraf 1", key: "description1", type: "textarea" },
    { label: "Paragraf 2", key: "description2", type: "textarea" },
    { label: "Paragraf 3", key: "description3", type: "textarea" },
    { label: "Paragraf 4", key: "description4", type: "textarea" },
    { label: "Vizyon - Başlık", key: "vision_title", type: "input" },
    { label: "Vizyon - Açıklama", key: "vision_description", type: "textarea" },
    { label: "Misyon - Başlık", key: "mission_title", type: "input" },
    { label: "Misyon - Açıklama", key: "mission_description", type: "textarea" },
  ],
  projectDevelopment: [
    { label: "Sayfa Başlığı", key: "title", type: "input" },
    { label: "Alt Başlık", key: "subtitle", type: "input" },
    { label: "Genel Açıklama", key: "description", type: "textarea" },
    { label: "Fizibilite Paragrafı", key: "overview_p1", type: "textarea" },
    { label: "İnşaat Paragrafı", key: "overview_p2", type: "textarea" },
    { label: "Pazar Paragrafı", key: "overview_p3", type: "textarea" },
  ],
  agriculture: [
    { label: "Başlık", key: "title", type: "input" },
    { label: "Alt Başlık", key: "subtitle", type: "input" },
    { label: "Ana Açıklama", key: "description", type: "textarea" },
    { label: "Tarım - Başlık", key: "agriculture_title", type: "input" },
    { label: "Tarım - Açıklama", key: "agriculture_description", type: "textarea" },
    { label: "Orman - Başlık", key: "forest_title", type: "input" },
    { label: "Orman - Açıklama", key: "forest_description", type: "textarea" },
  ],
  lifestyle: [
    { label: "Başlık", key: "title", type: "input" },
    { label: "Alt Başlık", key: "subtitle", type: "input" },
    { label: "Ana Açıklama", key: "description", type: "textarea" },
    { label: "Alt Açıklama", key: "description2", type: "textarea" },
    { label: "Kuruluş Etiketi", key: "stats_founded", type: "input" },
    { label: "Kıyı Uzunluğu Etiketi", key: "stats_coastline", type: "input" },
    { label: "Ada Sayısı Etiketi", key: "stats_islands", type: "input" },
  ],
  seo: [
    { label: "Sayfa Başlığı (Title)", key: "title", type: "input" },
    { label: "Açıklama (Description)", key: "description", type: "textarea" },
    { label: "Anahtar Kelimeler (Keywords)", key: "keywords", type: "textarea" },
  ],
  footer: [
    { label: "Kısa Açıklama", key: "description", type: "textarea" },
    { label: "Slogan", key: "slogan", type: "input" },
    { label: "Slogan Çevirisi", key: "sloganTranslation", type: "input" },
    { label: "Telif Hakkı Yazısı", key: "copyright", type: "input" },
  ]
};

interface ModuleCardProps {
  type: string;
  item: any;
  languages: any[];
  onSave: (item: any) => void;
}

export const ModuleCard = ({ type, item, languages, onSave }: ModuleCardProps) => {
  const [localItem, setLocalItem] = useState(item);
  const activeLangs = languages.filter((l: any) => l.is_active);
  
  // Get fields for this type, or default to title/description if not found
  const fields = FIELD_MAP[type] || [
    { label: "Başlık", key: "title", type: "input" },
    { label: "Açıklama", key: "description", type: "textarea" },
  ];

  const updateTranslation = (lang: string, field: string, val: string) => {
    const updated = { ...localItem };
    if (!updated.translations) updated.translations = [];
    const index = updated.translations.findIndex((t: any) => t.language === lang && t.field === field);
    if (index > -1) {
      updated.translations[index].value = val;
    } else {
      updated.translations.push({ language: lang, field, value: val });
    }
    setLocalItem(updated);
  };

  return (
    <Card className="bg-white dark:bg-navy-800 border-none shadow-horizon overflow-hidden rounded-2xl mb-8">
      <CardHeader className="px-8 py-6 flex flex-row items-center justify-between border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-50 dark:bg-navy-900 rounded-xl flex items-center justify-center text-navy-700 dark:text-white">
            <LayoutGrid className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-navy-700 dark:text-white">
                {item.key || item.module_key || "İçerik Detayı"}
              </h3>
              <span className="text-[10px] font-bold text-navy-700/40 dark:text-white/20 uppercase tracking-widest bg-gray-50 dark:bg-navy-900 px-2 py-1 rounded-lg">{type}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
             <Trash2 className="h-4 w-4" />
           </Button>
           <Button 
            className="bg-navy-700 dark:bg-white text-white dark:text-navy-900 font-bold uppercase text-[10px] px-8 h-10 rounded-xl hover:opacity-90 transition-all shadow-lg" 
            onClick={() => onSave(localItem)}
          >
            Değişiklikleri Kaydet
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="space-y-12">
          {activeLangs.map((lang: any) => (
            <div key={lang.id} className="relative p-8 bg-gray-50 dark:bg-navy-900 rounded-3xl group/lang border border-transparent hover:border-navy-700/10 dark:hover:border-white/5 transition-all">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-8 rounded-xl bg-white dark:bg-navy-800 flex items-center justify-center text-navy-700 dark:text-white font-bold text-xs uppercase shadow-sm">
                  {lang.code}
                </div>
                <span className="text-xs font-bold text-navy-700 dark:text-white/40 uppercase tracking-widest">
                  {lang.name} Dilindeki İçerik
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {fields.map((f) => (
                  <div key={f.key} className={cn("space-y-2", f.type === "textarea" && "md:col-span-2")}>
                    <label className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest pl-1">{f.label}</label>
                    {f.type === "textarea" ? (
                      <Textarea 
                        className="bg-white dark:bg-navy-800 border-none min-h-[120px] rounded-xl focus-visible:ring-2 focus-visible:ring-navy-700/10 text-navy-700 dark:text-white placeholder:text-gray-300 resize-none transition-all leading-relaxed p-4 text-sm font-medium shadow-sm" 
                        placeholder={`${f.label} giriniz...`}
                        value={localItem.translations?.find((t: any) => t.language === lang.code && t.field === f.key)?.value || ""} 
                        onChange={(e) => updateTranslation(lang.code, f.key, e.target.value)} 
                      />
                    ) : (
                      <Input 
                        className="bg-white dark:bg-navy-800 border-none h-14 rounded-xl focus-visible:ring-2 focus-visible:ring-navy-700/10 text-navy-700 dark:text-white placeholder:text-gray-300 text-sm font-medium shadow-sm transition-all" 
                        placeholder={`${f.label} giriniz...`}
                        value={localItem.translations?.find((t: any) => t.language === lang.code && t.field === f.key)?.value || ""} 
                        onChange={(e) => updateTranslation(lang.code, f.key, e.target.value)} 
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
