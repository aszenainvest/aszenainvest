import { 
  Search, Globe, Mail, MapPin, 
  Bell, ChevronDown, UserCircle,
  Settings, LogOut
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Language {
  code: string;
  is_active: boolean;
}

interface TopNavProps {
  languages: Language[];
  user?: any;
}

export const TopNav = ({ languages, user }: TopNavProps) => {
  const activeLangs = languages.filter(l => l.is_active);

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d] mx-1">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-xs font-normal text-navy-700 hover:underline dark:text-white dark:hover:text-white"
            href=" "
          >
            Yönetim
            <span className="mx-1 text-xs text-navy-700 hover:text-navy-700 dark:text-white">
              {" "}
              /{" "}
            </span>
          </a>
          <span className="text-xs font-normal capitalize text-navy-700 dark:text-white">
            Panel
          </span>
        </div>
        <p className="shrink text-[28px] capitalize text-navy-700 dark:text-white">
          <span className="font-bold capitalize hover:text-navy-700 dark:hover:text-white">
            Genel Bakış
          </span>
        </p>
      </div>

      <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-horizon dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
        <div className="flex h-full items-center rounded-full bg-gray-50 text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <Search className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Sistemde Ara..."
            className="block h-full w-full rounded-full bg-gray-50 text-xs font-medium text-navy-700 outline-none placeholder:text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:text-white sm:w-fit"
          />
        </div>
        
        <div className="flex items-center gap-1">
          <button className="h-10 w-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
            <Bell className="h-4 w-4" />
          </button>
          <button className="h-10 w-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 transition-all">
            <Settings className="h-4 w-4" />
          </button>
        </div>

        {/* Profile & Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 focus:outline-none group">
            <Avatar className="h-10 w-10 border border-white/10 ring-2 ring-gray-100 dark:ring-white/5">
              <AvatarFallback className="bg-navy-700 text-white text-[11px] font-bold">AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white dark:bg-navy-700 dark:text-white rounded-2xl mt-4 mr-4 p-2 shadow-horizon border-none" align="end">
            <DropdownMenuLabel className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-4 py-3">👋 Merhaba, Admin</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-white/5" />
            <DropdownMenuItem className="focus:bg-gray-50 dark:focus:bg-white/5 py-3 px-4 rounded-xl cursor-pointer transition-colors text-sm font-medium">
               Profil Ayarları
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-gray-50 dark:focus:bg-white/5 py-3 px-4 rounded-xl cursor-pointer transition-colors text-sm font-medium">
               Sistem Ayarları
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-100 dark:bg-white/5" />
            <DropdownMenuItem className="focus:bg-red-50 text-red-500 py-3 px-4 rounded-xl cursor-pointer transition-colors text-sm font-bold">
               Oturumu Kapat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};
