// User role types
export type UserRole = 
  | 'research_teacher' 
  | 'research_director' 
  | 'research_staff' 
  | 'vpaa' 
  | 'budget_office'
  | 'dean';

// Research teacher status
export type ResearchTeacherStatus = 'pending_approval' | 'approved';

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  status?: ResearchTeacherStatus; // Only for research_teacher role
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  department?: string;
  employeeId?: string;
  phoneNumber?: string;
  lastLogin?: Date;
}

// Role-based permissions interface
export interface RolePermissions {
  canCreatePanel: boolean;
  canApprovePanel: boolean;
  canViewAllPanels: boolean;
  canManageUsers: boolean;
  canViewReports: boolean;
  canManageBudget: boolean;
  canApproveTeachers: boolean;
  canViewDashboard: boolean;
}

// Permission mapping for each role
export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  research_teacher: {
    canCreatePanel: true,
    canApprovePanel: false,
    canViewAllPanels: false,
    canManageUsers: false,
    canViewReports: false,
    canManageBudget: false,
    canApproveTeachers: false,
    canViewDashboard: true,
  },
  research_director: {
    canCreatePanel: true,
    canApprovePanel: true,
    canViewAllPanels: true,
    canManageUsers: true,
    canViewReports: true,
    canManageBudget: false,
    canApproveTeachers: true,
    canViewDashboard: true,
  },
  research_staff: {
    canCreatePanel: false,
    canApprovePanel: false,
    canViewAllPanels: true,
    canManageUsers: false,
    canViewReports: true,
    canManageBudget: false,
    canApproveTeachers: false,
    canViewDashboard: true,
  },
  vpaa: {
    canCreatePanel: false,
    canApprovePanel: true,
    canViewAllPanels: true,
    canManageUsers: true,
    canViewReports: true,
    canManageBudget: true,
    canApproveTeachers: true,
    canViewDashboard: true,
  },
  budget_office: {
    canCreatePanel: false,
    canApprovePanel: false,
    canViewAllPanels: true,
    canManageUsers: false,
    canViewReports: true,
    canManageBudget: true,
    canApproveTeachers: false,
    canViewDashboard: true,
  },
  dean: {
    canCreatePanel: false,
    canApprovePanel: true,
    canViewAllPanels: true,
    canManageUsers: true,
    canViewReports: true,
    canManageBudget: true,
    canApproveTeachers: true,
    canViewDashboard: true,
  },
};

// Auth context interface
export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, role: UserRole) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
}

// Password validation interface
export interface PasswordValidation {
  isValid: boolean;
  errors: string[];
}

// Email validation interface
export interface EmailValidation {
  isValid: boolean;
  error?: string;
}