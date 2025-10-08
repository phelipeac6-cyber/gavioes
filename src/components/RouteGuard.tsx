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
    // Wait until the device type and auth state are determined
    if (authLoading || isMobile === undefined) {
      return;
    }

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isIndexRoute = location.pathname === '/';

    // --- Desktop Logic ---
    if (!isMobile) {
      if (!isIndexRoute && !isDashboardRoute) {
        navigate('/dashboard', { replace: true });
      }
    }
    // --- Mobile Logic ---
    else {
      if (isDashboardRoute) {
        // If user is logged in, redirect to their profile, otherwise to login
        if (profile?.username) {
          navigate(`/profile/${profile.username}`, { replace: true });
        } else {
          navigate('/login', { replace: true });
        }
      }
    }
  }, [isMobile, location.pathname, navigate, profile, authLoading]);

  // Don't render anything until loading is complete to avoid content flashing
  if (authLoading || isMobile === undefined) {
    return null;
  }

  return <>{children}</>;
};