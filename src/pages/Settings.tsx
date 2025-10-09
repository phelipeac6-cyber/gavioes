import { Link } from "react-router-dom";
import { PageLayout } from "@/components/PageLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CheckCircle2,
  Bell,
  Shield,
  LogOut,
  Info,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Settings = () => {
  const { profile, loading, signOut } = useAuth();

  const renderProfileSection = () => {
    if (loading) {
      return (
        <div className="flex items-center space-x-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      );
    }

    if (profile) {
      return (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatar_url || ""} alt={profile.first_name || ""} />
              <AvatarFallback>
                {profile.first_name ? profile.first_name.charAt(0) : <User />}
              </AvatarFallback>
            </Avatar>
            <CheckCircle2
              size={20}
              className="absolute bottom-0 right-0 text-green-500 bg-black rounded-full"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h2>
            <p className="text-gray-400">Sócio Gaviões</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <PageLayout title="Configurações">
      <div className="space-y-8">
        {renderProfileSection()}

        <div className="space-y-4">
          <h3 className="text-lg font-bold">Conta</h3>
          <div className="bg-gray-800/50 rounded-2xl divide-y divide-gray-700">
            <SettingsLink to="/settings/my-info" text="Minhas informações" icon={Info} />
            <SettingsLink to="/notifications" text="Notificações" icon={Bell} />
            <SettingsLink to="/privacy-policy" text="Política de Privacidade" icon={Shield} />
          </div>
        </div>

        <Button
          onClick={signOut}
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10 text-base p-4"
        >
          <LogOut className="mr-3" size={20} />
          Sair
        </Button>
      </div>
    </PageLayout>
  );
};

const SettingsLink = ({ to, text, icon: Icon }: { to: string; text: string; icon: React.ElementType }) => (
  <Link to={to} className="flex items-center justify-between p-4 hover:bg-gray-700/50 transition-colors">
    <div className="flex items-center space-x-3">
      <Icon size={20} />
      <span className="font-semibold">{text}</span>
    </div>
    <ChevronRight className="text-gray-400" />
  </Link>
);

export default Settings;