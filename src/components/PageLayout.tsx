import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  showSponsor?: boolean;
}

export const PageLayout = ({ title, children, showSponsor = true }: PageLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="p-4 flex items-center space-x-4 border-b border-gray-800 sticky top-0 bg-black z-10">
        <button onClick={() => navigate(-1)} className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">{title}</h1>
      </header>
      <main className="flex-grow p-6 overflow-y-auto">
        {children}
      </main>
      {showSponsor && (
        <footer className="p-6 flex justify-center">
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-40 h-auto"
          />
        </footer>
      )}
    </div>
  );
};