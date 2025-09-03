export type UserRole = 'Research Teacher' | 'CURI' | 'VPAA' | 'Finance Officer' | 'Dean';

export type ProgramLevel = 'Basic Education' | 'Tertiary Level (College & Off-site branches)' | 'SGS Masters & FS' | 'SGS Doctorate Program';

export type MatrixProgramLevel = 'basic education' | 'tertiary' | 'MA' | 'PhD';
export type Department = 'SAM' | 'SEICT' | 'SLAS' | 'SOE' | 'SBM' | 'SCJ';

export type DefenseType = 'Pre-Oral' | 'Final';

export type PanelRole = 'Advisor' | 'Adviser' | 'Chairperson' | 'Statistician' | 'Panel Member' | 'Validator' | 'Secretary' | 'Language Editor';

export type MatrixPanelRole = 'Advisor' | 'Panel Chairman' | 'Panel Member';
export type RequestStatus = 'Draft' | 'Pending' | 'Approved' | 'Flagged' | 'Returned';

export type DefenseRequestStatus = 
  | 'Draft' 
  | 'Research Center Approved' 
  | 'VPAA Approved' 
  | 'Dean Approved'
  | 'Budget Approved' 
  | 'Returned for Corrections' 
  | 'Rejected';

export interface StudentGroup {
  id: string;
  students: string[];
  researchTitle: string;
  panelMembers: PanelMember[];
}

export interface PanelMember {
  id: string;
  name: string;
  roles: PanelRole[]; // Changed from single role to multiple roles
  currentAppearances: number;
  isFlagged: boolean;
}

export interface PanelRequest {
  id: string;
  programChair: string;
  programLevel: ProgramLevel;
  department: Department;
  program: string;
  semester: string;
  defenseType: DefenseType;
  schoolYear: string;
  studentGroups: StudentGroup[];
  panelMembers: PanelMember[];
  status: RequestStatus;
  justificationLetter?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Faculty {
  id: string;
  name: string;
  department: Department;
  totalAppearances: number;
  currentSemesterAppearances: number;
  rolesPlayed: PanelRole[];
  isFlagged: boolean;
}

export interface HonorariumRate {
  role: PanelRole;
  rate: number;
}

export interface DashboardStats {
  totalRequests: number;
  preOralRequests: number;
  finalRequests: number;
  flaggedRequests: number;
  approvedRequests: number;
  totalBudget: number;
}

export interface MatrixCategory {
  id: string;
  schoolYear: string;
  semester: '1st Semester' | '2nd Semester';
  defenseType: DefenseType;
  programLevel: MatrixProgramLevel;
}

export interface FacultyAppearance {
  facultyId: string;
  facultyName: string;
  categoryId: string;
  role: MatrixPanelRole;
  count: number;
  isExceeded: boolean;
}

export interface MatrixData {
  categories: MatrixCategory[];
  appearances: FacultyAppearance[];
}

export interface AppearanceTableRow {
  facultyName: string;
  appearances: {
    [categoryId: string]: {
      [role in MatrixPanelRole]?: number;
    };
  };
  totalAppearances: number;
  totalCompensation: number;
  hasExceededLimit: boolean;
}

export interface DefenseRequest {
  id: string;
  program: string;
  defenseType: DefenseType;
  schoolYear: string;
  semester: string;
  status: DefenseRequestStatus;
  isFlagged: boolean;
  createdAt: string;
  updatedAt: string;
  requesterId: string;
  requesterName: string;
}

// System Configuration Types
export interface AcademicProgram {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  programLevelId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramLevel {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export interface DepartmentConfig {
  id: string;
  name: string;
  code: string;
  fullName: string;
  isActive: boolean;
  specialRules?: AppearanceLimitRule[];
}

export interface FeeStructure {
  id: string;
  academicYear: string;
  programLevelId: string;
  programId?: string;
  defenseType: DefenseType;
  fees: {
    [role in PanelRole]?: {
      preOral?: number;
      final?: number;
    };
  };
  packageOptions: {
    pureQuantitative: {
      preOral: number;
      final: number;
    };
    pureQualitative: {
      preOral: number;
      final: number;
    };
    perStudent: {
      preOral: number;
      final: number;
    };
  };
  isActive: boolean;
  effectiveDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppearanceLimitRule {
  id: string;
  role: PanelRole;
  programLevelId: string;
  departmentId?: string;
  limit: number;
  isSpecialRule: boolean;
  description?: string;
  effectiveDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface SystemSettings {
  id: string;
  currentAcademicYear: string;
  activeSemesters: string[];
  defensePeriods: {
    firstSemester: {
      start: string;
      end: string;
    };
    secondSemester: {
      start: string;
      end: string;
    };
  };
  emailSettings: {
    universityDomain: string;
    curiEmail: string;
    autoNotifications: boolean;
    approvalReminderInterval: number;
  };
  fileUploadSettings: {
    maxFileSize: number;
    allowedFormats: string[];
    storageLocation: string;
  };
  updatedAt: string;
}

export interface ConfigurationHistory {
  id: string;
  entityType: 'fee_structure' | 'appearance_limit' | 'system_settings' | 'academic_program';
  entityId: string;
  action: 'create' | 'update' | 'delete' | 'activate' | 'deactivate';
  changes: any;
  userId: string;
  userName: string;
  createdAt: string;
}