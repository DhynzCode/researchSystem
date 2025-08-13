import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  signUpWithEmailAndPassword,
  signInWithEmailAndPassword_Custom,
  signInWithGoogle,
  signOut,
  sendEmailVerification,
  resetPassword,
  onAuthStateChange,
  getUserProfile,
  updateUserProfile,
  createUserProfile
} from '../services/authService';
import { UserProfile, AuthContextType, UserRole } from '../types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser: User | null) => {
      if (firebaseUser) {
        try {
          let userProfile = await getUserProfile(firebaseUser.uid);
          console.log('User profile loaded:', userProfile);
          
          // If no profile exists, create one (this handles existing Firebase Auth users)
          if (!userProfile) {
            console.log('No user profile found, creating default profile');
            await createUserProfile(firebaseUser, {
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              role: 'research_teacher' // Default role
            });
            userProfile = await getUserProfile(firebaseUser.uid);
          }
          
          setUser(userProfile);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          console.error('Firebase user:', firebaseUser);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      console.log('AuthContext: Starting sign in process...');
      await signInWithEmailAndPassword_Custom(email, password);
      console.log('AuthContext: Sign in completed successfully');
    } catch (error) {
      console.error('AuthContext: Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    displayName: string,
    role: UserRole,
    additionalData?: {
      department?: string;
      employeeId?: string;
      phoneNumber?: string;
    }
  ): Promise<void> => {
    try {
      await signUpWithEmailAndPassword(email, password, displayName, role, additionalData);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogleProvider = async (): Promise<void> => {
    try {
      await signInWithGoogle();
    } catch (error) {
      throw error;
    }
  };

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut();
    } catch (error) {
      throw error;
    }
  };

  const sendVerificationEmail = async (): Promise<void> => {
    try {
      await sendEmailVerification();
    } catch (error) {
      throw error;
    }
  };

  const resetUserPassword = async (email: string): Promise<void> => {
    try {
      await resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfileData = async (data: Partial<UserProfile>): Promise<void> => {
    if (!user) {
      throw new Error('No user is currently signed in');
    }
    
    try {
      await updateUserProfile(user.uid, data);
      // Update local user state
      setUser({ ...user, ...data, updatedAt: new Date() });
    } catch (error) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle: signInWithGoogleProvider,
    signOut: signOutUser,
    sendEmailVerification: sendVerificationEmail,
    resetPassword: resetUserPassword,
    updateProfile: updateUserProfileData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};