import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, loading: authLoading } = useAuth();

  // Permitir a rota de setup do super admin incondicionalmente
  const isSuperAdminSetupRouteNow = location.pathname === '/dashboard/super-admin-setup';

  useEffect(() => {
    if (authLoading || isMobile === undefined) {
      return;
    }

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isDashboardLoginRoute = location.pathname === '/dashboard/login';
    const isSuperAdminSetupRoute = location.pathname === '/dashboard/super-admin-setup';
    const isProfileRoute = location.pathname.startsWith('/id=');
    const isEmergencyCardRoute = location.pathname.startsWith('/emergency-card/id=');
    const isChatRoute = location.pathname.startsWith('/channels') || location.pathname.startsWith('/chat/');

    if (isChatRoute && !profile) {
      navigate('/login', { replace: true });
      return;
    }

    // --- Lógica para Desktop ---
    if (!isMobile) {
      if (isDashboardRoute && !isDashboardLoginRoute && !isSuperAdminSetupRoute && !profile) {
        navigate('/dashboard/login', { replace: true });
        return;
      }
      if (isDashboardLoginRoute && profile) {
        navigate('/dashboard', { replace: true });
        return;
      }
      if (!isDashboardRoute && !isProfileRoute && !isEmergencyCardRoute) {
        navigate('/dashboard', { replace: true });
        return;
      }
    }
    // --- Lógica para Mobile ---
    else {
      // Permitir acesso público à página de setup do super admin
      if (isDashboardRoute && !isSuperAdminSetupRoute) {
        if (profile?.pulseira_id) {
          const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
          const encodedName = encodeURIComponent(fullName);
          navigate(`/id=${profile.pulseira_id}/${encodedName}`, { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }
    }
  }, [isMobile, location.pathname, navigate, profile, authLoading]);

  // Se estiver na rota de setup do super admin, sempre renderizar os children
  if (isSuperAdminSetupRouteNow) {
    return <>{children}</>;
  }

  if (authLoading || isMobile === undefined) {
    return null;
  }

  return <>{children}</>;
};