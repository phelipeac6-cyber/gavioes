import { Link } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, Instagram, Facebook, MessageCircle } from "lucide-react";
import gavioesLogo from "@/assets/gavioes-logo.png";

const Profile = () => {
  return (
    <MainLayout>
      <div className="relative flex flex-col items-center justify-center text-center p-6 min-h-[calc(100vh-160px)] overflow-hidden">
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="absolute inset-0 m-auto w-full max-w-md h-auto opacity-10 z-0"
        />
        <div className="relative z-10 flex flex-col items-center space-y-5">
          <div className="relative">
            <Avatar className="w-28 h-28">
              <AvatarImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
                alt="Alê"
              />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-1.5 border-2 border-black">
              <Check size={18} className="text-black" />
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Alê</h1>
            <p className="text-gray-400">Sub-Sede</p>
          </div>

          <p className="font-semibold text-lg">Presidente Gaviões</p>

          <div className="flex items-center space-x-6 pt-2">
            <Link to="#" className="text-white">
              <Instagram size={32} />
            </Link>
            <Link to="#">
              <div className="bg-white rounded-md p-1">
                <Facebook size={24} className="text-black" />
              </div>
            </Link>
            <Link to="#" className="text-white">
              <MessageCircle size={32} />
            </Link>
          </div>

          <nav className="grid grid-cols-3 gap-x-10 gap-y-6 text-lg font-semibold pt-4">
            <Link to="/news" className="hover:text-red-500 transition-colors">
              Noticias
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              Loja
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              Ingressos
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              Chat
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              Eventos
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              Enquete
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              Estatuto
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              Historia
            </Link>
            <Link to="#" className="hover:text-red-500 transition-colors">
              PodCast
            </Link>
          </nav>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;