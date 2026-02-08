# 🚀 Quick Deploy to Vercel - 5 Minutes

## Step 1: Install Dependencies (1 min)
```bash
cd InterviewAI-Website
npm install
```

## Step 2: Deploy to Vercel (2 min)
```bash
npm i -g vercel
vercel login
vercel --prod
```

## Step 3: Add Environment Variables in Vercel Dashboard (1 min)

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these 4 variables:

```
FIREBASE_PROJECT_ID
ai-assitence

FIREBASE_CLIENT_EMAIL
firebase-adminsdk-fbsvc@ai-assitence.iam.gserviceaccount.com

FIREBASE_PRIVATE_KEY
(Copy from .env.production file - entire key with BEGIN/END lines)

RAZORPAY_WEBHOOK_SECRET
(Get from Razorpay Dashboard after creating webhook)
```

## Step 4: Setup Razorpay Webhook (1 min)

1. Go to: **Razorpay Dashboard → Settings → Webhooks**
2. Create webhook:
   - URL: `https://your-domain.vercel.app/api/razorpay-webhook`
   - Event: `payment.captured`
3. Copy webhook secret
4. Add to Vercel environment variables
5. Redeploy: `vercel --prod`

## ✅ Done!

Test payment:
1. Login to your website
2. Go to Dashboard
3. Click "Buy Now"
4. Complete payment
5. Time will be added automatically in 2-5 seconds

---

## Important Notes:

- **Razorpay Key ID**: Get from Razorpay Dashboard → Settings → API Keys
- **Test Mode**: Use test keys for testing
- **Live Mode**: Switch to live keys for production
- **Webhook**: Must be configured for automatic time addition
- **Dashboard**: Already has real-time listener, will auto-update

## Files Created:

✅ `/api/razorpay-webhook.js` - Webhook handler
✅ `vercel.json` - Vercel configuration
✅ `.env.production` - Environment variables template
✅ `PAYMENT_SETUP.md` - Detailed setup guide
✅ `VERCEL_DEPLOYMENT.md` - Complete deployment guide

## Need Help?

Read detailed guides:
- `PAYMENT_SETUP.md` - Payment integration details
- `VERCEL_DEPLOYMENT.md` - Complete deployment guide
