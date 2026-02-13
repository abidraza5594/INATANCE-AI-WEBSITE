import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// Save user's API keys to Firebase
export const saveUserAPIKeys = async (userEmail, mistralKey, geminiKey) => {
  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    
    await updateDoc(doc(db, 'users', docId), {
      api_keys: {
        mistral: mistralKey || '',
        gemini: geminiKey || '',
        updated_at: new Date().toISOString()
      },
      lastUpdated: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error saving API keys:', error);
    return { success: false, error: error.message };
  }
};

// Get user's API keys from Firebase
export const getUserAPIKeys = async (userEmail) => {
  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    const userDoc = await getDoc(doc(db, 'users', docId));
    
    if (userDoc.exists()) {
      const data = userDoc.data();
      return {
        success: true,
        api_keys: data.api_keys || { mistral: '', gemini: '' },
        subscription_plan: data.subscription_plan || 'basic'
      };
    }
    
    return { success: false, error: 'User not found' };
  } catch (error) {
    console.error('Error getting API keys:', error);
    return { success: false, error: error.message };
  }
};

// Update subscription plan
export const updateSubscriptionPlan = async (userEmail, plan) => {
  try {
    const docId = userEmail.replace('@', '_at_').replace(/\./g, '_');
    
    await updateDoc(doc(db, 'users', docId), {
      subscription_plan: plan, // 'basic' or 'premium'
      plan_updated_at: new Date().toISOString(),
      lastUpdated: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    return { success: false, error: error.message };
  }
};

// Validate API keys format
export const validateAPIKeys = (mistralKey, geminiKey) => {
  const errors = [];
  
  if (!mistralKey || mistralKey.trim().length < 10) {
    errors.push('Mistral API key is required and must be valid');
  }
  
  if (!geminiKey || geminiKey.trim().length < 10) {
    errors.push('Gemini API key is required and must be valid');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Check if user needs to provide API keys based on plan
export const requiresAPIKeys = (subscriptionPlan) => {
  return subscriptionPlan === 'basic';
};
