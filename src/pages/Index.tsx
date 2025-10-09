import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import gavioesLogo from "@/assets/gavioes-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { profile, loading } = useAuth();

  const continuePath = loading ? "#" : (profile ? `/profile/${profile.username}` : "/login");

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-between p-8 text-center">
      <div className="w-full mt-8">
        <h1 className="text-5xl font-extrabold leading-tight">
          Bem Vindo
          <br />
          Gavião
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
        <Button asChild className="w-full bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 h-14">
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