import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, query, collection, where, getDocs, updateDoc, increment, arrayUnion } from 'firebase/firestore';
import { auth, db } from './config';
import { getDeviceInfo } from '../utils/deviceFingerprint';
import { getReferralCodeFromURL, processReferral, trackReferralSource } from '../utils/referral';

const googleProvider = new GoogleAuthProvider();

// Detect if device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check if device/IP already used for signup
const checkDeviceAlreadyUsed = async (deviceInfo) => {
  try {
    // Check by fingerprint
    const fingerprintQuery = query(
      collection(db, 'users'),
      where('deviceFingerprint', '==', deviceInfo.fingerprint)
    );
    const fingerprintDocs = await getDocs(fingerprintQuery);

    if (!fingerprintDocs.empty) {
      return {
        allowed: false,
        reason: 'This device has already been used to create an account. Only one free account per device is allowed.'
      };
    }

    // Check by IP address
    const ipQuery = query(
      collection(db, 'users'),
      where('ipAddress', '==', deviceInfo.ipAddress)
    );
    const ipDocs = await getDocs(ipQuery);

    if (!ipDocs.empty) {
      return {
        allowed: false,
        reason: 'An account has already been created from this network. Only one free account per network is allowed.'
      };
    }

    return { allowed: true };
  } catch (error) {
    console.error('Error checking device:', error);
    // Allow signup if check fails (don't block legitimate users)
    return { allowed: true };
  }
};

// Sign up with email and password
export const signUpWithEmail = async (email, password, displayName, referralCode = '') => {
  try {
    // Get device info
    const deviceInfo = await getDeviceInfo();

    // Check if device/IP already used
    const deviceCheck = await checkDeviceAlreadyUsed(deviceInfo);
    if (!deviceCheck.allowed) {
      return { success: false, error: deviceCheck.reason };
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName });

    // Send email verification
    try {
      await sendEmailVerification(user, {
        url: window.location.origin + '/login',
        handleCodeInApp: false
      });
      console.log('[AUTH] Verification email sent to:', email);
    } catch (verifyError) {
      console.error('[AUTH] Failed to send verification email:', verifyError);
      // Don't fail signup if verification email fails
    }

    // Create user document in Firestore with 2 hours free
    const docId = email.replace('@', '_at_').replace(/\./g, '_');

    let initialSeconds = 7200; // 2 hours free
    let paymentHistory = [{
      amount: 0,
      seconds: 7200,
      package: 'Welcome Bonus - 2 Hours Premium Trial',
      date: new Date().toISOString(),
      payment_id: 'free_signup_' + Date.now(),
    }];

    // Store referral code for later (will reward referrer when user makes first purchase)
    let referredBy = '';
    if (referralCode) {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('referral_code', '==', referralCode.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const referrerDoc = querySnapshot.docs[0];
        referredBy = referrerDoc.id; // Store referrer's doc ID
        
        paymentHistory.push({
          amount: 0,
          seconds: 0,
          package: 'Referred by: ' + referralCode,
          date: new Date().toISOString(),
          payment_id: 'referral_pending_' + Date.now(),
        });
      }
    }

    // Generate unique referral code for new user
    const newUserReferralCode = email.split('@')[0].toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

    await setDoc(doc(db, 'users', docId), {
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      remaining_seconds: initialSeconds, // 2 hours free (usable)
      total_purchased: 0,
      deviceFingerprint: deviceInfo.fingerprint,
      ipAddress: deviceInfo.ipAddress,
      deviceInfo: deviceInfo,
      referral_code: newUserReferralCode,
      referred_by: referredBy, // Store who referred this user
      referrals: [],
      payment_history: paymentHistory,
      subscription_plan: 'premium', // Start with premium for 2 hours trial
      trial_mode: true, // Mark as trial user
      api_keys: { mistral: '', gemini: '' } // Empty by default
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Process Google user after successful authentication
const processGoogleUser = async (user) => {
  try {
    // Check if user document exists
    const docId = user.email.replace('@', '_at_').replace(/\./g, '_');
    const userDoc = await getDoc(doc(db, 'users', docId));

    // Create user document if doesn't exist (with 2 hours free)
    if (!userDoc.exists()) {
      console.log('[AUTH] New Google user, checking device...');
      
      // Get device info
      const deviceInfo = await getDeviceInfo();

      // Check if device/IP already used
      const deviceCheck = await checkDeviceAlreadyUsed(deviceInfo);
      if (!deviceCheck.allowed) {
        console.log('[AUTH] Device already used:', deviceCheck.reason);
        
        // Store error in localStorage for immediate display
        localStorage.setItem('authError', deviceCheck.reason);
        
        // Delete the auth account since we can't allow signup
        try {
          await user.delete();
          console.log('[AUTH] Deleted unauthorized user account');
        } catch (deleteError) {
          console.error('[AUTH] Failed to delete user:', deleteError);
          // Force sign out if delete fails
          await signOut(auth);
        }
        
        return { 
          success: false, 
          error: deviceCheck.reason
        };
      }

      console.log('[AUTH] Device check passed, creating user document...');

      // Generate unique referral code for new user
      const newUserReferralCode = user.email.split('@')[0].toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

      await setDoc(doc(db, 'users', docId), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || '',
        phoneNumber: user.phoneNumber || '',
        createdAt: serverTimestamp(),
        remaining_seconds: 7200, // 2 hours free for new users (Premium trial)
        total_purchased: 0, // Don't count free time - only actual purchases
        deviceFingerprint: deviceInfo.fingerprint,
        ipAddress: deviceInfo.ipAddress,
        deviceInfo: deviceInfo,
        referral_code: newUserReferralCode,
        referred_by: '',
        referrals: [],
        subscription_plan: 'premium', // Start with premium for trial
        trial_mode: true, // Mark as trial user
        api_keys: { mistral: '', gemini: '' }, // Empty by default
        payment_history: [{
          amount: 0,
          seconds: 7200,
          package: 'Welcome Bonus - 2 Hours Premium Trial',
          date: new Date().toISOString(),
          payment_id: 'free_google_' + Date.now(),
        }]
      });
      
      console.log('[AUTH] User document created successfully');
    } else {
      console.log('[AUTH] Existing Google user, logging in...');
      
      // Update phone number if available
      const currentData = userDoc.data();
      if (user.phoneNumber && !currentData.phoneNumber) {
        await setDoc(doc(db, 'users', docId), {
          phoneNumber: user.phoneNumber
        }, { merge: true });
      }
    }

    return { success: true, user };
  } catch (error) {
    console.error('[AUTH] Error processing Google user:', error);
    localStorage.setItem('authError', error.message);
    return { success: false, error: error.message };
  }
};

// Sign in with Google (uses redirect on mobile, popup on desktop)
export const signInWithGoogle = async () => {
  try {
    if (isMobile()) {
      // Use redirect method for mobile devices
      await signInWithRedirect(auth, googleProvider);
      // The result will be handled by handleGoogleRedirect
      return { success: true, redirecting: true };
    } else {
      // Use popup method for desktop
      const result = await signInWithPopup(auth, googleProvider);
      return await processGoogleUser(result.user);
    }
  } catch (error) {
    console.error('[AUTH] Google sign-in error:', error);
    return { success: false, error: error.message };
  }
};

// Handle Google redirect result (call this on page load)
export const handleGoogleRedirect = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result && result.user) {
      console.log('[AUTH] Processing Google redirect for:', result.user.email);
      const processResult = await processGoogleUser(result.user);
      
      // If processing failed, sign out the user
      if (!processResult.success) {
        await signOut(auth);
        console.log('[AUTH] Signed out user due to device restriction');
      }
      
      return processResult;
    }
    return null;
  } catch (error) {
    console.error('[AUTH] Google redirect error:', error);
    
    // Handle specific error cases
    let errorMessage = error.message;
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Login cancelled. Please try again.';
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please check your connection and try again.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Auth state observer
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Reset password
export const resetPassword = async (email) => {
  try {
    // Configure action code settings
    const actionCodeSettings = {
      url: window.location.origin + '/login', // Redirect back to login after reset
      handleCodeInApp: false
    };
    
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    console.log('[AUTH] Password reset email sent to:', email);
    return { success: true };
  } catch (error) {
    console.error('[AUTH] Password reset error:', error);
    
    // User-friendly error messages
    let errorMessage = error.message;
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email address.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address format.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many requests. Please try again later.';
    }
    
    return { success: false, error: errorMessage };
  }
};

// Resend verification email
export const resendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      return { success: false, error: 'No user logged in' };
    }
    
    if (user.emailVerified) {
      return { success: false, error: 'Email already verified' };
    }
    
    await sendEmailVerification(user, {
      url: window.location.origin + '/login',
      handleCodeInApp: false
    });
    
    console.log('[AUTH] Verification email resent to:', user.email);
    return { success: true };
  } catch (error) {
    console.error('[AUTH] Resend verification error:', error);
    
    let errorMessage = error.message;
    if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
    }
    
    return { success: false, error: errorMessage };
  }
};
