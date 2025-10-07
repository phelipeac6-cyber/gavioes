import { Button } from "@/components/ui/button";
import gavioesLogo from "@/assets/gavioes-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6 font-sans text-center">
      <div className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="space-y-3">
          <h1
            className="text-5xl md:text-6xl font-extrabold"
            style={{ textShadow: "0 0 8px rgba(255,255,255,0.3)" }}
          >
            Bem Vindo Gavião
          </h1>
          <p className="text-gray-300 max-w-xs mx-auto text-sm">
            A pulseira exclusiva, pensada para segurança de nossos Gaviões.
          </p>
          <p className="font-semibold tracking-wider text-xs pt-2">
            A CORRENTE JAMAIS SE QUEBRARÁ
          </p>
        </div>

        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-56 md:w-64 h-auto"
        />

        <Button asChild className="bg-white text-black font-bold rounded-lg text-lg hover:bg-gray-200 w-full max-w-[280px] h-14">
          <Link to="/login">Continuar</Link>
        </Button>
      </div>

      <div className="pt-8">
        <img
          src={esportesDaSorteLogo}
          alt="Esportes da Sorte Logo"
          className="w-40 h-auto"
        />
      </div>
    </div>
  );
};

export default Index;