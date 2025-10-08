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
        <div className="pb-24"> {/* Padding for the fixed bottom nav */}
          {children}
          <footer className="pt-8 pb-4 flex justify-center">
            <img
              src={esportesDaSorteLogo}
              alt="Esportes da Sorte Logo"
              className="w-40 h-auto"
            />
          </footer>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};