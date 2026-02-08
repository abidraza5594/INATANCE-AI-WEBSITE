# 🎯 InterviewAI - Professional Website

Modern, animated React website with Firebase Authentication and Razorpay Payment Integration.

## ✨ Features

- 🎨 **Modern UI** - Beautiful design with Tailwind CSS
- ✨ **Smooth Animations** - Framer Motion animations
- 🔐 **Firebase Auth** - Email & Google authentication
- 💳 **Razorpay Payment** - Integrated payment system
- 📱 **Responsive** - Works on all devices
- ⚡ **Fast** - Built with Vite
- 🎯 **User Dashboard** - Profile & payment management

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Add your Firebase & Razorpay credentials to .env

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
interviewai-website/
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── Pricing.jsx
│   │   └── Footer.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── Dashboard.jsx
│   ├── firebase/        # Firebase configuration
│   │   ├── config.js
│   │   └── auth.js
│   ├── App.jsx          # Main app
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static files
├── .env.example         # Environment variables template
├── DEPLOYMENT_GUIDE.md  # Detailed deployment guide
└── package.json         # Dependencies
```

## 🔧 Configuration

### Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Get your config from Project Settings
4. Add to `.env` file

### Razorpay Setup

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Get your API keys
3. Add to `.env` file

## 📦 Technologies Used

- **React 19** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Firebase** - Authentication & Database
- **React Router** - Routing
- **Lucide React** - Icons

## 🌐 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### Quick Deploy to Hostinger

```bash
# Build
npm run build

# Upload dist/ folder contents to public_html

# Add .htaccess file for React Router

# Done! ✅
```

## 📝 Environment Variables

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_RAZORPAY_KEY_ID=
VITE_FIRST_TIME_LINK=
VITE_REGULAR_LINK=
```

## 🎨 Pages

- **Home** - Landing page with hero, features, and pricing
- **Login** - Email & Google authentication
- **Signup** - User registration
- **Dashboard** - User profile, stats, and payment

## 💡 Key Features

### Authentication
- Email/Password signup & login
- Google OAuth integration
- Protected routes
- Auto-redirect based on auth state

### Dashboard
- Real-time time tracking
- Payment history
- User profile
- Statistics

### Payment
- Razorpay integration
- First-time special (₹300)
- Regular package (₹500)
- Auto-detection of first-time users

## 🐛 Troubleshooting

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for common issues and solutions.

## 📞 Support

- Firebase: https://firebase.google.com/docs
- Razorpay: https://razorpay.com/docs
- Vite: https://vitejs.dev

## 📄 License

MIT

---

**Built with ❤️ for InterviewAI**
