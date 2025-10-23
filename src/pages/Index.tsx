"use client";

import { Link } from "react-router-dom";
import feelOneLogo from "@/assets/feel-one-logo.png";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-4">
      <div className="flex flex-col items-center">
        <p className="font-bold tracking-wider mb-6">A CORRENTE JAMAIS SE QUEBRARÁ</p>
        <img
          src={feelOneLogo}
          alt="Feel One Logo"
          className="w-64 h-auto"
        />
        <div className="mt-8 space-y-4 w-full max-w-xs">
          <Button asChild className="w-full bg-white text-black hover:bg-gray-200">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full border-white text-white hover:bg-gray-800 hover:text-white">
            <Link to="/register">Cadastro</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;