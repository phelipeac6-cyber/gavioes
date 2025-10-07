import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import esportesDaSorteLogo from "@/assets/esportes-da-sorte-logo.png";
import { useCart } from "@/context/CartContext";
import { BottomNav } from "./BottomNav";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
  showSponsor?: boolean;
}

export const PageLayout = ({ title, children, showSponsor = true }: PageLayoutProps) => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const mainRef = useRef<HTMLElement>(null);
  const [isSponsorVisible, setIsSponsorVisible] = useState(true);

  useEffect(() => {
    const mainElement = mainRef.current;

    const handleScroll = () => {
      if (mainElement) {
        // Hide the logo as soon as the user scrolls down even a little bit.
        const isScrolled = mainElement.scrollTop > 10;
        if (isScrolled) {
          setIsSponsorVisible(false);
        } else {
          setIsSponsorVisible(true);
        }
      }
    };

    // We need to attach the listener to the scrolling element.
    if (mainElement) {
      mainElement.addEventListener("scroll", handleScroll);
    }

    // Cleanup function to remove the listener when the component is unmounted.
    return () => {
      if (mainElement) {
        mainElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []); // The empty array ensures this effect runs only once after the component mounts.

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      <header className="p-4 flex items-center justify-between border-b border-gray-800 sticky top-0 bg-black z-10">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        <Link to="/cart" className="relative p-2">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </header>
      
      {/* This is the main scrollable area */}
      <main ref={mainRef} className="flex-grow p-6 overflow-y-auto pb-52">
        {children}
      </main>

      {showSponsor && (
        <footer
          className={cn(
            "fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none z-20 transition-all duration-300 ease-in-out",
            isSponsorVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full"
          )}
        >
          <img
            src={esportesDaSorteLogo}
            alt="Esportes da Sorte Logo"
            className="w-40 h-auto"
          />
        </footer>
      )}
      <BottomNav />
    </div>
  );
};