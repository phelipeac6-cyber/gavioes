import { NavLink, useLocation } from "react-router-dom";
import { Home, ClipboardList, HeartPulse, User, Bell, MessageCircle, HelpCircle, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const BottomNav = () => {
  const { profile, loading, wristbandCode } = useAuth();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (profile) {
      const fetchUnreadCount = async () => {
        const { count, error } = await supabase
          .from('notifications')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', profile.id)
          .eq('is_read', false);
        
        if (!error && count !== null) {
          setUnreadCount(count);
        }
      };

      fetchUnreadCount();

      const channel = supabase
        .channel('notifications_count')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${profile.id}` },
          (payload) => {
            console.log('Change received!', payload);
            fetchUnreadCount();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [profile]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${isActive ? "text-red-600" : "text-gray-900 hover:text-red-500"}`;

  const generateProfileUrl = () => {
    if (!profile) return "/login";
    return wristbandCode ? `/${wristbandCode}` : "/login";
  };

  const generateEmergencyCardUrl = () => {
    if (!profile) return "/login";
    return wristbandCode ? `/s/${wristbandCode}` : "/login";
  };

  const settingsPath = loading ? "#" : (profile ? "/settings" : "/login");

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 z-20 flex items-end justify-center pointer-events-none">
      <nav className="relative w-full max-w-md h-16 bg-white rounded-t-3xl shadow-[0_-4px_16px_rgba(0,0,0,0.1)] flex items-center justify-around pointer-events-auto">
        
        {/* Botão Central - Carteirinha de Emergência */}
        <NavLink
          to={generateEmergencyCardUrl()}
          className="absolute left-1/2 -translate-x-1/2 -top-8 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center border-4 border-black shadow-lg transition-transform hover:scale-105"
          aria-label="Carteirinha de Emergência"
        >
          <HeartPulse size={32} className="text-white" />
        </NavLink>

        {/* Menu Esquerdo */}
        <div className="flex justify-around w-2/5">
          <NavLink to={generateProfileUrl()} className={getLinkClass} aria-label="Início">
            <Home size={28} fill="currentColor" />
          </NavLink>
          <NavLink to="/news" className={getLinkClass} aria-label="Notícias">
            <ClipboardList size={28} />
          </NavLink>
        </div>
        
        {/* Espaço Central */}
        <div className="w-1/5" />

        {/* Menu Direito */}
        <div className="flex justify-around w-2/5">
          <NavLink to="/chat-list" className={getLinkClass} aria-label="Chat">
            <MessageCircle size={28} />
          </NavLink>
          
          {/* Menu Configurações com submenu */}
          <div className="relative group">
            <button className="relative p-2 text-gray-900 hover:text-red-500 transition-colors">
              <User size={28} fill="currentColor" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-600 border-2 border-white" />
              )}
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <NavLink 
                  to={settingsPath} 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Shield size={16} className="mr-2" />
                  Configurações
                </NavLink>
                <NavLink 
                  to="/privacy-settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Shield size={16} className="mr-2" />
                  Privacidade
                </NavLink>
                <NavLink 
                  to="/help-center" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <HelpCircle size={16} className="mr-2" />
                  Ajuda
                </NavLink>
                <NavLink 
                  to="/notifications" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Bell size={16} className="mr-2" />
                  Notificações
                  {unreadCount > 0 && (
                    <span className="ml-auto bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};