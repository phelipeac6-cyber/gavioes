import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  CreditCard,
  Heart,
  Users,
  Megaphone,
  Package,
  Calendar,
  Ticket,
  Building,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "#", icon: FileText, label: "Cadastros" },
  { to: "#", icon: BarChart2, label: "Analytics" },
  { to: "#", icon: CreditCard, label: "Pagamentos" },
  { to: "#", icon: Heart, label: "Saúde" },
  { to: "/dashboard/torcedores", icon: Users, label: "Torcedores" },
  { to: "#", icon: Megaphone, label: "Campanhas" },
  { to: "#", icon: Package, label: "Produtos" },
  { to: "#", icon: Calendar, label: "Eventos" },
  { to: "#", icon: Ticket, label: "Ingressos" },
  { to: "#", icon: Building, label: "Sub-Sede" },
];

const generalNavItems = [
  { to: "#", icon: Settings, label: "Config" },
  { to: "#", icon: LogOut, label: "Sair" },
];

const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors",
        isActive ? "bg-teal-500 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
      )}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </Link>
  );
};

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-black text-white flex flex-col p-4 space-y-6",
          "transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">MENU</span>
          <button onClick={() => setIsOpen(false)} className="p-2 rounded-md hover:bg-gray-800 md:hidden">
            <X size={24} />
          </button>
        </div>
        <nav className="flex-grow space-y-2">
          {mainNavItems.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </nav>
        <div>
          <h3 className="text-gray-500 text-sm font-semibold px-4 mb-2">Geral</h3>
          <nav className="space-y-2">
            {generalNavItems.map((item) => (
              <NavLink key={item.label} {...item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};