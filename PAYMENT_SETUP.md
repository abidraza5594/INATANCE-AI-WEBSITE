# Payment Integration Setup Guide

## Overview
Automatic payment processing using Razorpay webhooks and Vercel serverless functions.

## Architecture
```
User Payment (Razorpay) 
    ↓
Razorpay Webhook Trigger
    ↓
Vercel Serverless API (/api/razorpay-webhook)
    ↓
Verify Payment Signature
    ↓
Update Firebase Firestore
    ↓
Dashboard Auto-Updates (Real-time listener)
```

## Setup Steps

### 1. Install Dependencies
```bash
cd InterviewAI-Website
npm install firebase-admin
```

### 2. Razorpay Webhook Configuration

1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **Webhooks**
3. Click **Create New Webhook**
4. Configure:
   - **Webhook URL**: `https://your-domain.vercel.app/api/razorpay-webhook`
   - **Active Events**: Select `payment.captured`
   - **Secret**: Copy the generated secret (you'll need this)

### 3. Update Payment Links with User Email

Currently payment links are static. You need to add user email in notes:

**Option A: Use Razorpay Standard Checkout (Recommended)**
Update Dashboard.jsx and Pricing.jsx:

```javascript
const handlePayment = async () => {
  const options = {
    key: 'YOUR_RAZORPAY_KEY_ID', // Get from Razorpay Dashboard
    amount: currentPrice * 100, // Amount in paise
    currency: 'INR',
    name: 'InterviewAI',
    description: '2 Hours Practice Time',
    handler: function (response) {
      alert('Payment successful! Time will be added in 2-5 seconds.');
    },
    prefill: {
      email: user.email,
      name: user.displayName,
    },
    notes: {
      email: user.email, // IMPORTANT: This is used by webhook
    },
    theme: {
      color: '#3B82F6',
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

**Option B: Update Payment Links**
Create custom payment links for each user with email in notes field.

### 4. Vercel Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```
FIREBASE_PROJECT_ID=ai-assitence
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@ai-assitence.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=<paste the entire private key>
RAZORPAY_WEBHOOK_SECRET=<paste webhook secret from Razorpay>
```

**Important**: For `FIREBASE_PRIVATE_KEY`, paste the entire key including `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 6. Test Payment Flow

1. Login to your website
2. Go to Dashboard
3. Click "Buy Now"
4. Complete test payment (use Razorpay test mode)
5. Check Dashboard - time should be added within 2-5 seconds

## How It Works

### Payment Flow:
1. User clicks "Buy Now" → Opens Razorpay payment page
2. User completes payment
3. Razorpay sends webhook to `/api/razorpay-webhook`
4. API verifies signature (security check)
5. API updates Firestore:
   - Adds 7200 seconds (2 hours) to `remaining_seconds`
   - Updates `total_purchased`
   - Adds entry to `payment_history`
6. Dashboard automatically updates (real-time listener already working)

### Security:
- Webhook signature verification prevents fake payments
- Firebase Admin SDK runs on server (secure)
- Private keys stored in environment variables (not in code)

## Pricing Logic

The system automatically detects first-time vs returning users:

- **First Time** (`total_purchased = 0`): ₹300
- **Regular** (`total_purchased > 0`): ₹500

Payment links should match:
- First time: `https://rzp.io/rzp/7Q42vVa` (₹300)
- Regular: `https://rzp.io/rzp/GrVtHchT` (₹500)

## Troubleshooting

### Payment not adding time:
1. Check Vercel logs: `vercel logs`
2. Verify webhook secret is correct
3. Check if email is being sent in payment notes
4. Verify Firebase credentials in Vercel environment variables

### Webhook not triggering:
1. Check Razorpay webhook logs in dashboard
2. Verify webhook URL is correct
3. Test webhook manually from Razorpay dashboard

### Firebase permission error:
1. Verify service account has Firestore write permissions
2. Check if private key is correctly formatted in environment variables

## Testing Locally

To test webhook locally:
1. Use ngrok: `ngrok http 3000`
2. Update Razorpay webhook URL to ngrok URL
3. Run: `vercel dev`
4. Make test payment

## Production Checklist

- [ ] Razorpay webhook configured with production URL
- [ ] Environment variables set in Vercel
- [ ] Payment links updated with user email in notes
- [ ] Test payment completed successfully
- [ ] Dashboard updates automatically after payment
- [ ] Payment history showing correctly

## Support

If you face any issues:
1. Check Vercel function logs
2. Check Razorpay webhook logs
3. Verify all environment variables are set correctly
4. Test with Razorpay test mode first
