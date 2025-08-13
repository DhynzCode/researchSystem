import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Create Research Teacher Account
export const createResearchTeacherAccount = async () => {
  try {
    console.log('Creating research teacher account...');
    
    // Create Firebase Auth user
    const { user } = await createUserWithEmailAndPassword(
      auth, 
      'teacher@gmail.com', 
      'teacher123!'
    );
    
    console.log('Firebase user created:', user.uid);
    
    // Update display name
    await updateProfile(user, { 
      displayName: 'Dr. John Smith' 
    });
    
    // Create user profile in Firestore
    const userProfile = {
      email: 'teacher@gmail.com',
      displayName: 'Dr. John Smith',
      role: 'research_teacher',
      status: 'pending_approval', // Research teachers start with pending approval
      emailVerified: true, // Set as verified for testing
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      department: 'SEICT',
      employeeId: 'EMP001'
    };
    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userProfile);
    
    console.log('Research teacher profile created successfully!');
    
    return {
      success: true,
      message: 'Research teacher account created successfully!',
      credentials: {
        email: 'teacher@gmail.com',
        password: 'teacher123!',
        role: 'research_teacher',
        status: 'pending_approval'
      }
    };
    
  } catch (error: any) {
    console.error('Error creating research teacher account:', error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

// Create Research Director Account
export const createResearchDirectorAccount = async () => {
  try {
    console.log('Creating research director account...');
    
    // Create Firebase Auth user
    const { user } = await createUserWithEmailAndPassword(
      auth, 
      'director@gmail.com', 
      'director123!'
    );
    
    console.log('Firebase user created:', user.uid);
    
    // Update display name
    await updateProfile(user, { 
      displayName: 'Dr. Maria Rodriguez' 
    });
    
    // Create user profile in Firestore
    const userProfile = {
      email: 'director@gmail.com',
      displayName: 'Dr. Maria Rodriguez',
      role: 'research_director',
      emailVerified: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      department: 'Research Center'
    };
    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userProfile);
    
    console.log('Research director profile created successfully!');
    
    return {
      success: true,
      message: 'Research director account created successfully!',
      credentials: {
        email: 'director@gmail.com',
        password: 'director123!',
        role: 'research_director'
      }
    };
    
  } catch (error: any) {
    console.error('Error creating research director account:', error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

// Create VPAA Account
export const createVPAAAccount = async () => {
  try {
    console.log('Creating VPAA account...');
    
    // Create Firebase Auth user
    const { user } = await createUserWithEmailAndPassword(
      auth, 
      'vpaa@gmail.com', 
      'vpaa123!'
    );
    
    console.log('Firebase user created:', user.uid);
    
    // Update display name
    await updateProfile(user, { 
      displayName: 'Dr. Sarah Johnson' 
    });
    
    // Create user profile in Firestore
    const userProfile = {
      email: 'vpaa@gmail.com',
      displayName: 'Dr. Sarah Johnson',
      role: 'vpaa',
      emailVerified: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      department: 'Academic Affairs'
    };
    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userProfile);
    
    console.log('VPAA profile created successfully!');
    
    return {
      success: true,
      message: 'VPAA account created successfully!',
      credentials: {
        email: 'vpaa@gmail.com',
        password: 'vpaa123!',
        role: 'vpaa'
      }
    };
    
  } catch (error: any) {
    console.error('Error creating VPAA account:', error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

// Create Budget Office Account
export const createBudgetOfficeAccount = async () => {
  try {
    console.log('Creating Budget Office account...');
    
    // Create Firebase Auth user
    const { user } = await createUserWithEmailAndPassword(
      auth, 
      'budget@gmail.com', 
      'budget123!'
    );
    
    console.log('Firebase user created:', user.uid);
    
    // Update display name
    await updateProfile(user, { 
      displayName: 'Ms. Patricia Wong' 
    });
    
    // Create user profile in Firestore
    const userProfile = {
      email: 'budget@gmail.com',
      displayName: 'Ms. Patricia Wong',
      role: 'budget_office',
      emailVerified: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      department: 'Budget Office'
    };
    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userProfile);
    
    console.log('Budget Office profile created successfully!');
    
    return {
      success: true,
      message: 'Budget Office account created successfully!',
      credentials: {
        email: 'budget@gmail.com',
        password: 'budget123!',
        role: 'budget_office'
      }
    };
    
  } catch (error: any) {
    console.error('Error creating Budget Office account:', error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

// Create Dean Account
export const createDeanAccount = async () => {
  try {
    console.log('Creating dean account...');
    
    // Create Firebase Auth user
    const { user } = await createUserWithEmailAndPassword(
      auth, 
      'dean@gmail.com', 
      'dean123!'
    );
    
    console.log('Firebase user created:', user.uid);
    
    // Update display name
    await updateProfile(user, { 
      displayName: 'Dr. James Thompson' 
    });
    
    // Create user profile in Firestore
    const userProfile = {
      email: 'dean@gmail.com',
      displayName: 'Dr. James Thompson',
      role: 'dean',
      emailVerified: true,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      department: 'Dean Office'
    };
    
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, userProfile);
    
    console.log('Dean profile created successfully!');
    
    return {
      success: true,
      message: 'Dean account created successfully!',
      credentials: {
        email: 'dean@gmail.com',
        password: 'dean123!',
        role: 'dean'
      }
    };
    
  } catch (error: any) {
    console.error('Error creating dean account:', error);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

// Make functions available in browser console for testing
(window as any).createTeacher = createResearchTeacherAccount;
(window as any).createDirector = createResearchDirectorAccount;
(window as any).createVPAA = createVPAAAccount;
(window as any).createBudget = createBudgetOfficeAccount;
(window as any).createDean = createDeanAccount;