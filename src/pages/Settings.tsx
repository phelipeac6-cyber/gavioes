import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronRight,
  CheckCircle2,
  Shield,
  LogOut,
  User,
  X,
  Mail,
  IdCard,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { BottomNav } from "@/components/BottomNav";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

const Settings = () => {
  const { profile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const renderProfileSection = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl">
          <Skeleton className="w-12 h-12 rounded-full" />
          <Skeleton className="h-6 w-24" />
        </div>
      );
    }

    if (profile) {
      return (
        <div className="flex items-center space-x-4 p-4 bg-white rounded-2xl text-black">
          <div className="relative">
            <Avatar className="w-12 h-12">
              <AvatarImage src={profile.avatar_url || ""} alt={profile.first_name || ""} />
              <AvatarFallback>
                {profile.first_name ? profile.first_name.charAt(0) : <User />}
              </AvatarFallback>
            </Avatar>
            <CheckCircle2
              size={20}
              className="absolute -bottom-1 -right-1 text-yellow-400 bg-white rounded-full"
              fill="white"
            />
          </div>
          <h2 className="text-xl font-bold">{profile.first_name}</h2>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-black min-h-screen font-sans text-white">
      <header className="p-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-2xl font-bold">Configurações</h1>
        <button onClick={() => navigate(-1)} className="p-2">
          <X size={28} />
        </button>
      </header>

      <main className="p-4 space-y-4 pb-32">
        {renderProfileSection()}

        <div className="bg-white rounded-2xl divide-y divide-gray-200 text-black">
          <SettingsLink to="/settings/my-info" text="Minhas informações" icon={IdCard} />
          <SettingsLink to="/socio" text="Gavião socio" icon={Mail} />
          <SettingsLink to="/privacy-policy" text="Política de Privacidade" icon={Shield} />
        </div>

        <div
          onClick={signOut}
          className="flex items-center space-x-4 p-4 bg-white rounded-2xl text-black cursor-pointer"
        >
          <div className="p-2 bg-gray-100 rounded-full">
            <LogOut size={20} className="text-gray-800" />
          </div>
          <span className="font-semibold">Sair</span>
        </div>

        <div className="pt-8 flex justify-center">
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-40 h-auto"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

const SettingsLink = ({ to, text, icon: Icon }: { to: string; text: string; icon: React.ElementType }) => (
  <Link to={to} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-gray-100 rounded-full">
        <Icon size={20} className="text-gray-800" />
      </div>
      <span className="font-semibold">{text}</span>
    </div>
    <ChevronRight className="text-gray-400" />
  </Link>
);

export default Settings;