import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, User, Shield, Bell, HelpCircle, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Settings = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md p-4 flex items-center space-x-4">
        <Link to={profile ? `/profile/${profile.username}` : "/"}>
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold">Configurações</h1>
      </header>

      {/* Profile Section */}
      {profile && (
        <div className="p-4">
          <Link to="/settings/profile" className="flex items-center space-x-4 bg-white p-4 rounded-2xl shadow">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatar_url} alt={`${profile.first_name} ${profile.last_name}`} />
              <AvatarFallback>{getInitials(profile.first_name, profile.last_name)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-lg">{`${profile.first_name} ${profile.last_name}`}</h2>
              <p className="text-gray-600">Ver seu perfil</p>
            </div>
          </Link>
        </div>
      )}

      {/* Settings Menu */}
      <div className="p-4 space-y-4">
        {/* Account Settings */}
        <div className="bg-white text-black rounded-2xl">
          <h3 className="p-4 font-bold text-gray-500 text-sm">CONTA</h3>
          <Link to="/settings/account" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t">
            <User size={24} className="text-gray-700" />
            <span className="font-semibold">Editar Perfil</span>
          </Link>
          <Link to="/settings/security" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t">
            <Shield size={24} className="text-gray-700" />
            <span className="font-semibold">Segurança</span>
          </Link>
          <Link to="/settings/notifications" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t">
            <Bell size={24} className="text-gray-700" />
            <span className="font-semibold">Notificações</span>
          </Link>
        </div>

        {/* Support Settings */}
        <div className="bg-white text-black rounded-2xl">
          <h3 className="p-4 font-bold text-gray-500 text-sm">SUPORTE</h3>
          <Link to="/settings/help" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t">
            <HelpCircle size={24} className="text-gray-700" />
            <span className="font-semibold">Ajuda e Suporte</span>
          </Link>
          <Link to="/settings/about" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t">
            <Info size={24} className="text-gray-700" />
            <span className="font-semibold">Sobre</span>
          </Link>
        </div>

        {/* Logout */}
        <div className="bg-white text-black rounded-2xl">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start p-4 space-x-4 text-base"
            onClick={handleSignOut}
          >
            <LogOut size={24} className="text-gray-700" />
            <span className="font-semibold">Sair</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;