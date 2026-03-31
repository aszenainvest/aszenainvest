import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock, User, ShieldCheck, Activity, ChevronRight, Globe, Fingerprint } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // --- DEVELOPMENT MOCK MODE ---
    if (username === "admin" && password === "admin123") {
       localStorage.setItem("admin_token", "mock_token_123");
       localStorage.setItem("admin_user", JSON.stringify({ username: "admin", full_name: "Yönetici (Mock)" }));
       toast.success("Geliştirici Erişimi: Mock login başarılı.");
       setTimeout(() => navigate("/admin/dashboard"), 1000);
       return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("admin_token", data.token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        toast.success("Sistem Erişimi Onaylandı. Admin paneline aktarılıyorsunuz.");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.error || "Giriş reddedildi. Kimlik bilgilerini kontrol edin.");
      }
    } catch (error) {
      toast.error("Sistem Bağlantı Hatası: Backend sunucusuna ulaşılamıyor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-navy-900 p-6 font-sans text-navy-700 dark:text-white transition-colors duration-500">
      
      <div className="w-full max-w-[450px] relative z-10 animate-in fade-in duration-700">
        
        {/* Brand / Title Section */}
        <div className="mb-10 text-center">
            <div className="h-16 w-16 rounded-2xl bg-white dark:bg-navy-800 flex items-center justify-center shadow-horizon mx-auto mb-6">
              <ShieldCheck className="h-8 w-8 text-navy-700 dark:text-white" />
            </div>
            <h1 className="text-3xl font-bold uppercase tracking-tight mb-2">Sistem Girişi</h1>
            <p className="text-sm font-medium text-gray-400 dark:text-white/40 uppercase tracking-widest px-8">
              Tanımlanmış yönetici hesabınızla oturum açın.
            </p>
        </div>

        <Card className="bg-white dark:bg-navy-800 border-none shadow-horizon rounded-2xl p-6 relative">
          <CardHeader className="p-0 mb-8 mt-4">
             <div className="flex items-center justify-center gap-3">
                <span className="h-[1px] w-8 bg-gray-100 dark:bg-white/10" />
                <span className="text-[10px] font-bold text-gray-300 dark:text-white/20 uppercase tracking-[0.4em]">Erişim Paneli</span>
                <span className="h-[1px] w-8 bg-gray-100 dark:bg-white/10" />
             </div>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest pl-1">Kullanıcı Tanımlayıcı</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white/20" />
                    <Input
                      type="text"
                      placeholder="admin_id"
                      className="pl-12 h-14 bg-gray-50 dark:bg-navy-900 border-none text-navy-700 dark:text-white focus-visible:ring-2 focus-visible:ring-navy-700/10 text-sm font-medium rounded-xl transition-all placeholder:text-gray-300 dark:placeholder:text-white/10"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between px-1">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest">Erişim Şifresi</label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-white/20" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-12 h-14 bg-gray-50 dark:bg-navy-900 border-none text-navy-700 dark:text-white focus-visible:ring-2 focus-visible:ring-navy-700/10 text-sm font-medium rounded-xl transition-all placeholder:text-gray-300 dark:placeholder:text-white/10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between gap-4 py-3 border-y border-gray-100 dark:border-white/5">
                 <div className="flex items-center gap-2 text-[9px] text-gray-300 dark:text-white/20 font-bold uppercase cursor-default">
                    <Activity className="h-3 w-3" /> Sunucu Aktif
                 </div>
                 <div className="flex items-center gap-2 text-[9px] text-gray-300 dark:text-white/20 font-bold uppercase cursor-default">
                    <Globe className="h-3 w-3" /> SSL TLS 1.3
                 </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-navy-700 dark:bg-white text-white dark:text-navy-900 hover:opacity-95 font-bold uppercase text-xs h-14 rounded-xl transition-all active:scale-[0.98] shadow-lg"
                disabled={loading}
              >
                 {loading ? "Doğrulanıyor..." : "Terminal Erişimi"} 
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <p className="mt-12 text-center text-[10px] font-bold text-gray-300 dark:text-white/10 uppercase tracking-[0.5em]">
          DATA PROTECTION • ASZENA INVEST
        </p>
      </div>
    </div>
  );
};

export default Login;
