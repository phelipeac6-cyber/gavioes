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

  useEffect(() => {
    if (authLoading || isMobile === undefined) {
      return;
    }

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isDashboardLoginRoute = location.pathname === '/dashboard/login';
    const isProfileRoute = location.pathname.startsWith('/profile/'); // Exceção para perfis públicos

    // --- Lógica para Desktop ---
    if (!isMobile) {
      // Se tentar acessar uma página do dashboard sem estar logado, redireciona para o login
      if (isDashboardRoute && !isDashboardLoginRoute && !profile) {
        navigate('/dashboard/login', { replace: true });
        return;
      }
      // Se estiver logado e na página de login, redireciona para o dashboard
      if (isDashboardLoginRoute && profile) {
        navigate('/dashboard', { replace: true });
        return;
      }
      // Se estiver em uma página apenas para mobile (e não for uma página pública como o perfil), redireciona para o dashboard
      if (!isDashboardRoute && !isProfileRoute) {
        navigate('/dashboard', { replace: true });
        return;
      }
    }
    // --- Lógica para Mobile ---
    else {
      // Se estiver em uma página do dashboard, redireciona para a home/login do mobile
      if (isDashboardRoute) {
        if (profile?.username) {
          navigate(`/profile/${profile.username}`, { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }
    }
  }, [isMobile, location.pathname, navigate, profile, authLoading]);

  if (authLoading || isMobile === undefined) {
    return null;
  }

  return <>{children}</>;
};