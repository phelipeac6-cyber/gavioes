import { BottomNav } from "./BottomNav";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";

interface MainLayoutProps {
  children: React.ReactNode;
  bgImage?: string;
}

export const MainLayout = ({ children, bgImage }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white font-sans relative">
      {bgImage && (
        <img
          src={bgImage}
          alt="Gaviões da Fiel background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
        />
      )}
      <div className="relative z-10">
        <div className="pb-40">{children}</div>
      </div>
      
      <footer className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none z-10">
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