import { PasswordValidation, EmailValidation } from '../types/auth';

// Password validation rules
export const validatePassword = (password: string): PasswordValidation => {
  const errors: string[] = [];
  let isValid = true;

  // Minimum 8 characters
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
    isValid = false;
  }

  // Must contain at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
    isValid = false;
  }

  // Must contain at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
    isValid = false;
  }

  // Must contain at least one number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
    isValid = false;
  }

  // Must contain at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{};"\\|,.<>?)');
    isValid = false;
  }

  // Must not contain whitespace
  if (/\s/.test(password)) {
    errors.push('Password must not contain spaces');
    isValid = false;
  }

  return { isValid, errors };
};

// University email validation (now allows external emails for testing)
export const validateUniversityEmail = (email: string): EmailValidation => {
  const universityEmailRegex = /^[a-zA-Z0-9._%+-]+@university\.edu\.ph$/;
  const commonEmailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|outlook|hotmail)\.(com|ph)$/;
  const generalEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  // Allow university emails, common providers, or any valid email for testing
  if (universityEmailRegex.test(email) || commonEmailRegex.test(email) || generalEmailRegex.test(email)) {
    return { isValid: true };
  }

  return { 
    isValid: false, 
    error: 'Please enter a valid email address' 
  };
};

// General email validation
export const validateEmail = (email: string): EmailValidation => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }

  if (!emailRegex.test(email)) {
    return { 
      isValid: false, 
      error: 'Please enter a valid email address' 
    };
  }

  return { isValid: true };
};

// Validate display name
export const validateDisplayName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Full name is required' };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: 'Full name must be at least 2 characters long' };
  }

  if (name.trim().length > 100) {
    return { isValid: false, error: 'Full name must not exceed 100 characters' };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s\-'\.]+$/.test(name.trim())) {
    return { 
      isValid: false, 
      error: 'Full name can only contain letters, spaces, hyphens, apostrophes, and periods' 
    };
  }

  return { isValid: true };
};

// Validate employee ID
export const validateEmployeeId = (employeeId: string): { isValid: boolean; error?: string } => {
  if (!employeeId) {
    return { isValid: true }; // Optional field
  }

  // Check format: should be alphanumeric, 6-20 characters
  if (!/^[a-zA-Z0-9]{6,20}$/.test(employeeId)) {
    return { 
      isValid: false, 
      error: 'Employee ID must be 6-20 alphanumeric characters' 
    };
  }

  return { isValid: true };
};

// Validate phone number (Philippine format)
export const validatePhoneNumber = (phoneNumber: string): { isValid: boolean; error?: string } => {
  if (!phoneNumber) {
    return { isValid: true }; // Optional field
  }

  // Philippine mobile number format: +63XXXXXXXXXX or 09XXXXXXXXX
  const phoneRegex = /^(\+63|0)9\d{9}$/;
  
  if (!phoneRegex.test(phoneNumber.replace(/\s|-/g, ''))) {
    return { 
      isValid: false, 
      error: 'Please enter a valid Philippine mobile number (e.g., +639123456789 or 09123456789)' 
    };
  }

  return { isValid: true };
};

// Password strength indicator
export const getPasswordStrength = (password: string): {
  score: number;
  label: string;
  color: string;
} => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password)) score += 1;
  if (password.length >= 16) score += 1;

  if (score <= 2) {
    return { score, label: 'Weak', color: 'red' };
  } else if (score <= 4) {
    return { score, label: 'Fair', color: 'orange' };
  } else if (score <= 5) {
    return { score, label: 'Good', color: 'yellow' };
  } else {
    return { score, label: 'Strong', color: 'green' };
  }
};

// Check if passwords match
export const validatePasswordMatch = (
  password: string, 
  confirmPassword: string
): { isValid: boolean; error?: string } => {
  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match' };
  }
  return { isValid: true };
};