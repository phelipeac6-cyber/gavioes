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
  const { wristbandCode } = useAuth();

  // Permitir a rota de setup do super admin incondicionalmente
  const isSuperAdminSetupRouteNow = location.pathname === '/dashboard/super-admin-setup';

  useEffect(() => {
    if (authLoading || isMobile === undefined) {
      return;
    }

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isDashboardLoginRoute = location.pathname === '/dashboard/login';
    const isSuperAdminSetupRoute = location.pathname === '/dashboard/super-admin-setup';
    // Perfil: '/:slug' onde slug é UUID (36 chars com hífens)
    const isProfileRoute = /^\/[0-9a-fA-F-]{36}$/.test(location.pathname);
    // Carteirinha: '/s/:slug' com UUID
    const isEmergencyCardRoute = /^\/s\/[0-9a-fA-F-]{36}$/.test(location.pathname);
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
      // Permite apenas dashboard, perfil '/UUID' e emergência '/s/UUID' no desktop
      if (!isDashboardRoute && !isProfileRoute && !isEmergencyCardRoute) {
        navigate('/dashboard', { replace: true });
        return;
      }
    }
    // --- Lógica para Mobile ---
    else {
      // Permitir acesso público à página de setup do super admin
      if (isDashboardRoute && !isSuperAdminSetupRoute) {
        if (wristbandCode) {
          // Redireciona para rota correta de perfil (/:slug) usando a pulseira atribuída
          navigate(`/${wristbandCode}`, { replace: true });
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