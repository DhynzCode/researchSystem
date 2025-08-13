import { UserProfile } from '../types/auth';
import { AccountStatus, DASHBOARD_ROUTES, LOGIN_ERROR_MESSAGES } from '../types/login';

// Determine account status based on user profile
export const getAccountStatus = (user: UserProfile | null): AccountStatus => {
  if (!user) {
    return AccountStatus.ACTIVE; // Default for non-authenticated state
  }

  // TEMPORARILY DISABLE EMAIL VERIFICATION FOR TESTING
  // if (!user.emailVerified) {
  //   return AccountStatus.EMAIL_NOT_VERIFIED;
  // }

  // TEMPORARILY DISABLE PENDING APPROVAL FOR TESTING
  // if (user.role === 'research_teacher' && user.status === 'pending_approval') {
  //   return AccountStatus.PENDING_APPROVAL;
  // }

  // Add logic for suspended accounts if needed
  // if (user.suspended) {
  //   return AccountStatus.SUSPENDED;
  // }

  return AccountStatus.ACTIVE;
};

// Get role-based redirect path
export const getRoleBasedRedirect = (user: UserProfile): string => {
  return DASHBOARD_ROUTES[user.role] || '/dashboard';
};

// Check if user can access the system
export const canUserAccessSystem = (user: UserProfile): boolean => {
  const status = getAccountStatus(user);
  return status === AccountStatus.ACTIVE;
};

// Get user-friendly error message
export const getLoginErrorMessage = (errorCode: string): string => {
  return LOGIN_ERROR_MESSAGES[errorCode] || LOGIN_ERROR_MESSAGES.default;
};

// Validate login requirements
export const validateLoginRequirements = (user: UserProfile): {
  canLogin: boolean;
  message?: string;
  requiresAction?: 'verify-email' | 'wait-approval' | 'contact-support';
} => {
  const status = getAccountStatus(user);
  
  console.log('User validation - Status:', status);
  console.log('User validation - Email verified:', user.emailVerified);
  console.log('User validation - Role:', user.role);
  console.log('User validation - Role status:', user.status);

  switch (status) {
    case AccountStatus.EMAIL_NOT_VERIFIED:
      return {
        canLogin: false,
        message: 'Please verify your email address before signing in. Check your inbox for a verification link.',
        requiresAction: 'verify-email'
      };

    case AccountStatus.PENDING_APPROVAL:
      return {
        canLogin: false,
        message: 'Your account is pending approval from the Research Director. You will receive an email notification once approved.',
        requiresAction: 'wait-approval'
      };

    case AccountStatus.SUSPENDED:
      return {
        canLogin: false,
        message: 'Your account has been suspended. Please contact the system administrator for assistance.',
        requiresAction: 'contact-support'
      };

    case AccountStatus.ACTIVE:
      return {
        canLogin: true
      };

    default:
      return {
        canLogin: false,
        message: 'Unable to determine account status. Please contact support.',
        requiresAction: 'contact-support'
      };
  }
};

// Format role display name
export const formatRoleDisplayName = (role: string): string => {
  const roleMap: Record<string, string> = {
    research_teacher: 'Research Teacher',
    research_director: 'Research Director',
    research_staff: 'Research Staff',
    vpaa: 'VPAA',
    budget_office: 'Budget Office'
  };

  return roleMap[role] || role;
};

// Check if role has admin privileges
export const isAdminRole = (role: string): boolean => {
  return ['research_director', 'research_staff', 'vpaa'].includes(role);
};

// Generate welcome message based on role and time
export const getWelcomeMessage = (user: UserProfile): string => {
  const hour = new Date().getHours();
  let timeGreeting = 'Good morning';
  
  if (hour >= 12 && hour < 17) {
    timeGreeting = 'Good afternoon';
  } else if (hour >= 17) {
    timeGreeting = 'Good evening';
  }

  const roleDisplay = formatRoleDisplayName(user.role);
  
  return `${timeGreeting}, ${user.displayName}! Welcome to the Research Panel System.`;
};

// Log user login activity (for future analytics/audit trail)
export const logLoginActivity = (user: UserProfile, loginMethod: 'email' | 'google') => {
  // This could be enhanced to send data to an analytics service
  console.log(`User ${user.uid} (${user.email}) logged in via ${loginMethod} at ${new Date().toISOString()}`);
  
  // Could implement actual logging to Firestore:
  // await addLog({
  //   userId: user.uid,
  //   action: 'login',
  //   method: loginMethod,
  //   timestamp: new Date(),
  //   userAgent: navigator.userAgent,
  //   ip: await getClientIP() // if available
  // });
};