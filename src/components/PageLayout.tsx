import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { useCart } from "@/context/CartContext";
import { BottomNav } from "./BottomNav";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  showSponsor?: boolean;
}

export const PageLayout = ({ title, children, showSponsor = true }: PageLayoutProps) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-white text-[#1800AD] flex flex-col font-sans">
      <header className="p-4 flex items-center justify-between border-b border-[#1800AD]/20 sticky top-0 bg-white z-10">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 text-[#1800AD]">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <Link to="/cart" className="relative p-2 text-[#1800AD]">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-[#1800AD] text-white text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </header>
      <main className="flex-grow p-6 overflow-y-auto pb-24">
        {children}
        {showSponsor && (
          <footer className="pt-8 flex justify-center">
            <img
              src={esportesDaSorteLogo}
              alt="Esportes da Sorte Logo"
              className="w-40 h-auto"
            />
          </footer>
        )}
      </main>
      <BottomNav />
    </div>
  );
};