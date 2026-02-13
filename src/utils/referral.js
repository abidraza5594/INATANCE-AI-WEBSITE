import { doc, getDoc, updateDoc, increment, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// Get referral code from URL
export const getReferralCodeFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ref');
};

// Process referral on signup
export const processReferral = async (newUserEmail, referralCode) => {
  if (!referralCode) return { success: false, message: 'No referral code' };

  try {
    // Find referrer by email prefix
    const referrerEmail = `${referralCode}@`; // Partial match
    
    // Search for user with matching email prefix
    // For simplicity, we'll construct the full email format
    // In production, you'd query Firestore to find the user
    
    // For now, we'll assume the referral code is the email prefix before @
    // You need to store a mapping or search through users
    
    // Add 30 minutes (1800 seconds) to referrer
    const referrerDocId = referralCode.replace('@', '_at_').replace(/\./g, '_');
    
    try {
      const referrerDoc = await getDoc(doc(db, 'users', referrerDocId));
      
      if (referrerDoc.exists()) {
        // Add 30 minutes to referrer
        await updateDoc(doc(db, 'users', referrerDocId), {
          remaining_seconds: increment(1800), // 30 minutes
          total_referrals: increment(1),
          referral_history: arrayUnion({
            referred_user: newUserEmail,
            date: new Date().toISOString(),
            reward_seconds: 1800
          }),
          lastUpdated: serverTimestamp()
        });

        return { 
          success: true, 
          message: 'Referral processed successfully',
          referrerEmail: referrerDoc.data().email
        };
      }
    } catch (error) {
      console.error('Error processing referral:', error);
    }

    return { success: false, message: 'Referrer not found' };
  } catch (error) {
    console.error('Error in processReferral:', error);
    return { success: false, message: error.message };
  }
};

// Generate referral code from email
export const generateReferralCode = (email) => {
  return email.split('@')[0];
};

// Get referral link
export const getReferralLink = (email) => {
  const code = generateReferralCode(email);
  return `${window.location.origin}/?ref=${code}`;
};

// Track referral in new user's account
export const trackReferralSource = async (userEmail, referralCode) => {
  if (!referralCode) return;

  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    await updateDoc(doc(db, 'users', docId), {
      referred_by: referralCode,
      referral_date: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking referral source:', error);
  }
};
