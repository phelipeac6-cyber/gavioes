import { NavLink } from "react-router-dom";
import { Home, ClipboardList, HeartPulse, User, Bell } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const BottomNav = () => {
  const { profile, loading } = useAuth();
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

  const profilePath = loading ? "#" : (profile ? `/profile/${profile.username}` : "/login");
  const settingsPath = loading ? "#" : (profile ? "/settings" : "/login");

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
            <NavLink to={profilePath} className={getLinkClass} aria-label="Início">
              <Home size={28} fill="currentColor" />
            </NavLink>
            <NavLink to="/news" className={getLinkClass} aria-label="Notícias">
              <ClipboardList size={28} />
            </NavLink>
          </div>
          
          <div className="w-1/5" />

          <div className="flex justify-around w-2/5">
            <NavLink to={settingsPath} className={getLinkClass} aria-label="Configurações">
              <User size={28} fill="currentColor" />
            </NavLink>
            <NavLink to="/notifications" className={`${getLinkClass({ isActive: false })} relative`} aria-label="Notificações">
              <Bell size={28} fill="currentColor" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-600 border-2 border-white" />
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
};