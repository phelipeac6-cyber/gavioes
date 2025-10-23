import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import feelonelogo from "@/assets/feel-one-logo.png";
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
        </h1>
        <p className="mt-2 text-[#1800AD] max-w-xs mx-auto font-semibold">
          Pulseira pensada em vocês, para você
        </p>
      </div>

      <div className="flex flex-col items-center">
        <img
          src={feelonelogo}
          alt="FeelOne Logo"
          className="w-56 h-auto my-4"
        />
      </div>

      <div className="w-full max-w-sm space-y-6">
        <Button asChild className="w-full bg-[#1800AD] text-white hover:bg-[#1800AD]/90">
          <Link to={continuePath}>Continuar</Link>
        </Button>
        <div className="w-full bg-[#FF0000] text-black text-center py-4">
          Patrocinador
        </div>
      </div>
    </div>
  );
};

export default Index;