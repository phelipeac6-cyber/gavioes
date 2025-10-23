"use client";

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import feelonelogo from "@/assets/feel-one-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { useAuth } from "@/context/AuthContext";
import { PwaInstallPrompt } from "@/components/PwaInstallPrompt";
import { useMemo } from "react";

const Index = () => {
  const location = useLocation();
  const { wristbandCode } = useAuth();

  const continuePath = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const codeFromParams = params.get("wristbandCode");
    if (codeFromParams) {
      return `/${codeFromParams}`;
    }
    if (wristbandCode) {
      return `/${wristbandCode}`;
    }
    return "/login";
  }, [location.search, wristbandCode]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white text-center p-4">
      <PwaInstallprompt />
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
        <div className="w-full text-center py-4">
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-48 h-auto mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;