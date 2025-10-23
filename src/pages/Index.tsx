import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gavioesLogo from "@/assets/gavioes-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { useAuth } from "@/context/AuthContext";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";

const Index = () => {
  const { profile, loading, wristbandCode } = useAuth();

  const generateProfileUrl = () => {
    if (!profile || !wristbandCode) return "/login";
    return `/${wristbandCode}`;
  };

  const continuePath = loading ? "#" : generateProfileUrl();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#1800AD] text-center p-4">
      <PwaInstallPrompt />
      <div className="w-full mt-8">
        <h1 className="text-5xl font-extrabold leading-tight">
          Bem Vindo
          <br />
          à Feel One
        </h1>
        <p className="mt-4 text-gray-300 max-w-xs mx-auto">
          A pulseira exclusiva, pensada para segurança de nossos Gaviões.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <p className="font-bold tracking-wider mb-6">A CORRENTE JAMAIS SE QUEBRARÁ</p>
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-64 h-auto"
        />
      </div>

      <div className="w-full max-w-sm space-y-6">
        <Button asChild className="w-full bg-white text-[#1800AD] hover:bg-gray-100">
          <Link to={continuePath}>Continuar</Link>
        </Button>
        <img
          src={esportesDaSorteLogo}
          alt="Esportes da Sorte Logo"
          className="w-40 h-auto mx-auto"
        />
      </div>
    </div>
  );
};

export default Index;