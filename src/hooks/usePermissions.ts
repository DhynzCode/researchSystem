import { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ROLE_PERMISSIONS, RolePermissions } from '../types/auth';

export const usePermissions = (): RolePermissions & { 
  hasPermission: (permission: keyof RolePermissions) => boolean;
  isApprovedTeacher: boolean;
  isEmailVerified: boolean;
} => {
  const { user } = useAuth();

  const permissions = useMemo(() => {
    if (!user) {
      // Default permissions for unauthenticated users
      return {
        canCreatePanel: false,
        canApprovePanel: false,
        canViewAllPanels: false,
        canManageUsers: false,
        canViewReports: false,
        canManageBudget: false,
        canApproveTeachers: false,
        canViewDashboard: false,
      };
    }

    return ROLE_PERMISSIONS[user.role];
  }, [user]);

  const hasPermission = (permission: keyof RolePermissions): boolean => {
    return permissions[permission];
  };

  const isApprovedTeacher = useMemo(() => {
    return user?.role === 'research_teacher' && user?.status === 'approved';
  }, [user]);

  const isEmailVerified = useMemo(() => {
    return user?.emailVerified ?? false;
  }, [user]);

  return {
    ...permissions,
    hasPermission,
    isApprovedTeacher,
    isEmailVerified,
  };
};