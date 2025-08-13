import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import Dashboard from './pages/Dashboard';
import PanelRequestForm from './pages/PanelRequestForm';
import RequestDefense from './pages/RequestDefense';
import DefenseRequestView from './pages/DefenseRequestView';
import MatrixTable from './pages/MatrixTable';
import FacultyTracker from './pages/FacultyTracker';
import ApprovalCenter from './pages/ApprovalCenter';
import ApprovalRequestView from './pages/ApprovalRequestView';
import HonorariumCalculator from './pages/HonorariumCalculator';
import Reports from './pages/Reports';
import ThesisSubmissions from './pages/ThesisSubmissions';
import StudentClearanceStatus from './pages/StudentClearanceStatus';
import { LoginForm } from './components/LoginForm';
import { RegistrationForm } from './components/RegistrationForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { validateLoginRequirements } from './utils/loginHelpers';
import { setupPageReloadHandler } from './utils/loadingUtils';
import { UserRole } from './types';
import { UserRole as AuthUserRole } from './types/auth';
import Loading from './components/Loading';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loading size="large" text="Authenticating..." showDots={true} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const loginValidation = validateLoginRequirements(user);
  if (!loginValidation.canLogin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Main App Layout Component
const AppLayout: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Convert new role type to old UserRole type for compatibility
  const getCurrentRole = (): UserRole => {
    if (!user) return 'Research Teacher';
    
    switch (user.role) {
      case 'research_teacher':
        return 'Research Teacher';
      case 'research_director':
        return 'Research Director';
      case 'research_staff':
        return 'Finance Officer'; // Map to existing type
      case 'vpaa':
        return 'VPAA';
      case 'budget_office':
        return 'Finance Officer'; // Map to existing type
      default:
        return 'Research Teacher';
    }
  };

  const currentRole = getCurrentRole();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <TopNavigation 
        currentRole={currentRole} 
        onRoleChange={() => {}} // Disable role changing since it's now based on user account
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <div className="flex">
        <Sidebar 
          currentRole={currentRole} 
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        />
        <main className="flex-1 lg:ml-64 p-6 pt-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/panel-request" element={<PanelRequestForm />} />
            {/* New Request Defense submenu routes */}
            <Route path="/defense-form" element={<PanelRequestForm />} />
            <Route path="/defense-records" element={<RequestDefense />} />
            <Route path="/defense-records/:id" element={<DefenseRequestView />} />
            {/* Legacy routes for backward compatibility */}
            <Route path="/request-defense" element={<RequestDefense />} />
            <Route path="/request-defense/:id" element={<DefenseRequestView />} />
            <Route path="/matrix" element={<MatrixTable />} />
            <Route path="/faculty-tracker" element={<FacultyTracker />} />
            <Route path="/approval-center" element={<ApprovalCenter />} />
            <Route path="/approval-center/request/:id" element={<ApprovalRequestView />} />
            {/* Repository module routes */}
            <Route path="/repository/thesis-submissions" element={<ThesisSubmissions />} />
            <Route path="/repository/student-clearance" element={<StudentClearanceStatus />} />
            <Route path="/honorarium" element={<HonorariumCalculator />} />
            <Route path="/reports" element={<Reports />} />
            {/* Add more role-specific routes as needed */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/vpaa/dashboard" element={<Dashboard />} />
            <Route path="/budget/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  // Setup page reload handling
  React.useEffect(() => {
    setupPageReloadHandler();
  }, []);

  return (
    <ThemeProvider>
      <LoadingProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              
              {/* Protected Routes */}
              <Route path="/*" element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;