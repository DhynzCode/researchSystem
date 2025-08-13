// Department options for the university
export type Department = 'SAM' | 'SEICT' | 'SLAS' | 'SOE' | 'SBM' | 'SCJ';

export const DEPARTMENTS: { value: Department; label: string }[] = [
  { value: 'SAM', label: 'School of Arts and Management (SAM)' },
  { value: 'SEICT', label: 'School of Engineering, Information and Communication Technology (SEICT)' },
  { value: 'SLAS', label: 'School of Liberal Arts and Sciences (SLAS)' },
  { value: 'SOE', label: 'School of Education (SOE)' },
  { value: 'SBM', label: 'School of Business and Management (SBM)' },
  { value: 'SCJ', label: 'School of Criminal Justice (SCJ)' }
];

// Registration form data interface
export interface RegistrationFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  department: Department | '';
  employeeId: string;
  agreeToTerms: boolean;
}

// Form validation errors interface
export interface RegistrationFormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  department?: string;
  employeeId?: string;
  agreeToTerms?: string;
  general?: string;
}

// Registration form state interface
export interface RegistrationFormState {
  data: RegistrationFormData;
  errors: RegistrationFormErrors;
  isLoading: boolean;
  isSubmitted: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
}

// Registration response interface
export interface RegistrationResponse {
  success: boolean;
  message: string;
  requiresEmailVerification?: boolean;
  userId?: string;
}

// Form field configuration interface
export interface FormFieldConfig {
  name: keyof RegistrationFormData;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoComplete?: string;
}