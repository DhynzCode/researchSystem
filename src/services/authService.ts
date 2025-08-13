import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  sendEmailVerification as firebaseSendEmailVerification,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../config/firebase';
import { UserProfile, UserRole, ResearchTeacherStatus } from '../types/auth';

// Create user profile in Firestore
export const createUserProfile = async (
  user: User,
  additionalData: {
    displayName: string;
    role: UserRole;
    department?: string;
    employeeId?: string;
    phoneNumber?: string;
  }
): Promise<void> => {
  const userRef = doc(db, 'users', user.uid);
  
  const userProfile: any = {
    email: user.email!,
    displayName: additionalData.displayName,
    role: additionalData.role,
    emailVerified: user.emailVerified,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    lastLogin: serverTimestamp()
  };

  // Only add optional fields if they have values
  if (additionalData.role === 'research_teacher') {
    userProfile.status = 'pending_approval';
  }
  
  if (additionalData.department) {
    userProfile.department = additionalData.department;
  }
  
  if (additionalData.employeeId) {
    userProfile.employeeId = additionalData.employeeId;
  }
  
  if (additionalData.phoneNumber) {
    userProfile.phoneNumber = additionalData.phoneNumber;
  }

  await setDoc(userRef, userProfile);
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    console.log('Fetching user profile for UID:', uid);
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    console.log('User document exists:', userDoc.exists());
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      console.log('User document data:', data);
      
      return {
        uid,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        lastLogin: data.lastLogin?.toDate() || new Date()
      } as UserProfile;
    }
    
    console.log('User document does not exist');
    return null;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

// Update last login time
export const updateLastLogin = async (uid: string): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    
    // Check if document exists first
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      await updateDoc(userRef, {
        lastLogin: serverTimestamp()
      });
    } else {
      console.warn('User document does not exist, skipping last login update');
    }
  } catch (error) {
    console.error('Error updating last login:', error);
    // Don't throw the error, just log it - login should still proceed
  }
};

// Sign up with email and password
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole,
  additionalData?: {
    department?: string;
    employeeId?: string;
    phoneNumber?: string;
  }
): Promise<User> => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  
  // Update Firebase Auth profile
  await firebaseUpdateProfile(user, { displayName });
  
  // Create user profile in Firestore
  await createUserProfile(user, {
    displayName,
    role,
    ...additionalData
  });
  
  // Send email verification
  await firebaseSendEmailVerification(user);
  
  return user;
};

// Sign in with email and password
export const signInWithEmailAndPassword_Custom = async (
  email: string,
  password: string
): Promise<User> => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  
  // Update last login
  await updateLastLogin(user.uid);
  
  return user;
};

// Sign in with Google
export const signInWithGoogle = async (): Promise<User> => {
  const { user } = await signInWithPopup(auth, googleProvider);
  
  // Check if user profile exists, if not create one with research_teacher role (pending approval)
  const existingProfile = await getUserProfile(user.uid);
  
  if (!existingProfile) {
    await createUserProfile(user, {
      displayName: user.displayName || user.email?.split('@')[0] || 'User',
      role: 'research_teacher', // Default role for Google sign-in
      department: undefined,
      employeeId: undefined,
      phoneNumber: user.phoneNumber || undefined
    });
  } else {
    // Update last login
    await updateLastLogin(user.uid);
  }
  
  return user;
};

// Sign out
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

// Send email verification
export const sendEmailVerification = async (): Promise<void> => {
  if (auth.currentUser) {
    await firebaseSendEmailVerification(auth.currentUser);
  } else {
    throw new Error('No user is currently signed in');
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

// Approve research teacher
export const approveResearchTeacher = async (uid: string): Promise<void> => {
  await updateUserProfile(uid, { status: 'approved' });
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};