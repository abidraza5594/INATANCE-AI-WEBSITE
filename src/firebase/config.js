import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummy",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "auto-job-b0990.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'auto-job-b0990',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "auto-job-b0990.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abc123"
};

// Initialize Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth, db };
export default app;
