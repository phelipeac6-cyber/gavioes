import { NavLink } from "react-router-dom";
import { Home, ClipboardList, HeartPulse, User, Bell } from "lucide-react";

export const BottomNav = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? "text-red-600" : "text-gray-900 hover:text-red-500"}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 z-20 flex items-end justify-center pointer-events-none">
      <nav className="relative w-full max-w-md h-16 bg-white rounded-t-3xl shadow-[0_-4px_16px_rgba(0,0,0,0.1)] flex items-center justify-around pointer-events-auto">
        
        <NavLink
          to="/emergency-card"
          className="absolute left-1/2 -translate-x-1/2 -top-8 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center border-4 border-black shadow-lg transition-transform hover:scale-105"
          aria-label="Carteirinha de Emergência"
        >
          <HeartPulse size={32} className="text-white" />
        </NavLink>

        <div className="flex justify-around items-center w-full h-full">
          <div className="flex justify-around w-2/5">
            <NavLink to="/profile" className={getLinkClass} aria-label="Início">
              <Home size={28} fill="currentColor" />
            </NavLink>
            <NavLink to="/news" className={getLinkClass} aria-label="Notícias">
              <ClipboardList size={28} />
            </NavLink>
          </div>
          
          <div className="w-1/5" />

          <div className="flex justify-around w-2/5">
            <NavLink to="/settings" className={getLinkClass} aria-label="Configurações">
              <User size={28} fill="currentColor" />
            </NavLink>
            <NavLink to="#" className={getLinkClass} aria-label="Notificações">
              <Bell size={28} fill="currentColor" />
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};