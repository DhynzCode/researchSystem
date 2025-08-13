import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Loader, 
  AlertCircle, 
  CheckCircle,
  Shield,
  UserCheck,
  Clock
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLoading } from '../contexts/LoadingContext';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import TopNavigation from './TopNavigation';
import { validateEmail } from '../utils/validation';
import { 
  LoginFormState, 
  LoginFormData, 
  LOGIN_ERROR_MESSAGES 
} from '../types/login';
import { 
  getAccountStatus, 
  getRoleBasedRedirect, 
  validateLoginRequirements,
  getLoginErrorMessage,
  logLoginActivity,
  getWelcomeMessage
} from '../utils/loginHelpers';

const initialFormData: LoginFormData = {
  email: '',
  password: '',
  rememberMe: false
};

const initialFormState: LoginFormState = {
  data: initialFormData,
  errors: {},
  isLoading: false,
  isGoogleLoading: false,
  showPassword: false
};

export const LoginForm: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>(initialFormState);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const [resendingVerification, setResendingVerification] = useState(false);
  const { signIn, signInWithGoogle, sendEmailVerification, user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get redirect path from location state or default based on role
  const from = (location.state as any)?.from?.pathname || null;

  useEffect(() => {
    // If user is already logged in, redirect them
    if (!loading && user) {
      const loginValidation = validateLoginRequirements(user);
      if (loginValidation.canLogin) {
        const redirectPath = from || getRoleBasedRedirect(user);
        hideLoading(); // Hide loading before navigation
        navigate(redirectPath, { replace: true });
      }
    }
  }, [user, loading, navigate, from, hideLoading]);

  const updateFormData = (field: keyof LoginFormData, value: string | boolean) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, [field]: value },
      errors: { ...prev.errors, [field]: undefined, general: undefined }
    }));
  };

  const validateForm = (): boolean => {
    const errors: any = {};
    const { data } = formState;

    // Validate email
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
    }

    // Validate password
    if (!data.password.trim()) {
      errors.password = 'Password is required';
    }

    setFormState(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormState(prev => ({ ...prev, isLoading: true }));
    showLoading('Signing in...');

    try {
      console.log('Attempting login with:', formState.data.email);
      await signIn(formState.data.email, formState.data.password);
      console.log('Sign in successful, waiting for user state update...');
      
      // The user state will be updated by the AuthContext
      // and the useEffect will handle the redirect
      setLoginSuccess(true);
      
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      const errorMessage = getLoginErrorMessage(error.code);
      setFormState(prev => ({
        ...prev,
        errors: { general: errorMessage }
      }));
      hideLoading();
    } finally {
      setFormState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleGoogleLogin = async () => {
    setFormState(prev => ({ ...prev, isGoogleLoading: true }));
    showLoading('Signing in with Google...');

    try {
      await signInWithGoogle();
      setLoginSuccess(true);
      
    } catch (error: any) {
      console.error('Google login error:', error);
      
      const errorMessage = getLoginErrorMessage(error.code);
      setFormState(prev => ({
        ...prev,
        errors: { general: errorMessage }
      }));
    } finally {
      setFormState(prev => ({ ...prev, isGoogleLoading: false }));
    }
  };

  const handleResendVerification = async () => {
    if (!user) return;
    
    setResendingVerification(true);
    try {
      await sendEmailVerification();
      // Show success message (you could add a toast notification here)
      alert('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      alert('Failed to send verification email. Please try again.');
    } finally {
      setResendingVerification(false);
    }
  };

  // Show account status message if user exists but can't login
  const renderAccountStatusMessage = () => {
    if (!user) return null;

    const loginValidation = validateLoginRequirements(user);
    if (loginValidation.canLogin) return null;

    const getStatusIcon = () => {
      switch (loginValidation.requiresAction) {
        case 'verify-email':
          return <Mail className="h-6 w-6 text-yellow-500" />;
        case 'wait-approval':
          return <Clock className="h-6 w-6 text-blue-500" />;
        case 'contact-support':
          return <Shield className="h-6 w-6 text-red-500" />;
        default:
          return <AlertCircle className="h-6 w-6 text-gray-500" />;
      }
    };

    const getStatusColor = () => {
      switch (loginValidation.requiresAction) {
        case 'verify-email':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        case 'wait-approval':
          return 'bg-blue-50 border-blue-200 text-blue-800';
        case 'contact-support':
          return 'bg-red-50 border-red-200 text-red-800';
        default:
          return 'bg-gray-50 border-gray-200 text-gray-800';
      }
    };

    return (
      <div className={`rounded-md border p-4 mb-6 ${getStatusColor()}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getStatusIcon()}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Account Status</p>
            <p className="text-sm mt-1">{loginValidation.message}</p>
            {loginValidation.requiresAction === 'verify-email' && (
              <button
                onClick={handleResendVerification}
                className="text-sm underline mt-2 hover:no-underline"
                disabled={resendingVerification}
              >
                {resendingVerification ? 'Sending...' : 'Resend verification email'}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
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
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Sign in to your Research Panel System account</p>
          </div>
          {renderAccountStatusMessage()}

          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
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
                  placeholder="Enter your email"
                />
              </div>
              {formState.errors.email && (
                <p className="mt-1 text-sm text-red-600">{formState.errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={formState.data.rememberMe}
                  onChange={(e) => updateFormData('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            {/* General Error */}
            {formState.errors.general && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
                <AlertCircle className="h-5 w-5" />
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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={formState.isGoogleLoading}
            className="mt-4 w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {formState.isGoogleLoading ? (
              <>
                <Loader className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Signing in with Google...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Registration Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>
    </div>
  );
};