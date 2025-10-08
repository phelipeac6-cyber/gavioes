import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait until the device type is determined
    if (isMobile === undefined) {
      return;
    }

    const isDashboardRoute = location.pathname.startsWith('/dashboard');
    const isIndexRoute = location.pathname === '/';

    // --- Desktop Logic ---
    // If the user is on a desktop device...
    if (!isMobile) {
      // ...and they are not on the index page or a dashboard page...
      if (!isIndexRoute && !isDashboardRoute) {
        // ...redirect them to the dashboard.
        navigate('/dashboard', { replace: true });
      }
    }
    // --- Mobile Logic ---
    // If the user is on a mobile device...
    else {
      // ...and they try to access a dashboard page...
      if (isDashboardRoute) {
        // ...redirect them to the main profile page.
        navigate('/profile', { replace: true });
      }
    }
  }, [isMobile, location.pathname, navigate]);

  // Don't render anything until the device type is known to avoid content flashing
  if (isMobile === undefined) {
    return null;
  }

  return <>{children}</>;
};