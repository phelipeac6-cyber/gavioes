import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, User, Shield, Bell, Lock, HelpCircle, Info, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Settings() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="mb-4">Você precisa estar logado para ver esta página.</p>
        <Button onClick={() => navigate('/login')}>Ir para o Login</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-md mx-auto p-4 flex items-center">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} />
          </Button>
          <h1 className="text-xl font-bold mx-auto">Configurações</h1>
          <div className="w-8"></div>
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 pb-24">
        <div className="space-y-6">
          {/* Seção de Conta */}
          <div className="bg-white text-black rounded-2xl">
            <h2 className="text-lg font-bold p-4">Conta</h2>
            <Link to={`/profile/${profile.username}/edit`} className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t border-gray-200">
              <User size={24} className="text-gray-700" />
              <span className="font-semibold">Editar Perfil</span>
            </Link>
            <Link to="/settings/security" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t border-gray-200">
              <Shield size={24} className="text-gray-700" />
              <span className="font-semibold">Segurança</span>
            </Link>
            <Link to="/settings/notifications" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t border-gray-200">
              <Bell size={24} className="text-gray-700" />
              <span className="font-semibold">Notificações</span>
            </Link>
            <Link to="/settings/privacy" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t border-gray-200">
              <Lock size={24} className="text-gray-700" />
              <span className="font-semibold">Privacidade</span>
            </Link>
          </div>

          {/* Seção de Suporte e Sobre */}
          <div className="bg-white text-black rounded-2xl">
            <h2 className="text-lg font-bold p-4">Suporte & Sobre</h2>
            <Link to="/settings/help" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t border-gray-200">
              <HelpCircle size={24} className="text-gray-700" />
              <span className="font-semibold">Ajuda</span>
            </Link>
            <Link to="/settings/about" className="w-full flex items-center justify-start p-4 space-x-4 text-base border-t border-gray-200">
              <Info size={24} className="text-gray-700" />
              <span className="font-semibold">Sobre</span>
            </Link>
          </div>

          {/* Seção de Sair */}
          <div className="bg-white text-black rounded-2xl">
            <Button variant="ghost" className="w-full flex items-center justify-start p-4 space-x-4 text-base" onClick={handleSignOut}>
              <LogOut size={24} className="text-gray-700" />
              <span className="font-semibold">Sair</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}