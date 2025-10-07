import { BottomNav } from "./BottomNav";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="pb-40">{/* Padding for sponsor logo and nav */}
        {children}
      </div>
      
      <footer className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none">
        <img
          src={esportesDaSorteLogo}
          alt="Esportes da Sorte Logo"
          className="w-40 h-auto"
        />
      </footer>
      <BottomNav />
    </div>
  );
};