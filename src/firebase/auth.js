import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, query, collection, where, getDocs } from 'firebase/firestore';
import { auth, db } from './config';
import { getDeviceInfo } from '../utils/deviceFingerprint';

const googleProvider = new GoogleAuthProvider();

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
export const signUpWithEmail = async (email, password, displayName) => {
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
    
    // Create user document in Firestore with 2 hours free
    const docId = email.replace('@', '_at_').replace(/\./g, '_');
    await setDoc(doc(db, 'users', docId), {
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      remaining_seconds: 7200, // 2 hours free for new users (1 interview)
      total_purchased: 0, // Don't count free time - only actual purchases
      deviceFingerprint: deviceInfo.fingerprint,
      ipAddress: deviceInfo.ipAddress,
      deviceInfo: deviceInfo,
      payment_history: [{
        amount: 0,
        seconds: 7200,
        package: 'Welcome Bonus - 1 Free Interview',
        date: new Date().toISOString(),
        payment_id: 'free_signup_' + Date.now(),
      }]
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

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user document exists
    const docId = user.email.replace('@', '_at_').replace(/\./g, '_');
    const userDoc = await getDoc(doc(db, 'users', docId));
    
    // Create user document if doesn't exist (with 2 hours free)
    if (!userDoc.exists()) {
      // Get device info
      const deviceInfo = await getDeviceInfo();
      
      // Check if device/IP already used
      const deviceCheck = await checkDeviceAlreadyUsed(deviceInfo);
      if (!deviceCheck.allowed) {
        // Delete the auth account since we can't allow signup
        await user.delete();
        return { success: false, error: deviceCheck.reason };
      }

      await setDoc(doc(db, 'users', docId), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || '',
        phoneNumber: user.phoneNumber || '',
        createdAt: serverTimestamp(),
        remaining_seconds: 7200, // 2 hours free for new users (1 interview)
        total_purchased: 0, // Don't count free time - only actual purchases
        deviceFingerprint: deviceInfo.fingerprint,
        ipAddress: deviceInfo.ipAddress,
        deviceInfo: deviceInfo,
        payment_history: [{
          amount: 0,
          seconds: 7200,
          package: 'Welcome Bonus - 1 Free Interview',
          date: new Date().toISOString(),
          payment_id: 'free_google_' + Date.now(),
        }]
      });
    } else {
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
    return { success: false, error: error.message };
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
