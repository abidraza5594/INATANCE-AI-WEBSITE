# 🔄 REAL-TIME SYNC DEBUGGING GUIDE

## ❌ PROBLEM
User reports needing to **refresh page** to see changes (time updates, app status)

## 🎯 EXPECTED BEHAVIOR
- Time should update **automatically** every 5 seconds
- App status should change **without refresh** (Active/Idle/Offline)
- Payment time should add **automatically** after payment

---

## ✅ CURRENT IMPLEMENTATION

### Dashboard (Website)
```javascript
// Firebase onSnapshot listener (real-time)
const unsubscribe = onSnapshot(userRef, (doc) => {
  console.log('[DASHBOARD] Firebase update received!');
  // Updates state automatically
  setUserData(data);
  setAppStatus('active/idle/offline');
});

// Additional 5-second polling
setInterval(() => {
  setSyncing(true);
  // Visual indicator only
}, 5000);
```

### Desktop App (Python)
```python
# Updates Firebase every 5 seconds
if self.remaining_seconds % 5 == 0:
    self.auth.current_user.update({
        'remaining_seconds': self.remaining_seconds,
        'last_active': datetime.now().isoformat(),
        'is_using_app': True
    })
```

---

## 🔍 DEBUGGING STEPS

### STEP 1: Check Browser Console

1. Open dashboard: https://inatance-ai.vercel.app/dashboard
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Look for these messages:

**Expected logs every 5 seconds:**
```
[DASHBOARD] Firebase update received! 2026-02-08T15:30:45.123Z
[DASHBOARD] Data: {remaining_seconds: 1500, last_active: "...", is_using_app: true}
[DASHBOARD] Time diff: 2.5 seconds
[DASHBOARD] Status: ACTIVE
```

**If you DON'T see these logs:**
- Real-time listener is NOT working
- Check Firebase connection
- Check if user is logged in

---

### STEP 2: Check Desktop App Console

1. Open desktop app
2. Look at the console/terminal output
3. Look for these messages:

**Expected logs every 5 seconds:**
```
[TIME] ✅ Firebase updated: 0h 25m 0s (1500s total)
```

**If you DON'T see these logs:**
- Desktop app is NOT updating Firebase
- Check Firebase authentication
- Check internet connection

---

### STEP 3: Verify Firebase Rules

Firebase Firestore rules must allow real-time updates:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

### STEP 4: Check Network Tab

1. Open Developer Tools (F12)
2. Go to **Network** tab
3. Filter by **WS** (WebSocket)
4. Look for Firebase WebSocket connections

**Expected:**
- WebSocket connection to Firebase
- Status: **101 Switching Protocols** (connected)
- Messages flowing every 5 seconds

**If no WebSocket:**
- Real-time listener is NOT active
- Check Firebase initialization
- Check if onSnapshot is being called

---

## 🐛 COMMON ISSUES & FIXES

### Issue 1: "No logs in console"
**Cause**: Real-time listener not initialized
**Fix**: Check if user is logged in and Firebase is initialized

### Issue 2: "Logs appear but UI doesn't update"
**Cause**: State not updating properly
**Fix**: Check React state management in Dashboard.jsx

### Issue 3: "Desktop app not updating Firebase"
**Cause**: Firebase authentication failed
**Fix**: Check `firebase_auth.py` and user credentials

### Issue 4: "WebSocket disconnected"
**Cause**: Network issues or Firebase quota exceeded
**Fix**: 
- Check internet connection
- Check Firebase usage limits
- Restart browser

---

## 🧪 MANUAL TEST

### Test Real-Time Sync:

1. **Open dashboard** in browser
2. **Open browser console** (F12)
3. **Start desktop app**
4. **Watch console logs** - should see updates every 5 seconds
5. **Watch app status indicator** - should change to "🎯 App Active"
6. **Close desktop app**
7. **Wait 60 seconds**
8. **Watch app status** - should change to "⚪ App Offline"

**If any step fails**, real-time sync is broken.

---

## 🔧 FORCE REFRESH FIX (Temporary)

If real-time sync is not working, you can force refresh after payment:

```javascript
// In Dashboard.jsx - handleRazorpayPayment
handler: function (response) {
  alert('Payment successful! Refreshing...');
  setTimeout(() => {
    window.location.reload(); // Force refresh
  }, 3000);
}
```

**This is already implemented** - payment should auto-refresh after 3 seconds.

---

## ✅ VERIFICATION CHECKLIST

Real-time sync is working if:

- [ ] Console shows `[DASHBOARD] Firebase update received!` every 5 seconds
- [ ] Time decreases automatically (no refresh needed)
- [ ] App status changes automatically (Active → Idle → Offline)
- [ ] Payment time adds automatically (within 2-5 seconds)
- [ ] Desktop app and website show same time
- [ ] WebSocket connection visible in Network tab

---

## 🎯 EXPECTED TIMELINE

| Event | Time | What Happens |
|-------|------|--------------|
| Desktop app starts | 0s | Firebase updated with `last_active` |
| Website receives update | 0-1s | onSnapshot triggers, status → Active |
| Time decreases | Every 1s | Desktop app decrements locally |
| Firebase sync | Every 5s | Desktop app updates Firebase |
| Website sync | Every 5s | onSnapshot receives update |
| Desktop app closes | - | Stops updating `last_active` |
| Website detects idle | 10s | Status → Idle (no update for 10s) |
| Website detects offline | 60s | Status → Offline (no update for 60s) |

---

## 📞 STILL NOT WORKING?

If real-time sync still fails:

1. **Clear browser cache** and reload
2. **Check Firebase console** - verify data is actually updating
3. **Try different browser** - test in incognito mode
4. **Check Vercel deployment** - ensure latest code is deployed
5. **Verify Firebase config** - check `src/firebase/config.js`

---

## 🔍 ADVANCED DEBUGGING

### Check Firebase Connection:
```javascript
// Add to Dashboard.jsx
import { getFirestore, onSnapshot } from 'firebase/firestore';

useEffect(() => {
  console.log('[FIREBASE] Firestore instance:', db);
  console.log('[FIREBASE] User:', user);
  console.log('[FIREBASE] Doc ID:', user?.email.replace('.', '_').replace('@', '_at_'));
}, [user]);
```

### Check onSnapshot Status:
```javascript
const unsubscribe = onSnapshot(userRef, 
  (doc) => {
    console.log('[SNAPSHOT] Success:', doc.exists());
    console.log('[SNAPSHOT] Data:', doc.data());
  },
  (error) => {
    console.error('[SNAPSHOT] Error:', error);
  }
);
```

---

## ✅ SUCCESS INDICATORS

Real-time sync is working when:
- ✅ Console logs appear every 5 seconds
- ✅ Time updates without refresh
- ✅ App status changes automatically
- ✅ Payment adds time instantly
- ✅ Desktop and website stay in sync
