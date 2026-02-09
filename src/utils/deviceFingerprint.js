import FingerprintJS from '@fingerprintjs/fingerprintjs';

// Initialize fingerprint
let fpPromise = null;

export const initFingerprint = async () => {
  if (!fpPromise) {
    fpPromise = FingerprintJS.load();
  }
  return fpPromise;
};

// Get device fingerprint
export const getDeviceFingerprint = async () => {
  try {
    const fp = await initFingerprint();
    const result = await fp.get();
    return result.visitorId;
  } catch (error) {
    console.error('Error getting device fingerprint:', error);
    return null;
  }
};

// Get IP address (using public API)
export const getIPAddress = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return null;
  }
};

// Get comprehensive device info
export const getDeviceInfo = async () => {
  const fingerprint = await getDeviceFingerprint();
  const ipAddress = await getIPAddress();
  
  return {
    fingerprint,
    ipAddress,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString()
  };
};
