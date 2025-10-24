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
  const { profile, loading: authLoading, wristbandCode } = useAuth();

  // Permitir a rota de setup do super admin incondicionalmente
  const isSuperAdminSetupRouteNow = location.pathname === '/dashboard/super-admin-setup';

  useEffect(() => {
    // Com isMobile sempre boolean, não precisamos aguardar authLoading para decidir navegação
    // Evita UI presa no "Carregando..."
    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isDashboardLoginRoute = location.pathname === '/dashboard/login';
    const isSuperAdminSetupRoute = location.pathname === '/dashboard/super-admin-setup';
    // Perfil pode ser por username (slug) ou por UUID (compatibilidade antiga)
    const isProfileRoute = /^\/([a-zA-Z0-9._-]+|[0-9a-fA-F-]{36})$/.test(location.pathname);
    const isEmergencyCardRoute = /^\/s\/[0-9a-fA-F-]{36}$/.test(location.pathname);
    const isChatRoute = location.pathname.startsWith('/channels') || location.pathname.startsWith('/chat/');

    if (isChatRoute && !profile) {
      navigate('/login', { replace: true });
      return;
    }

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
    } else {
      if (isDashboardRoute && !isSuperAdminSetupRoute) {
        if (wristbandCode) {
          navigate(`/${wristbandCode}`, { replace: true });
        } else {
          navigate('/register', { replace: true });
        }
      }
    }
  }, [isMobile, location.pathname, navigate, profile, wristbandCode]);

  // Se estiver na rota de setup do super admin, sempre renderizar os children
  if (isSuperAdminSetupRouteNow) {
    return <>{children}</>;
  }

  // Remover bloqueio por authLoading: renderiza a UI e deixa o efeito cuidar da navegação
  return <>{children}</>;
};