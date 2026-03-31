import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Globe, Plus, Trash2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LanguageManagerProps {
  languages: any[];
  onSave: (lang: any) => void;
}

export const LanguageManager = ({ languages, onSave }: LanguageManagerProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-700">
    {/* Add New Language Placeholder */}
    <Card className="group bg-white dark:bg-navy-800 border-2 border-dashed border-gray-100 dark:border-white/5 hover:border-navy-700 dark:hover:border-white transition-all duration-300 rounded-2xl min-h-[200px] flex flex-col items-center justify-center cursor-pointer p-8 shadow-sm hover:shadow-horizon">
      <div className="h-14 w-14 bg-gray-50 dark:bg-navy-900 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-navy-700 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-navy-900 transition-all mb-4">
        <Plus className="h-6 w-6" />
      </div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-white/40 group-hover:text-navy-700 dark:group-hover:text-white transition-colors">Yeni Dil Entegre Et</p>
    </Card>

    {languages.map((l: any) => (
      <Card key={l.id} className="relative bg-white dark:bg-navy-800 border-none shadow-horizon p-6 rounded-2xl group overflow-hidden">
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-4">
            <Badge className="bg-gray-50 dark:bg-navy-900 text-navy-700 dark:text-white font-bold uppercase text-[10px] py-1.5 px-4 rounded-lg border-none">
              {l.code}
            </Badge>
            <div>
              <h4 className="text-xl font-bold uppercase tracking-tight text-navy-700 dark:text-white">{l.name}</h4>
              <p className="text-[10px] text-gray-400 dark:text-white/20 font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                {l.is_default ? (
                  <>
                    <Globe className="h-3 w-3 text-navy-700 dark:text-white" />
                    <span>Sistem Ana Dili</span>
                  </>
                ) : (
                  <span>Alternatif Dil</span>
                )}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 items-end">
             <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold text-gray-300 dark:text-white/20 uppercase tracking-widest">AKTİF</span>
                <Switch 
                  checked={l.is_active} 
                  onCheckedChange={(val) => onSave({...l, is_active: val})} 
                  className="data-[state=checked]:bg-navy-700 dark:data-[state=checked]:bg-white"
                />
             </div>
             <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-200 dark:text-white/10 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                <Trash2 className="h-4 w-4" />
             </Button>
          </div>
        </div>

        {/* Translation Progress Area */}
        <div className="space-y-3 mt-6 relative z-10">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-white/30">
            <span>Çeviri Bütünlüğü</span>
            <span className="text-navy-700 dark:text-white">92%</span>
          </div>
          <div className="h-2 w-full bg-gray-50 dark:bg-navy-900 rounded-full overflow-hidden">
            <div className="h-full bg-navy-700 dark:bg-white rounded-full w-[92%] transition-all duration-1000" />
          </div>
        </div>

        {/* Decorative background icon */}
        <Languages className="absolute -bottom-6 -right-6 h-28 w-28 text-gray-50 dark:text-white/[0.03] -rotate-12 group-hover:rotate-0 transition-transform duration-1000 select-none pointer-events-none" />
      </Card>
    ))}
  </div>
);
