import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import gavioesWallpaper from "@/assets/gavioes-wallpaper.png";
import gavioesLogo from "@/assets/gavioes-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { profile, loading } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <img
        src={gavioesWallpaper}
        alt="Gaviões da Fiel background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-48 h-48 mb-8"
        />
        <div className="w-full max-w-sm space-y-5">
          <Button asChild className="w-full bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-200 h-14">
            <Link to="/socio">Quero ser Sócio</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black h-14">
            <Link to="/store">Nossos Produtos</Link>
          </Button>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black h-14">
            <Link to="/events">Eventos</Link>
          </Button>
        </div>
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-40 h-auto"
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Index;