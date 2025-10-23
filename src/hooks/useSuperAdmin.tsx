import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

export const useSuperAdmin = () => {
  const { user, profile } = useAuth();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSuperAdmin = async () => {
      if (!user || !profile) {
        setIsSuperAdmin(false);
        setLoading(false);
        return;
      }

      // Verificar se o usuário atual é super admin
      if (profile.role === 'super_admin' && profile.email === 'phelipeac3@gmail.com') {
        setIsSuperAdmin(true);
      } else {
        setIsSuperAdmin(false);
      }
      setLoading(false);
    };

    checkSuperAdmin();
  }, [user, profile]);

  const canManagePulses = () => {
    return isSuperAdmin;
  };

  const canManageUsers = () => {
    return isSuperAdmin;
  };

  const canAccessAllProfiles = () => {
    return isSuperAdmin;
  };

  const canAccessAdminPanel = () => {
    return isSuperAdmin;
  };

  return {
    isSuperAdmin,
    loading,
    canManagePulses,
    canManageUsers,
    canAccessAllProfiles,
    canAccessAdminPanel
  };
};