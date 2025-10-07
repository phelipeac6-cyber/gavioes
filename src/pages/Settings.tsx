import { Link } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { ChevronRight, Lock, Bell, Shield } from "lucide-react";

const settingsItems = [
  { to: "#", icon: Lock, label: "Alterar Senha" },
  { to: "#", icon: Bell, label: "Notificações" },
  { to: "#", icon: Shield, label: "Privacidade" },
];

const Settings = () => {
  return (
    <MainLayout>
      <header className="p-4 flex items-center border-b border-gray-800 sticky top-0 bg-black z-10">
        <h1 className="text-xl font-bold mx-auto">Configurações</h1>
      </header>
      <div className="p-6 flex flex-col justify-between h-[calc(100vh-140px)]">
        <nav className="space-y-2">
          {settingsItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center justify-between p-4 bg-gray-900 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <item.icon size={24} />
                <span className="font-semibold">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </Link>
          ))}
        </nav>
        <Button variant="destructive" className="w-full h-12 text-lg">
          Sair
        </Button>
      </div>
    </MainLayout>
  );
};

export default Settings;