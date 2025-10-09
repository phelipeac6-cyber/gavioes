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

    // --- Desktop Logic ---
    if (!isMobile) {
      // If trying to access a dashboard page but not logged in, redirect to login
      if (isDashboardRoute && !isDashboardLoginRoute && !profile) {
        navigate('/dashboard/login', { replace: true });
        return;
      }
      // If logged in and on the login page, redirect to dashboard
      if (isDashboardLoginRoute && profile) {
        navigate('/dashboard', { replace: true });
        return;
      }
      // If on a mobile-only page, redirect to dashboard
      if (!isDashboardRoute) {
        navigate('/dashboard', { replace: true });
        return;
      }
    }
    // --- Mobile Logic ---
    else {
      // If on a dashboard page, redirect to mobile home/login
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