import { Link } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, ChevronRight, HeartPulse, MapPin, Users, Award } from "lucide-react";

const menuItems = [
  { to: "/socio", icon: Award, label: "Sócio Gavião" },
  { to: "/health", icon: HeartPulse, label: "Dados de Saúde" },
  { to: "/address", icon: MapPin, label: "Endereço" },
  { to: "/social", icon: Users, label: "Redes Sociais" },
];

const Profile = () => {
  return (
    <MainLayout>
      <div className="p-6">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>GF</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Gavião Fiel</h1>
              <p className="text-gray-400">Sócio Torcedor</p>
            </div>
          </div>
          <Link to="/settings">
            <Settings size={24} className="text-gray-400" />
          </Link>
        </header>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
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
      </div>
    </MainLayout>
  );
};

export default Profile;