import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import gavioesWallpaper from "@/assets/gavioes-wallpaper.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

const MyInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden">
      <img
        src={gavioesWallpaper}
        alt="Gaviões da Fiel background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="p-4 flex items-center space-x-4 sticky top-0 bg-black/80 backdrop-blur-sm z-20 border-b border-gray-800">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Minhas informações</h1>
        </header>

        <main className="flex-grow p-6 flex flex-col justify-center">
          <div className="w-full max-w-sm mx-auto space-y-5">
            <Button asChild className="w-full bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-200 h-14">
              <Link to="/settings/edit-social">Redes Sociais</Link>
            </Button>
            <Button asChild className="w-full bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-200 h-14">
              <Link to="/settings/edit-address">Endereço</Link>
            </Button>
            <Button asChild className="w-full bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-200 h-14">
              <Link to="/settings/edit-health">Dados de Saúde</Link>
            </Button>
            <Button asChild className="w-full bg-white text-black font-bold rounded-xl text-lg hover:bg-gray-200 h-14">
              <Link to="/settings/edit-emergency-contact">Contatos de Emergência</Link>
            </Button>
          </div>
        </main>

        <footer className="p-6 flex justify-center">
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-40 h-auto"
          />
        </footer>
      </div>
    </div>
  );
};

export default MyInfo;