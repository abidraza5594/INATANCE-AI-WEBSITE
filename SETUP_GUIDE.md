# 🚀 InterviewAI Website - Complete Setup Guide

## 📦 Project Created Successfully!

Modern React website with Vite, Firebase Auth, Razorpay Payment, and beautiful animations.

---

## 🛠️ INSTALLATION STEPS

### 1️⃣ Install Dependencies
```bash
cd interviewai-website
npm install
```

### 2️⃣ Install Additional Packages
```bash
npm install firebase framer-motion react-router-dom razorpay lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 🔥 FIREBASE SETUP

### 1️⃣ Get Firebase Config
1. Go to Firebase Console: https://console.firebase.google.com
2. Select your project: `auto-job-b0990`
3. Project Settings → General → Your apps
4. Copy Firebase config

### 2️⃣ Create `.env` file
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=auto-job-b0990
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 💳 RAZORPAY SETUP

### 1️⃣ Get Razorpay Keys
1. Go to Razorpay Dashboard: https://dashboard.razorpay.com
2. Settings → API Keys
3. Copy Key ID and Key Secret

### 2️⃣ Add to `.env`
```env
VITE_RAZORPAY_KEY_ID=rzp_test_SDNdo16NqaMmMD
```

---

## 🎨 FEATURES INCLUDED

✅ Modern UI with Tailwind CSS
✅ Smooth animations with Framer Motion
✅ Firebase Authentication (Email + Google)
✅ User Profile Dashboard
✅ Razorpay Payment Integration
✅ Responsive Design
✅ Dark Mode Support
✅ Protected Routes
✅ Loading States
✅ Error Handling

---

## 🚀 RUN DEVELOPMENT SERVER

```bash
npm run dev
```

Open: http://localhost:5173

---

## 📦 BUILD FOR PRODUCTION

```bash
npm run build
```

Output folder: `dist/`

---

## 🌐 DEPLOY TO HOSTINGER

### 1️⃣ Build Project
```bash
npm run build
```

### 2️⃣ Upload to Hostinger
1. Login to Hostinger cPanel
2. Go to File Manager
3. Navigate to `public_html`
4. Upload all files from `dist/` folder
5. Done! ✅

### 3️⃣ Configure Domain
1. Point domain to Hostinger
2. Update DNS settings
3. Wait 24-48 hours for propagation

---

## 📁 PROJECT STRUCTURE

```
interviewai-website/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Pricing.jsx
│   │   ├── Footer.jsx
│   │   └── Dashboard/
│   │       ├── Profile.jsx
│   │       ├── Payment.jsx
│   │       └── Stats.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   ├── firebase/        # Firebase config
│   │   └── config.js
│   ├── utils/           # Utility functions
│   │   └── razorpay.js
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── .env                 # Environment variables
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

---

## 🎯 NEXT STEPS

1. ✅ Install dependencies
2. ✅ Setup Firebase config
3. ✅ Setup Razorpay keys
4. ✅ Run development server
5. ✅ Test all features
6. ✅ Build for production
7. ✅ Deploy to Hostinger

---

## 📞 SUPPORT

Need help? Check:
- Firebase Docs: https://firebase.google.com/docs
- Razorpay Docs: https://razorpay.com/docs
- Vite Docs: https://vitejs.dev

---

**Ready to build! 🚀**
