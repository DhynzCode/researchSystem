# Firebase Setup Guide for UZEARCH

## Prerequisites

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication and Firestore Database in your Firebase project

## Firebase Configuration Steps

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select existing project
3. Enable Google Analytics (optional)
4. Wait for project creation to complete

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable the following providers:
   - **Email/Password**: Click to enable
   - **Google**: Click to enable and configure OAuth consent screen

### 3. Configure Authentication Settings

1. Go to **Authentication** > **Settings** > **User actions**
2. Enable **Email verification** for new users
3. Configure **Authorized domains** (add your production domain)

### 4. Set up Firestore Database

1. Go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in test mode** (we'll deploy security rules later)
4. Select your preferred region

### 5. Get Firebase Configuration

1. Go to **Project settings** (gear icon) > **General** tab
2. Scroll down to **Your apps** section
3. Click **Add app** > **Web app** (</> icon)
4. Register your app with a nickname
5. Copy the Firebase configuration object

### 6. Environment Variables Setup

1. Copy `.env.example` to `.env` in your project root
2. Replace the placeholder values with your Firebase configuration:

```env
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-actual-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-actual-sender-id
VITE_FIREBASE_APP_ID=your-actual-app-id
```

### 7. Deploy Firestore Security Rules

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase in your project: `firebase init`
   - Select **Firestore** and **Authentication**
   - Choose your existing project
   - Accept default settings for firestore.rules and firestore.indexes.json
4. Deploy security rules: `firebase deploy --only firestore:rules`

### 8. Configure Google OAuth (if using Google Sign-in)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your Firebase project
3. Go to **APIs & Services** > **Credentials**
4. Configure OAuth consent screen
5. Add authorized domains for your application

## User Roles and Permissions

The system supports the following user roles with specific permissions:

### Research Teacher (`research_teacher`)
- **Status**: `pending_approval` or `approved`
- **Permissions**: Can create panels (when approved), view dashboard
- **Default role** for new registrations

### Research Director (`research_director`)
- **Permissions**: Full panel management, approve teachers, view reports, manage users
- **Highest academic role**

### Research Staff (`research_staff`)
- **Permissions**: View all panels, generate reports, administrative support
- **Support role**

### VPAA (`vpaa`)
- **Permissions**: All permissions including budget management and system settings
- **Highest administrative role**

### Budget Office (`budget_office`)
- **Permissions**: Budget management, view panels and reports
- **Financial oversight role**

## Security Rules Features

The Firestore security rules implement:

1. **University Email Validation**: Only `@university.edu.ph` emails allowed
2. **Role-based Access Control**: Different permissions per role
3. **Email Verification**: Required for sensitive operations
4. **Approval Workflow**: Research teachers need approval before creating panels
5. **Audit Trail**: System maintains audit logs (admin access only)

## Email Domain Configuration

The system is configured for `@university.edu.ph` domain. To change this:

1. Update the regex in `firestore.rules`:
   ```javascript
   function isUniversityEmail() {
     return request.auth.token.email.matches('.*@yourdomain\\.edu\\.ph$');
   }
   ```

2. Update validation in `src/utils/validation.ts`:
   ```typescript
   export const validateUniversityEmail = (email: string): EmailValidation => {
     const emailRegex = /^[a-zA-Z0-9._%+-]+@yourdomain\.edu\.ph$/;
     // ... rest of function
   };
   ```

## Testing the Setup

1. Start your development server: `npm run dev`
2. Try registering with a university email
3. Check Firebase Console > Authentication to see new users
4. Verify email verification emails are sent
5. Test role-based access by changing user roles in Firestore Console

## Production Deployment

Before deploying to production:

1. Review and test all security rules thoroughly
2. Set up proper backup and monitoring
3. Configure proper error handling and logging
4. Set up user management workflows for role assignment
5. Test all authentication flows end-to-end

## Troubleshooting

### Common Issues:

1. **Firebase config errors**: Ensure all environment variables are set correctly
2. **Authentication not working**: Check if providers are enabled in Firebase Console
3. **Permission denied errors**: Verify security rules and user roles in Firestore
4. **Email verification not sending**: Check spam folder and Firebase settings

### Support:

- Firebase Documentation: https://firebase.google.com/docs
- Firebase Console: https://console.firebase.google.com/
- Stack Overflow: Search for "firebase" + your specific issue