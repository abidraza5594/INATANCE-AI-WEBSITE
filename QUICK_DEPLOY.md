# ⚡ QUICK DEPLOY - 3 Steps Only

## 🔧 WHAT WAS FIXED

**Problem:** Payment completing but time not added (status showing "Authorized" instead of "Captured")

**Solution:** Added `payment_capture: 1` to Razorpay options in Dashboard.jsx

---

## 🚀 DEPLOY IN 3 STEPS

### 1️⃣ Push to GitHub
```bash
cd InterviewAI-Website
git add .
git commit -m "Fixed payment auto-capture"
git push origin main
```

### 2️⃣ Redeploy on Vercel
- Go to: https://vercel.com/dashboard
- Click your project: `inatance-ai-website`
- Click **"Redeploy"** button
- Wait 1-2 minutes

### 3️⃣ Test Payment
- Login: https://inatance-ai-website.vercel.app
- Click **"Test Payment - ₹1"** button
- Complete payment
- Wait 3 seconds (page auto-refreshes)
- Check if time increased by 30 minutes ✅

---

## ✅ WHAT HAPPENS NOW

1. User clicks payment button
2. Razorpay opens with payment options
3. User completes payment
4. Payment **auto-captures** immediately (no manual capture needed)
5. Webhook triggers within 2-5 seconds
6. Time added to user account
7. Page auto-refreshes
8. User sees updated time

---

## 🎯 PAYMENT AMOUNTS

| Amount | Time Added | Purpose |
|--------|-----------|---------|
| ₹1 | 30 minutes | Testing |
| ₹300 | 2 hours | First Time Special |
| ₹500 | 2 hours | Regular Price |

---

## 📋 ENVIRONMENT VARIABLES (Already Set)

**Vercel Environment Variables:**
- ✅ `VITE_RAZORPAY_KEY_ID` = `rzp_live_SDa0tRbVfVpnhQ`
- ✅ `RAZORPAY_WEBHOOK_SECRET` = `4GTCpzsY_jkK6H_`
- ✅ All Firebase variables configured

**Razorpay Dashboard:**
- ✅ Webhook URL: `https://inatance-ai-website.vercel.app/api/razorpay-webhook`
- ✅ Webhook Secret: `4GTCpzsY_jkK6H_`
- ✅ Live Mode: Enabled

---

## 🔍 VERIFY SUCCESS

After test payment, check:
- [ ] Payment status = "Captured" (in Razorpay Dashboard)
- [ ] Time increased by 30 minutes (in website Dashboard)
- [ ] Payment appears in history
- [ ] Webhook event logged (in Razorpay webhook logs)

---

## 🎉 DONE!

Your payment system is now working with auto-capture enabled. Just deploy and test!

**Need detailed info?** See `DEPLOY_NOW.md`
