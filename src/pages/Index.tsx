"use client";

import { Link, useLocation } from "react-router-dom";
import gavioesLogo from "@/assets/gavioes-logo.png";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

const Index = () => {
  const location = useLocation();
  const continuePath = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const wristbandCode = params.get("wristbandCode");
    if (wristbandCode) {
      return `/${wristbandCode}`;
    }
    return "/login";
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-[#1800AD] text-center p-4">
      <div className="flex flex-col items-center">
        <p className="font-bold tracking-wider mb-6">A CORRENTE JAMAIS SE QUEBRARÁ</p>
        <img
          src={gavioesLogo}
          alt="Gaviões da Fiel Logo"
          className="w-64 h-auto"
        />
        <div className="mt-8 space-y-4 w-full max-w-xs">
          <Button asChild className="w-full bg-[#1800AD] text-white hover:bg-[#1800AD]/90">
            <Link to={continuePath}>Continuar</Link>
          </Button>
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-48 h-auto mx-auto mt-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;