# 🔍 DEBUG: Payment Captured But Time Not Added

## ✅ GOOD NEWS:
Payment status = **"Captured"** ✅

## ❌ PROBLEM:
Time not added to account

## 🎯 ROOT CAUSE:
Webhook trigger nahi ho raha ya webhook mein error hai

---

## 🔍 CHECK 1: Razorpay Webhook Logs

### Steps:
1. Go to: https://dashboard.razorpay.com/app/webhooks
2. Click on your webhook
3. Go to **"Event Logs"** tab
4. Find latest payment (2:24pm or 2:11pm)
5. Check:
   - ✅ Event sent? (should see `payment.captured`)
   - ✅ Response code? (should be 200)
   - ❌ Error? (check error message)

### What to Look For:

**If NO event logged:**
- Webhook not configured properly
- URL wrong
- Webhook disabled

**If event logged with error:**
- Check response code (should be 200)
- Check error message
- Check response body

---

## 🔍 CHECK 2: Vercel Function Logs

### Steps:
1. Go to: https://vercel.com/dashboard
2. Click your project: `inatance-ai-website`
3. Go to **"Deployments"** tab
4. Click latest deployment
5. Click **"Functions"** tab
6. Find: `/api/razorpay-webhook`
7. Check logs for errors

### What to Look For:

**If NO logs:**
- Webhook not reaching Vercel
- URL wrong in Razorpay

**If logs show error:**
- Check error message
- Common errors:
  - Invalid signature
  - User not found
  - Firebase error

---

## 🔍 CHECK 3: Webhook URL

### Verify Webhook URL in Razorpay:

1. Go to: https://dashboard.razorpay.com/app/webhooks
2. Check URL is EXACTLY:
   ```
   https://inatance-ai-website.vercel.app/api/razorpay-webhook
   ```
3. Check "Active Events" includes:
   - ✅ `payment.captured`
   - ✅ `payment.authorized`

---

## 🔍 CHECK 4: Environment Variables

### Verify in Vercel:

1. Go to: Settings → Environment Variables
2. Check these exist:
   - ✅ `FIREBASE_PROJECT_ID`
   - ✅ `FIREBASE_CLIENT_EMAIL`
   - ✅ `FIREBASE_PRIVATE_KEY`
   - ✅ `RAZORPAY_WEBHOOK_SECRET`

---

## ✅ QUICK FIX: Manual Test Webhook

### Test if webhook is working:

1. Go to Razorpay Dashboard
2. Find your payment (2:24pm)
3. Click on it
4. Look for **"Send Test Webhook"** or **"Resend Webhook"** button
5. Click it
6. Check if time gets added

---

## 🚨 MOST LIKELY ISSUE:

### Webhook Secret Mismatch

**Problem:** Razorpay webhook secret aur Vercel environment variable match nahi kar rahe

**Solution:**

1. **Get webhook secret from Razorpay:**
   - Go to: https://dashboard.razorpay.com/app/webhooks
   - Click your webhook
   - Copy the **"Secret"** (starts with `whsec_`)

2. **Update in Vercel:**
   - Go to: Settings → Environment Variables
   - Find: `RAZORPAY_WEBHOOK_SECRET`
   - Update value with copied secret
   - Save

3. **Redeploy:**
   - Go to Deployments
   - Click "Redeploy"

---

## 🔧 ALTERNATIVE: Test Locally

### Run webhook locally to see error:

1. Open terminal in `InterviewAI-Website` folder

2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

3. Run locally:
   ```bash
   vercel dev
   ```

4. Use ngrok to expose:
   ```bash
   ngrok http 3000
   ```

5. Update webhook URL in Razorpay to ngrok URL

6. Make test payment

7. Check terminal for errors

---

## 📊 DEBUGGING CHECKLIST:

- [ ] Razorpay webhook logs checked
- [ ] Vercel function logs checked
- [ ] Webhook URL verified
- [ ] Environment variables verified
- [ ] Webhook secret matches
- [ ] Test webhook sent
- [ ] Payment email matches Firebase user email

---

## 🎯 IMMEDIATE ACTION:

### Do This NOW:

1. **Check Razorpay Webhook Logs**
   - https://dashboard.razorpay.com/app/webhooks
   - Event Logs tab
   - Find latest payment
   - Screenshot the error if any

2. **Check Vercel Function Logs**
   - https://vercel.com/dashboard
   - Latest deployment → Functions
   - Check `/api/razorpay-webhook` logs
   - Screenshot the error if any

3. **Send me screenshots** so I can see exact error

---

## 💡 COMMON ISSUES & FIXES:

### Issue 1: Invalid Signature
**Fix:** Update `RAZORPAY_WEBHOOK_SECRET` in Vercel

### Issue 2: User Not Found
**Fix:** Check if email in payment matches Firebase user email
- Payment email: `abidraza8104@gmail.com`
- Firebase user: Should have document ID: `abidraza8104_at_gmail_com`

### Issue 3: Firebase Permission Denied
**Fix:** Check Firebase rules allow writes to users collection

### Issue 4: Webhook Not Triggered
**Fix:** 
- Verify webhook URL
- Check webhook is "Active" in Razorpay
- Check "Active Events" includes `payment.captured`

---

## 🚀 QUICK TEST:

### Test if webhook endpoint is working:

1. Open browser
2. Go to: https://inatance-ai-website.vercel.app/api/razorpay-webhook
3. You should see: `{"error":"Method not allowed"}`
4. This means endpoint is working (it only accepts POST)

---

## 📞 NEXT STEPS:

1. Check Razorpay webhook logs
2. Check Vercel function logs
3. Share screenshots of any errors
4. I'll help fix the exact issue

**Abhi Razorpay webhook logs check karo aur batao kya dikha!**
