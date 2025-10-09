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
    const isProfileRoute = location.pathname.startsWith('/profile/');
    const isEmergencyCardRoute = location.pathname.startsWith('/emergency-card/');

    // --- Lógica para Desktop ---
    if (!isMobile) {
      if (isDashboardRoute && !isDashboardLoginRoute && !profile) {
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