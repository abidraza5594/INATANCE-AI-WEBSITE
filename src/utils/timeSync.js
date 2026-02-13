import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// Get user's remaining time from Firestore
export const getUserTime = async (userEmail) => {
  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    const userDoc = await getDoc(doc(db, 'users', docId));

    if (userDoc.exists()) {
      const data = userDoc.data();

      // If user doesn't have a referral code, generate one (for legacy users)
      let referralCode = data.referral_code;
      if (!referralCode) {
        referralCode = userEmail.split('@')[0].toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
        await updateDoc(doc(db, 'users', docId), { referral_code: referralCode });
      }

      return {
        remaining_seconds: data.remaining_seconds || 0,
        total_purchased: data.total_purchased || 0,
        payment_history: data.payment_history || [],
        referral_code: referralCode,
        referrals: data.referrals || [] // Array of { email, date, name }
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting user time:', error);
    return null;
  }
};

// Update user's remaining time
export const updateUserTime = async (userEmail, newRemainingSeconds) => {
  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    await updateDoc(doc(db, 'users', docId), {
      remaining_seconds: newRemainingSeconds,
      lastUpdated: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating user time:', error);
    return false;
  }
};

// Add purchased time to user account
export const addPurchasedTime = async (userEmail, seconds, amount, packageName, paymentId) => {
  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    const userDoc = await getDoc(doc(db, 'users', docId));

    if (userDoc.exists()) {
      const data = userDoc.data();
      const currentRemaining = data.remaining_seconds || 0;
      const currentTotal = data.total_purchased || 0;
      const currentHistory = data.payment_history || [];

      await updateDoc(doc(db, 'users', docId), {
        remaining_seconds: currentRemaining + seconds,
        total_purchased: currentTotal + seconds,
        payment_history: [
          ...currentHistory,
          {
            amount,
            seconds,
            package: packageName,
            date: new Date().toISOString(),
            payment_id: paymentId
          }
        ],
        lastUpdated: serverTimestamp()
      });

      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding purchased time:', error);
    return false;
  }
};

// Format seconds to readable time
export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

// Convert time to seconds
export const timeToSeconds = (hours) => {
  return hours * 3600;
};
