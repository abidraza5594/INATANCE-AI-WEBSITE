# 🔧 WEBHOOK SECRET MISMATCH - FIX KARO

## ❌ PROBLEM
Webhook endpoint working hai ✅ but signature verification fail ho raha hai ❌

**Reason**: Vercel mein jo secret hai aur Razorpay mein jo secret hai - **DONO MATCH NAHI KAR RAHE!**

---

## ✅ SOLUTION - 2 STEPS

### STEP 1: Razorpay Mein Secret Regenerate Karo

1. Jao: https://dashboard.razorpay.com/app/webhooks
2. Apna webhook dhundo: `https://inatance-ai.vercel.app/api/razorpay-webhook`
3. Click karo webhook pe
4. **"Change Secret"** button pe click karo
5. **"Generate New Secret"** pe click karo
6. **COPY KARO** new secret (dikhega kuch aisa: `whsec_abc123xyz...`)

---

### STEP 2: Vercel Mein Update Karo

1. Jao: https://vercel.com/dashboard
2. Project select karo: **inatance-ai**
3. **Settings** → **Environment Variables**
4. Dhundo: `RAZORPAY_WEBHOOK_SECRET`
5. Click karo **"..."** (3 dots) → **"Edit"**
6. **PASTE KARO** new secret jo tumne copy kiya
7. Make sure **ALL 3 environments** selected hain:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
8. Click **"Save"**

---

### STEP 3: Redeploy Karo

1. **Deployments** tab pe jao
2. Latest deployment pe **"..."** click karo
3. **"Redeploy"** pe click karo
4. Wait karo 1-2 minutes

---

## 🧪 TEST KARO

1. Dashboard kholo: https://inatance-ai.vercel.app/dashboard
2. Current time note karo (e.g., 25 min)
3. ₹1 ka payment karo
4. **2-5 seconds wait karo** (refresh mat karo!)
5. Time automatically 55 min ho jana chahiye

---

## 🔍 VERIFY KARO

### Razorpay Webhook Logs Check Karo:

1. Jao: https://dashboard.razorpay.com/app/webhooks
2. Apna webhook pe click karo
3. Neeche scroll karo **"Event Logs"** tak
4. Latest payment event dhundo
5. Response check karo:
   - ✅ **200 OK** = Working perfectly!
   - ❌ **400 Bad Request** = Secret still wrong
   - ⚠️ **No logs** = Webhook not triggered

---

## ✅ SUCCESS INDICATORS

Sab theek hai agar:
- ✅ Payment captured
- ✅ Razorpay logs mein 200 OK dikhe
- ✅ Time automatically add ho jaye (no refresh)
- ✅ Desktop app mein bhi sync ho jaye

---

## 🆘 AGAR PHIR BHI NAHI CHALA

1. **Secret ko copy-paste karte waqt** extra space mat aane do
2. **Redeploy zaroor karo** - bina redeploy ke kaam nahi karega
3. **Razorpay webhook Active hai** - check karo
4. **Event `payment.captured` enabled hai** - check karo

---

## 📞 DEBUGGING

Agar abhi bhi problem hai, check karo:

```bash
# Test webhook endpoint
curl -X POST https://inatance-ai.vercel.app/api/razorpay-webhook

# Expected: {"error":"Invalid signature"} ✅ (endpoint working)
# Bad: Connection refused ❌ (endpoint not working)
```

---

## ⚡ QUICK CHECKLIST

- [ ] Razorpay mein new secret generate kiya
- [ ] Secret copy kiya (no extra spaces)
- [ ] Vercel mein `RAZORPAY_WEBHOOK_SECRET` update kiya
- [ ] All 3 environments selected (Production, Preview, Development)
- [ ] Saved kiya
- [ ] Redeploy kiya
- [ ] 1-2 minutes wait kiya deployment ke liye
- [ ] Test payment kiya

---

## 🎯 EXPECTED FLOW

```
Payment → Razorpay captures → Webhook triggered → 
Signature verified ✅ → Time added to Firebase → 
Dashboard updates automatically → Desktop app syncs
```

**Total time: 2-5 seconds** (no refresh needed!)
