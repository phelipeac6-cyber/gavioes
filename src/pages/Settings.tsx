import { Link, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ShieldCheck, Mail, FileText, LogOut, CheckCircle2, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { showSuccess, showError } from "@/utils/toast";

const Settings = () => {
  const navigate = useNavigate();
  const { profile, loading } = useAuth();

  const profilePath = loading ? "#" : (profile ? `/profile/${profile.username}` : "/login");

  const settingsItems = [
    { to: profilePath, icon: ShieldCheck, label: "Minhas informações" },
    { to: "/socio", icon: Mail, label: "Gavião socio" },
    { to: "/emergency-contact-form", icon: Phone, label: "Contato de Emergência" },
    { to: "#", icon: FileText, label: "Política de Privacidade" },
  ];

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      showError(error.message);
    } else {
      showSuccess("Você saiu com sucesso!");
      navigate('/login', { replace: true });
    }
  };

  return (
    <MainLayout>
      <header className="p-4 flex items-center justify-between sticky top-0 bg-black z-10">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <button onClick={() => navigate(-1)} className="p-2">
          <X size={28} />
        </button>
      </header>
      <main className="p-6 flex flex-col space-y-6">
        {/* User Info Card */}
        <div className="bg-white text-black p-4 rounded-2xl flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-14 h-14">
              <AvatarImage src={profile?.avatar_url || "https://github.com/shadcn.png"} alt={profile?.first_name} />
              <AvatarFallback>{profile?.first_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <CheckCircle2 size={20} className="absolute -bottom-1 -right-1 text-yellow-400 bg-white rounded-full" fill="white" />
          </div>
          <span className="font-bold text-xl">{loading ? "Carregando..." : profile?.first_name}</span>
        </div>

        {/* Settings Links Card */}
        <div className="bg-white text-black rounded-2xl">
          {settingsItems.map((item, index) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center justify-between p-4 ${index < settingsItems.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <item.icon size={24} className="text-gray-700" />
                <span className="font-semibold">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Logout Card */}
        <div className="bg-white text-black rounded-2xl">
          <Button onClick={handleLogout} variant="ghost" className="w-full flex items-center justify-start p-4 space-x-4 text-base">
            <LogOut size={24} className="text-gray-700" />
            <span className="font-semibold">Sair</span>
          </Button>
        </div>
      </main>
    </MainLayout>
  );
};

export default Settings;