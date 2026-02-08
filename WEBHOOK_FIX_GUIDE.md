# 🔧 WEBHOOK NOT WORKING - COMPLETE FIX GUIDE

## ❌ PROBLEM
- Payment captured successfully ✅
- Time NOT added automatically ❌
- Manual test endpoint works ✅
- Webhook not being triggered ❌

## 🎯 ROOT CAUSE
**Webhook secret is NOT configured in Vercel environment variables!**

The `.env.production` file is only for local reference. Vercel needs environment variables set in its dashboard.

---

## ✅ SOLUTION - STEP BY STEP

### STEP 1: Check Razorpay Webhook Secret

1. Go to: https://dashboard.razorpay.com/app/webhooks
2. Find your webhook: `https://inatance-ai.vercel.app/api/razorpay-webhook`
3. Click on it
4. Look for **"Webhook Secret"** section
5. Click **"Change Secret"** or **"View Secret"**
6. **COPY THE SECRET** (it looks like: `4GTCpzsY_jkK6H_`)

---

### STEP 2: Add Environment Variables to Vercel

1. Go to: https://vercel.com/dashboard
2. Select your project: **inatance-ai**
3. Click **"Settings"** tab
4. Click **"Environment Variables"** in left sidebar
5. Add these variables (if not already added):

#### Required Variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `FIREBASE_PROJECT_ID` | `ai-assitence` | Production, Preview, Development |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-fbsvc@ai-assitence.iam.gserviceaccount.com` | Production, Preview, Development |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDSjBJLTH+k1Xlh\nhkoOzAlHDj5LBuIp1UX3LH5LcVrn/gDAa1LCIuItM/z0zgoMU+XbtjF/PSnLpUCy\nDAqry2H92XAPJr+YJCo3rSNo56hd+hQYpPZni0T9IACovS90lH6ZILDAGYIkTKlL\nu5LKL9EO2MVHPqM81BCorZLMiCcXESRegAVQ1fvpUKGQS4iQaudhzqyyunhxJkab\nu1g0m6s8l/8aclYNdImUzHSxuKoZiL95Hvxb6QRwEsWbO8fI6HoL0RfXW4uSE0ub\nO/kBb5i7tdvyCh7foCgvspoYsfNzKwk1Sd6XLBeFeYQkxC9d67ps7wGR5QeI4naE\nuxu1vJwBAgMBAAECggEAEbvajp0S4z9Xye8VrclhvqpkdM1Pn1ZnXjpRKOmTTpcG\nWS6w+ckWY9hNJhF0pzUp1yexY5YzPwPcPyLkgzPOPSNjXONWn+nr5GSg5uUcOU4n\nAyxh1LbWSLu5Un0c0iTvxNYMDSIY5BXQ7KAP7Re59BYuB6Iu/aCfBpYYF0IgiMCx\nrFFI7oKFTLjhpEgVOhFaC3bA8xXyBFYHksZExgT59p8kAVU38tiELdu+dEZRGwHq\nqshnt4kVD/moby/OULudl1jB5NOhlOsSAfu0t3ntGaiKGz1Ffl4h/ZIxMhz4b9Ss\nrorFi9J16IGsr8ayFsrG/AKu8PMCMc/o89Q5maT8AQKBgQD4fZHOmllFy+4yHK1C\nXIbDXqCIMrW6BIBzujrXLkt81yEBOlB67Tyyil9TVj7ZMyKvHb+iugq94LSFJppY\nsRfcAFHdk1z3UXI6QfTAxYp4VmKIzo5df4Gr9HRfnUcRshSsWQ/iokzI0GZUYilK\nKGKCoMrNsQoVavGIG+VyPw+6yQKBgQDY6PSmBtZR+dn6V7ZR+bUzviJvuw+jPArt\n7Xl5xsnf8gcxy6txYjy1WpGpJdQYEse/oPsPbqGWR3Nhb8vYb6fiLJgHLXozZGbe\nSQ9Bu5ZCXObQXcL0xxfKV/z8sauw7b45F/w0yXaZ4rqk7vhN86QIvBxGQrZwx8Sn\nAFbk7Lk7eQKBgQDLjWlEWdGpSC1eJXmUM+E85yYPi6Krt4ZVxobuwACcSknCDLfi\nirW+93Sw+qRPHgFae78AmO+1rP2TWRT0dFU8JZLqNA3ilnhA2siYpPkSLIlY0gNy\n+cEKUByIOnj+OOeQawCFQTgvA+/fTe3Ozpgrs3WN22mMM+eY/GkPFjNXaQKBgQCf\nJt5K631ZjK+JZc4ae9OecYWm4WPp62ZBiRq2ZUs+C8GHod7bRK8yiY+SwnTKbQ0u\n55kOi6f4MdjQx0yUM+jEpN+vdIjTKHnp40VUf6UScEPS4tjm7SXhi4nOhzZojSgj\nkBu3R5LD+n3kAosh9wCGgC9mxhBC0/DQcAlR0vdeUQKBgQCq6Q61Ko0nCrXFK+Fc\npkxtFHe+t0RuJNlGltokPMhfIJXXGHNueK4VzX1nytXnHW1vh1b+uBx0KlaxUYD1\nKLZoQxJSttqaKnuvHn//WwIDWa/oUXkmVsneuxZJFpqCqjgDVKMqOadU3XsuZFEc\nuUPqtnPeqOgBCL0iXub//MZzDA==\n-----END PRIVATE KEY-----\n` | Production, Preview, Development |
| `RAZORPAY_KEY_SECRET` | `0Rajmnf2pV1PEEvsdvbiI7SU` | Production, Preview, Development |
| **`RAZORPAY_WEBHOOK_SECRET`** | **`4GTCpzsY_jkK6H_`** (or your actual secret from Step 1) | **Production, Preview, Development** |

**IMPORTANT**: 
- Make sure to select **ALL THREE** environments (Production, Preview, Development) for each variable
- The webhook secret is the most critical one!

---

### STEP 3: Redeploy Your Application

After adding environment variables, you MUST redeploy:

**Option A: Automatic Redeploy (Recommended)**
1. Go to **"Deployments"** tab in Vercel
2. Find the latest deployment
3. Click the **"..."** menu
4. Click **"Redeploy"**
5. Wait for deployment to complete

**Option B: Git Push**
```bash
cd InterviewAI-Website
git add .
git commit -m "Trigger redeploy for webhook fix"
git push
```

---

### STEP 4: Test the Webhook

1. **Open your dashboard**: https://inatance-ai.vercel.app/dashboard
2. **Note your current time** (e.g., 25 minutes)
3. **Make a ₹1 test payment**
4. **Wait 2-5 seconds** (DO NOT REFRESH)
5. **Time should update automatically** to 55 minutes (25 + 30)

---

### STEP 5: Check Webhook Logs (If Still Not Working)

1. Go to Razorpay Dashboard: https://dashboard.razorpay.com/app/webhooks
2. Click on your webhook
3. Scroll down to **"Event Logs"** section
4. Look for recent payment events
5. Check the **"Response"** column:
   - ✅ **200 OK** = Webhook working!
   - ❌ **400/500 Error** = Check error message
   - ⚠️ **No logs** = Webhook not being triggered

---

### STEP 6: Check Vercel Function Logs

1. Go to Vercel Dashboard
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. Click **"Functions"** tab
5. Find `/api/razorpay-webhook`
6. Check logs for errors

---

## 🔍 DEBUGGING CHECKLIST

If webhook still not working, check:

- [ ] Webhook URL is correct: `https://inatance-ai.vercel.app/api/razorpay-webhook`
- [ ] Webhook is **Active** in Razorpay
- [ ] Event `payment.captured` is **enabled**
- [ ] Webhook secret is **set in Vercel** (not just .env file)
- [ ] All environment variables are set for **Production** environment
- [ ] Application has been **redeployed** after adding variables
- [ ] Payment is actually **captured** (not just authorized)

---

## 🎯 EXPECTED BEHAVIOR AFTER FIX

1. User makes payment → Razorpay captures payment
2. Razorpay sends webhook to your server
3. Server verifies signature using webhook secret
4. Server adds time to Firebase
5. Dashboard updates automatically (real-time listener)
6. User sees new time within 2-5 seconds

---

## 📞 STILL NOT WORKING?

If webhook still fails after following all steps:

1. **Check Razorpay webhook secret** - Make sure it matches exactly
2. **Regenerate webhook secret** in Razorpay and update Vercel
3. **Check Vercel function logs** for specific error messages
4. **Test with curl** to verify endpoint is accessible:

```bash
curl -X POST https://inatance-ai.vercel.app/api/razorpay-webhook
```

Expected response: `{"error":"Method not allowed"}` or signature error (this is good - means endpoint is working)

---

## ✅ SUCCESS INDICATORS

You'll know it's working when:
- ✅ Payment captured in Razorpay
- ✅ Webhook shows 200 OK in Razorpay logs
- ✅ Time updates automatically on dashboard (no refresh needed)
- ✅ Payment history shows new entry
- ✅ Desktop app syncs new time within 5 seconds
