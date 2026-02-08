# 🚀 InterviewAI - Deployment Guide

## ✅ WEBSITE COMPLETE!

Professional React website with Firebase Auth, Razorpay Payment, and beautiful animations.

---

## 📋 SETUP STEPS

### 1️⃣ Create `.env` File

Copy `.env.example` to `.env` and add your credentials:

```bash
cp .env.example .env
```

Then edit `.env` with your Firebase config:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=auto-job-b0990.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=auto-job-b0990
VITE_FIREBASE_STORAGE_BUCKET=auto-job-b0990.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_RAZORPAY_KEY_ID=rzp_test_SDNdo16NqaMmMD
VITE_FIRST_TIME_LINK=https://rzp.io/rzp/7Q42vVa
VITE_REGULAR_LINK=https://rzp.io/rzp/GrVtHchT
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

Open: http://localhost:5173

---

## 🎨 FEATURES INCLUDED

✅ **Modern UI**
- Tailwind CSS styling
- Framer Motion animations
- Responsive design
- Beautiful gradients

✅ **Authentication**
- Email/Password signup & login
- Google OAuth
- Protected routes
- Auto-redirect

✅ **User Dashboard**
- Profile information
- Time tracking (real-time updates)
- Payment history
- Statistics

✅ **Payment Integration**
- Razorpay payment links
- First-time special (₹300)
- Regular package (₹500)
- Auto-detection of first-time users

✅ **Firebase Integration**
- Firestore database
- Real-time listeners
- Secure authentication
- User data management

---

## 🏗️ BUILD FOR PRODUCTION

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

---

## 🌐 DEPLOY TO HOSTINGER

### Method 1: File Manager (Easy)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Login to Hostinger cPanel**

3. **Go to File Manager**

4. **Navigate to `public_html`**

5. **Delete default files** (index.html, etc.)

6. **Upload all files from `dist/` folder**

7. **Done!** ✅

### Method 2: FTP (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Connect via FTP:**
   - Host: your-domain.com
   - Username: from Hostinger
   - Password: from Hostinger
   - Port: 21

3. **Upload `dist/` contents to `public_html`**

4. **Done!** ✅

---

## 🔧 HOSTINGER CONFIGURATION

### .htaccess File (Important for React Router)

Create `.htaccess` in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

This ensures React Router works properly.

---

## 🔥 FIREBASE SETUP

### Enable Authentication Methods

1. Go to Firebase Console
2. Authentication → Sign-in method
3. Enable:
   - ✅ Email/Password
   - ✅ Google

### Add Authorized Domain

1. Authentication → Settings → Authorized domains
2. Add your Hostinger domain:
   - `your-domain.com`
   - `www.your-domain.com`

---

## 📊 TESTING CHECKLIST

Before deploying, test:

- [ ] Homepage loads correctly
- [ ] Signup with email works
- [ ] Signup with Google works
- [ ] Login with email works
- [ ] Login with Google works
- [ ] Dashboard shows user data
- [ ] Time updates in real-time
- [ ] Payment links open correctly
- [ ] Logout works
- [ ] Mobile responsive
- [ ] All animations work

---

## 🆘 TROUBLESHOOTING

### Firebase Auth Not Working
- Check `.env` file has correct credentials
- Verify authorized domains in Firebase Console
- Check browser console for errors

### Payment Links Not Opening
- Verify `.env` has correct Razorpay links
- Check browser popup blocker

### Routing Not Working on Hostinger
- Add `.htaccess` file (see above)
- Clear browser cache

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## 📞 SUPPORT

**Firebase Console:** https://console.firebase.google.com  
**Razorpay Dashboard:** https://dashboard.razorpay.com  
**Hostinger Support:** https://www.hostinger.com/support

---

## 🎉 YOU'RE DONE!

Your professional InterviewAI website is ready to deploy!

**Next Steps:**
1. Create `.env` file with your credentials
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Deploy to Hostinger
5. Add `.htaccess` file
6. Test live website

**Good luck!** 🚀
