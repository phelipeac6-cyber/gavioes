import { Link, useNavigate } from "react-router-dom";
import { X, CheckCircle2, UserCog, Mail, Shield, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { BottomNav } from "@/components/BottomNav";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsLink = ({ icon: Icon, text, to }: { icon: React.ElementType, text: string, to: string }) => (
  <Link to={to} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-gray-800 rounded-md">
        <Icon size={20} className="text-white" />
      </div>
      <span className="font-semibold">{text}</span>
    </div>
    <ChevronRight size={20} className="text-gray-400" />
  </Link>
);

const Settings = () => {
  const { profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  if (!profile) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-black z-10">
        <div className="w-10"></div> {/* Spacer */}
        <h1 className="text-2xl font-bold">Configurações</h1>
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <X size={28} />
        </Button>
      </header>

      <main className="p-6 space-y-6 pb-32">
        <div className="bg-white text-black p-4 rounded-2xl flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={profile.avatar_url || ""} alt={profile.first_name || ""} />
              <AvatarFallback>{profile.first_name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <CheckCircle2
              size={20}
              className="absolute -bottom-1 -right-1 text-yellow-400 bg-white rounded-full"
              fill="white"
            />
          </div>
          <span className="font-bold text-xl">{profile.first_name}</span>
        </div>

        <div className="bg-white text-black rounded-2xl divide-y divide-gray-200">
          <SettingsLink icon={UserCog} text="Minhas informações" to="/settings/my-info" />
          <SettingsLink icon={Mail} text="Gavião socio" to="/socio" />
          <SettingsLink icon={Shield} text="Política de Privacidade" to="/privacy-policy" />
        </div>

        <div className="bg-white text-black rounded-2xl">
          <button onClick={handleSignOut} className="w-full flex items-center p-4 space-x-4 text-left hover:bg-gray-50 transition-colors rounded-2xl">
            <div className="p-2 bg-gray-800 rounded-md">
              <LogOut size={20} className="text-white" />
            </div>
            <span className="font-semibold">Sair</span>
          </button>
        </div>

        <div className="flex justify-center pt-8">
          <img src={esportesDaSorteLogo} alt="Esportes da Sorte" className="w-48" />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

const SettingsSkeleton = () => (
  <div className="min-h-screen bg-black text-white font-sans animate-pulse">
    <header className="p-4 flex items-center justify-between sticky top-0 bg-black z-10">
      <div className="w-10"></div>
      <h1 className="text-2xl font-bold">Configurações</h1>
      <div className="w-10 h-10"></div>
    </header>
    <main className="p-6 space-y-6 pb-32">
      <div className="bg-gray-800 p-4 rounded-2xl flex items-center space-x-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <Skeleton className="h-7 w-24 rounded-md" />
      </div>
      <div className="bg-gray-800 rounded-2xl p-4 space-y-4">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
      <div className="bg-gray-800 rounded-2xl p-4">
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </main>
  </div>
);

export default Settings;