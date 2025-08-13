export type UserRole = 'Research Teacher' | 'Research Director' | 'VPAA' | 'Finance Officer';

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

export interface MatrixTableRow {
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