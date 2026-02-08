# 🔥 Firebase Web App Setup Guide

## ❌ Current Error
```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

**Reason:** The `.env` file has placeholder/incomplete Firebase credentials.

---

## ✅ Solution: Get Real Firebase Web App Credentials

### Step 1: Open Firebase Console
1. Go to: https://console.firebase.google.com/
2. Select project: **ai-assitence**
3. Click on **Settings** (gear icon) → **Project settings**

### Step 2: Add Web App (if not exists)
1. Scroll down to **"Your apps"** section
2. Look for a Web app (</> icon)
3. **If Web app doesn't exist:**
   - Click **"Add app"** button
   - Select **Web** (</> icon)
   - Enter nickname: `InterviewAI Website`
   - Check **"Also set up Firebase Hosting"** (optional)
   - Click **"Register app"**

### Step 3: Copy Firebase Config
You'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "ai-assitence.firebaseapp.com",
  projectId: "ai-assitence",
  storageBucket: "ai-assitence.appspot.com",
  messagingSenderId: "114034483120597765987",
  appId: "1:114034483120597765987:web:XXXXXXXXXXXXXXXXXX"
};
```

### Step 4: Update `.env` File
Open `InterviewAI-Website/.env` and replace these values:

```env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=ai-assitence.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ai-assitence
VITE_FIREBASE_STORAGE_BUCKET=ai-assitence.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=114034483120597765987
VITE_FIREBASE_APP_ID=1:114034483120597765987:web:XXXXXXXXXXXXXXXXXX
```

**Important:** Replace the `XXXXXXXXXX` with actual values from Firebase Console!

---

## 🔐 Enable Google Authentication

### Step 1: Enable Google Sign-In Method
1. In Firebase Console, go to **Authentication** (left sidebar)
2. Click **"Sign-in method"** tab
3. Find **"Google"** in the list
4. Click on it
5. Toggle **"Enable"** switch to ON
6. Enter **Project support email** (your email)
7. Click **"Save"**

### Step 2: Add Authorized Domain (for production)
1. In **Authentication** → **Settings** tab
2. Scroll to **"Authorized domains"**
3. Add your Hostinger domain when deploying
4. `localhost` is already authorized for development

---

## 🧪 Test the Setup

### Step 1: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 2: Test Google Login
1. Open http://localhost:5174/signup
2. Click **"Continue with Google"** button
3. Select your Google account
4. Should successfully create account and redirect to dashboard

### Step 3: Test Email Signup
1. Enter name, email, password
2. Click **"Create Account"**
3. Should successfully create account

---

## 📋 Checklist

- [ ] Opened Firebase Console
- [ ] Selected `ai-assitence` project
- [ ] Added Web app (if not exists)
- [ ] Copied `apiKey` from Firebase config
- [ ] Copied `appId` from Firebase config
- [ ] Updated `.env` file with real values
- [ ] Enabled Google Sign-in method
- [ ] Restarted dev server
- [ ] Tested Google login
- [ ] Tested email signup

---

## 🆘 Still Having Issues?

### Error: "auth/api-key-not-valid"
- Double-check the `VITE_FIREBASE_API_KEY` in `.env`
- Make sure you copied the FULL API key (starts with `AIzaSy`)
- Restart dev server after changing `.env`

### Error: "auth/unauthorized-domain"
- Add your domain to Authorized domains in Firebase Console
- For localhost, it should work by default

### Error: "auth/operation-not-allowed"
- Enable Google Sign-in method in Firebase Console
- Go to Authentication → Sign-in method → Enable Google

---

## 📞 Need Help?

If you're still stuck, send me:
1. Screenshot of Firebase Console → Project Settings → Your apps
2. Screenshot of the error in browser console (F12)
3. Your `.env` file (hide the actual API key values)

---

**Next Step:** After fixing Firebase credentials, the Google login will work perfectly! 🎉
