# ⚡ QUICK FIX - DO THIS NOW

## 🎯 MAIN PROBLEM
**Webhook secret is NOT in Vercel environment variables!**

Payment works, but time doesn't add because webhook can't verify the signature.

---

## ✅ 3-STEP FIX (5 MINUTES)

### STEP 1: Get Webhook Secret from Razorpay

1. Go to: https://dashboard.razorpay.com/app/webhooks
2. Click on your webhook: `https://inatance-ai.vercel.app/api/razorpay-webhook`
3. Find **"Webhook Secret"** section
4. Click **"View Secret"** or **"Change Secret"**
5. **COPY the secret** (looks like: `4GTCpzsY_jkK6H_`)

---

### STEP 2: Add to Vercel Environment Variables

1. Go to: https://vercel.com/dashboard
2. Select project: **inatance-ai**
3. Click **"Settings"** → **"Environment Variables"**
4. Click **"Add New"**
5. Add this variable:

```
Name: RAZORPAY_WEBHOOK_SECRET
Value: [paste the secret you copied]
Environments: ✅ Production ✅ Preview ✅ Development
```

6. Click **"Save"**

**ALSO CHECK** these variables exist (add if missing):

```
FIREBASE_PROJECT_ID = ai-assitence
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-fbsvc@ai-assitence.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY = [your private key from .env.production]
RAZORPAY_KEY_SECRET = 0Rajmnf2pV1PEEvsdvbiI7SU
```

---

### STEP 3: Redeploy

1. Go to **"Deployments"** tab
2. Click **"..."** on latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to finish (1-2 minutes)

---

## 🧪 TEST IT

1. Open dashboard: https://inatance-ai.vercel.app/dashboard
2. Note current time (e.g., 25 minutes)
3. Make ₹1 payment
4. **Wait 2-5 seconds** (don't refresh)
5. Time should update to 55 minutes automatically

---

## 🔍 IF STILL NOT WORKING

### Check Razorpay Webhook Logs:
1. Go to: https://dashboard.razorpay.com/app/webhooks
2. Click on your webhook
3. Scroll to **"Event Logs"**
4. Look for recent payment
5. Check response:
   - ✅ **200 OK** = Working!
   - ❌ **400/500** = Check error message
   - ⚠️ **No logs** = Webhook not triggered

### Check Vercel Function Logs:
1. Vercel Dashboard → **Deployments**
2. Click latest deployment
3. Click **"Functions"** tab
4. Find `/api/razorpay-webhook`
5. Check for errors

---

## 📋 CHECKLIST

Before testing, verify:

- [ ] Webhook secret copied from Razorpay
- [ ] `RAZORPAY_WEBHOOK_SECRET` added to Vercel
- [ ] All 3 environments selected (Production, Preview, Development)
- [ ] Application redeployed
- [ ] Webhook is **Active** in Razorpay
- [ ] Event `payment.captured` is enabled

---

## ✅ SUCCESS = AUTOMATIC TIME UPDATE

After fix:
- Payment captured → Webhook called → Time added → Dashboard updates
- **No manual refresh needed!**
- Desktop app syncs within 5 seconds

---

## 🆘 EMERGENCY WORKAROUND

If webhook still fails, use manual test endpoint:

```
https://inatance-ai.vercel.app/api/test-add-time
```

Open this URL in browser after payment to manually add 30 minutes.

**But fix the webhook properly - this is just temporary!**
