import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

const googleProvider = new GoogleAuthProvider();

// Sign up with email and password
export const signUpWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore with 10 minutes free
    const docId = email.replace('@', '_at_').replace(/\./g, '_');
    await setDoc(doc(db, 'users', docId), {
      email: user.email,
      displayName: displayName,
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
      remaining_seconds: 600, // 10 minutes free for new users
      total_purchased: 0, // Don't count free time - only actual purchases
      payment_history: [{
        amount: 0,
        seconds: 600,
        package: 'Welcome Bonus',
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
    
    // Create user document if doesn't exist (with 10 minutes free)
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', docId), {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL || '',
        phoneNumber: user.phoneNumber || '',
        createdAt: serverTimestamp(),
        remaining_seconds: 600, // 10 minutes free for new users
        total_purchased: 0, // Don't count free time - only actual purchases
        payment_history: [{
          amount: 0,
          seconds: 600,
          package: 'Welcome Bonus',
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
