import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Building, CreditCard, Loader, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import TopNavigation from './TopNavigation';
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator';
import {
  validateDisplayName,
  validateUniversityEmail,
  validatePassword,
  validatePasswordMatch,
  validateEmployeeId
} from '../utils/validation';
import {
  RegistrationFormData,
  RegistrationFormErrors,
  RegistrationFormState,
  RegistrationResponse,
  Department,
  DEPARTMENTS
} from '../types/registration';

const initialFormData: RegistrationFormData = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  department: '',
  employeeId: '',
  agreeToTerms: false
};

const initialFormState: RegistrationFormState = {
  data: initialFormData,
  errors: {},
  isLoading: false,
  isSubmitted: false,
  showPassword: false,
  showConfirmPassword: false
};

export const RegistrationForm: React.FC = () => {
  const [formState, setFormState] = useState<RegistrationFormState>(initialFormState);
  const [registrationResult, setRegistrationResult] = useState<RegistrationResponse | null>(null);
  const { signUp } = useAuth();

  const updateFormData = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: undefined, general: undefined }
    }));
  };

  const validateForm = (): boolean => {
    const errors: RegistrationFormErrors = {};
    const { data } = formState;

    // Validate full name
    const nameValidation = validateDisplayName(data.fullName);
    if (!nameValidation.isValid) {
      errors.fullName = nameValidation.error;
    }

    // Validate email
    const emailValidation = validateUniversityEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
    }

    // Validate password
    const passwordValidation = validatePassword(data.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0];
    }

    // Validate confirm password
    const confirmPasswordValidation = validatePasswordMatch(data.password, data.confirmPassword);
    if (!confirmPasswordValidation.isValid) {
      errors.confirmPassword = confirmPasswordValidation.error;
    }

    // Validate department
    if (!data.department) {
      errors.department = 'Please select your department';
    }

    // Validate employee ID
    const employeeIdValidation = validateEmployeeId(data.employeeId);
    if (!employeeIdValidation.isValid) {
      errors.employeeId = employeeIdValidation.error;
    }

    // Validate terms agreement
    if (!data.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true }));

    try {
      await signUp(
        formState.data.email,
        formState.data.password,
        formState.data.fullName,
        'research_teacher',
        {
          department: formState.data.department as Department,
          employeeId: formState.data.employeeId || undefined
        }
      );

      setRegistrationResult({
        success: true,
        message: 'Registration successful! Please check your email to verify your account.',
        requiresEmailVerification: true
      });

      setFormState(prev => ({ ...prev, isSubmitted: true }));
    } catch (error: any) {
      console.error('Registration error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please choose a stronger password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/operation-not-allowed') {
        errorMessage = 'Email/password authentication is not enabled. Please contact support.';
      } else if (error.code === 'auth/missing-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Invalid credentials provided.';
      } else {
        errorMessage = `Registration failed: ${error.message}`;
      }

      setRegistrationResult({
        success: false,
        message: errorMessage
      });

      setFormState(prev => ({
        ...prev,
        errors: { general: errorMessage }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  if (formState.isSubmitted && registrationResult?.success) {
    return (
      <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(/images/UZ_background.gif)' }}>
        <div className="absolute inset-0 bg-white/30"></div>
        <TopNavigation 
          currentRole="guest" 
          onRoleChange={() => {}} 
          onMobileMenuToggle={() => {}}
          showUserActions={false}
        />
        <div className="relative py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
              <p className="text-gray-600 mb-6">
                Your account has been created successfully. Please check your email for a verification link to activate your account.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong>
                  <br />
                  1. Check your email inbox (and spam folder)
                  <br />
                  2. Click the verification link
                  <br />
                  3. Wait for approval from the Research Director
                </p>
              </div>
              <Link
                to="/login"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 block text-center"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(/images/UZ_background.gif)' }}>
      <div className="absolute inset-0 bg-white/30"></div>
      <TopNavigation 
        currentRole="guest" 
        onRoleChange={() => {}} 
        onMobileMenuToggle={() => {}}
        showUserActions={false}
      />
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Research Teacher Registration</h2>
            <p className="mt-2 text-gray-600">Create your account to access the Research Panel System</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formState.data.fullName}
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors ${
                    formState.errors.fullName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {formState.errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.fullName}</p>
              )}
            </div>

            {/* University Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.data.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors ${
                    formState.errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="your.email@gmail.com or your.name@university.edu.ph"
                />
              </div>
              {formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={formState.showPassword ? 'text' : 'password'}
                  required
                  value={formState.data.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors ${
                    formState.errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                >
                  {formState.showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formState.errors.password && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.password}</p>
              )}
              <PasswordStrengthIndicator password={formState.data.password} />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type={formState.showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formState.data.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className={`block w-full pl-10 pr-10 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors ${
                    formState.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setFormState(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                >
                  {formState.showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {formState.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.confirmPassword}</p>
              )}
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="department"
                  required
                  value={formState.data.department}
                  onChange={(e) => updateFormData('department', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors bg-white ${
                    formState.errors.department ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select your department</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>
              {formState.errors.department && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.department}</p>
              )}
            </div>

            {/* Employee ID */}
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="employeeId"
                  type="text"
                  value={formState.data.employeeId}
                  onChange={(e) => updateFormData('employeeId', e.target.value)}
                  className={`block w-full pl-10 pr-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors ${
                    formState.errors.employeeId ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your employee ID"
                />
              </div>
              {formState.errors.employeeId && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.employeeId}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  checked={formState.data.agreeToTerms}
                  onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                  className={`mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                    formState.errors.agreeToTerms ? 'border-red-300' : ''
                  }`}
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-600 hover:text-blue-500 underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500 underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {formState.errors.agreeToTerms && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.agreeToTerms}</p>
              )}
            </div>

            {/* General Error */}
            {formState.errors.general && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                <XCircle className="h-5 w-5" />
                <span className="text-sm">{formState.errors.general}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState.isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              {formState.isLoading ? (
                <>
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};