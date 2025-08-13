import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Function to create admin account
export const createAdminAccount = async () => {
  try {
    console.log('Creating admin account...');
    
    // Create Firebase Auth user
    const { user } = await createUserWithEmailAndPassword(
      auth, 
      'researchcenter@gmail.com', 
      'researchcenter@123'
    );
    
    console.log('Firebase user created:', user.uid);
    
    // Update display name
    await updateProfile(user, { 
      displayName: 'Research Director' 
    });
    
    // Create user profile in Firestore
    const userProfile = {
      email: 'researchcenter@gmail.com',
      displayName: 'Research Director',
      role: 'research_director',
      emailVerified: true, // Set as verified for admin
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      department: 'Research Center'
    };
    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userProfile);
    
    console.log('Admin profile created successfully!');
    console.log('Email: researchcenter@gmail.com');
    console.log('Password: researchcenter@123');
    console.log('Role: research_director');
    
    return {
      success: true,
      message: 'Admin account created successfully!',
      user: userProfile
    };
    
  } catch (error: any) {
    console.error('Error creating admin account:', error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

// Function to create admin account via browser console
// Usage: Run createAdmin() in browser console
(window as any).createAdmin = createAdminAccount;