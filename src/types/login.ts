import { UserRole } from './auth';

// Login form data interface
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Login form validation errors
export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

// Login form state
export interface LoginFormState {
  data: LoginFormData;
  errors: LoginFormErrors;
  isLoading: boolean;
  isGoogleLoading: boolean;
  showPassword: boolean;
}

// Login response interface
export interface LoginResponse {
  success: boolean;
  message: string;
  redirectPath?: string;
  requiresVerification?: boolean;
  requiresApproval?: boolean;
  user?: {
    uid: string;
    email: string;
    role: UserRole;
    status?: string;
    emailVerified: boolean;
  };
}

// Account status enum
export enum AccountStatus {
  ACTIVE = 'active',
  PENDING_APPROVAL = 'pending_approval',
  SUSPENDED = 'suspended',
  EMAIL_NOT_VERIFIED = 'email_not_verified'
}

// Forgot password form data
export interface ForgotPasswordData {
  email: string;
}

// Forgot password state
export interface ForgotPasswordState {
  data: ForgotPasswordData;
  error?: string;
  isLoading: boolean;
  isSubmitted: boolean;
}

// Role-based dashboard routes
export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  research_teacher: '/dashboard',
  research_director: '/admin/dashboard',
  research_staff: '/admin/dashboard',
  vpaa: '/vpaa/dashboard',
  budget_office: '/budget/dashboard'
};

// Login error types
export interface LoginError {
  code: string;
  message: string;
  userFriendlyMessage: string;
}

// Common Firebase auth error codes and their user-friendly messages
export const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  'auth/user-not-found': 'No account found with this email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/user-disabled': 'This account has been suspended. Please contact support.',
  'auth/too-many-requests': 'Too many failed login attempts. Please try again later.',
  'auth/network-request-failed': 'Network error. Please check your connection and try again.',
  'auth/invalid-credential': 'Invalid email or password. Please check your credentials.',
  'auth/account-exists-with-different-credential': 'An account already exists with this email but different sign-in method.',
  'auth/popup-closed-by-user': 'Sign-in was cancelled. Please try again.',
  'auth/popup-blocked': 'Pop-up blocked by browser. Please allow pop-ups for this site.',
  'default': 'An unexpected error occurred. Please try again.'
};