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
        referrals: data.referrals || [], // Array of { email, date, name }
        subscription_plan: data.subscription_plan || 'basic',
        api_keys: data.api_keys || { mistral: '', gemini: '' },
        trial_mode: data.trial_mode || false,
        referred_by: data.referred_by || ''
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
export const addPurchasedTime = async (userEmail, seconds, amount, packageName, paymentId, subscriptionPlan = 'basic') => {
  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    const userDoc = await getDoc(doc(db, 'users', docId));

    if (userDoc.exists()) {
      const data = userDoc.data();
      const currentRemaining = data.remaining_seconds || 0;
      const currentTotal = data.total_purchased || 0;
      const currentHistory = data.payment_history || [];
      const referredBy = data.referred_by || '';
      const isFirstPurchase = currentTotal === 0;

      // Calculate new time
      let newRemainingSeconds = currentRemaining + seconds;

      const updateData = {
        remaining_seconds: newRemainingSeconds,
        total_purchased: currentTotal + seconds,
        subscription_plan: subscriptionPlan, // Update to purchased plan
        trial_mode: false, // No longer in trial after first purchase
        plan_updated_at: new Date().toISOString(),
        payment_history: [
          ...currentHistory,
          {
            amount,
            seconds,
            package: packageName,
            plan: subscriptionPlan,
            date: new Date().toISOString(),
            payment_id: paymentId
          }
        ],
        lastUpdated: serverTimestamp()
      };

      await updateDoc(doc(db, 'users', docId), updateData);

      // REWARD REFERRER on first purchase
      if (isFirstPurchase && referredBy) {
        try {
          console.log(`[FIREBASE] 🎁 First purchase detected! Rewarding referrer: ${referredBy}`);
          
          const referrerDoc = await getDoc(doc(db, 'users', referredBy));
          if (referrerDoc.exists()) {
            const referrerData = referrerDoc.data();
            
            // Give 30 minutes (1800 seconds) to Referrer
            await updateDoc(doc(db, 'users', referredBy), {
              remaining_seconds: (referrerData.remaining_seconds || 0) + 1800,
              total_referrals: (referrerData.total_referrals || 0) + 1,
              referrals: [
                ...(referrerData.referrals || []),
                { 
                  email: userEmail, 
                  name: data.displayName || 'User',
                  date: new Date().toISOString(),
                  reward_seconds: 1800,
                  purchased_plan: subscriptionPlan
                }
              ],
              payment_history: [
                ...(referrerData.payment_history || []),
                {
                  amount: 0,
                  seconds: 1800,
                  package: `Referral Reward - ${userEmail} made first purchase`,
                  date: new Date().toISOString(),
                  payment_id: 'referral_reward_' + Date.now()
                }
              ]
            });
            
            console.log(`[FIREBASE] ✅ Referrer rewarded with 30 minutes!`);
          }
        } catch (referralError) {
          console.error('[FIREBASE] ❌ Error rewarding referrer:', referralError);
          // Don't fail the purchase if referral reward fails
        }
      }

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
