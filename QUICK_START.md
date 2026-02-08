# 🚀 QUICK START - InterviewAI Website

## ✅ WEBSITE 100% COMPLETE!

All files created successfully. Ready to run!

---

## 📋 BEFORE STARTING

### Step 1: Add Firebase Credentials

Edit `.env` file and add your Firebase credentials:

1. Go to: https://console.firebase.google.com
2. Select project: `auto-job-b0990`
3. Settings → Project Settings → Your apps
4. Copy these values to `.env`:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

---

## 🚀 START DEVELOPMENT SERVER

```bash
cd interviewai-website
npm run dev
```

Open: http://localhost:5173

---

## ✨ WHAT'S INCLUDED

### Pages:
✅ Home (Hero + Features + Pricing)
✅ Login (Email + Google)
✅ Signup (Email + Google)
✅ Dashboard (Profile + Payment + Stats)

### Features:
✅ Firebase Authentication
✅ Real-time data updates
✅ Razorpay payment integration
✅ Responsive design
✅ Beautiful animations
✅ Modern UI with Tailwind CSS

### Components:
✅ Navbar with auth state
✅ Hero section with animations
✅ Features showcase
✅ Pricing cards
✅ Footer

---

## 🧪 TESTING CHECKLIST

After starting dev server, test:

- [ ] Homepage loads
- [ ] Signup with email
- [ ] Signup with Google
- [ ] Login with email
- [ ] Login with Google
- [ ] Dashboard shows user info
- [ ] Payment links open
- [ ] Logout works
- [ ] Mobile responsive

---

## 📦 BUILD FOR PRODUCTION

```bash
npm run build
```

Output: `dist/` folder

---

## 🌐 DEPLOY TO HOSTINGER

1. Build: `npm run build`
2. Upload `dist/` contents to `public_html`
3. Add `.htaccess` file (already in `public/` folder)
4. Done! ✅

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## 🆘 TROUBLESHOOTING

**"Module not found" error:**
```bash
npm install
```

**Firebase not working:**
- Check `.env` file exists
- Verify credentials are correct
- Enable Email & Google auth in Firebase Console

**Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173
npm run dev
```

---

## 📞 DOCUMENTATION

- **START_HERE.md** - Quick overview
- **README.md** - Project details
- **DEPLOYMENT_GUIDE.md** - Deploy instructions
- **SETUP_GUIDE.md** - Detailed setup

---

**🎉 Ready to start! Run `npm run dev`** 🚀
