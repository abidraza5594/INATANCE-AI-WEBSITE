# Vercel Deployment Guide - Complete Setup

## 🚀 Quick Deploy Steps

### 1. Install Dependencies
```bash
cd InterviewAI-Website
npm install
```

### 2. Get Razorpay API Keys

1. Login to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to **Settings** → **API Keys**
3. Generate keys (Test mode for testing, Live mode for production)
4. Copy **Key ID** (starts with `rzp_test_` or `rzp_live_`)

### 3. Update Payment Code

Open `src/pages/Dashboard.jsx` and find the `handlePayment` function, replace it with:

```javascript
const handlePayment = () => {
  const options = {
    key: 'rzp_test_YOUR_KEY_ID', // Replace with your Razorpay Key ID
    amount: currentPrice * 100,
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
      email: user.email, // CRITICAL: Webhook needs this
    },
    theme: {
      color: '#3B82F6',
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
```

Do the same in `src/components/Pricing.jsx`

### 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- Project name? **interviewai** (or your choice)
- Directory? **./InterviewAI-Website**
- Override settings? **N**

### 5. Configure Vercel Environment Variables

After deployment, go to [Vercel Dashboard](https://vercel.com/dashboard):

1. Select your project
2. Go to **Settings** → **Environment Variables**
3. Add these variables:

```
FIREBASE_PROJECT_ID = ai-assitence
FIREBASE_CLIENT_EMAIL = firebase-adminsdk-fbsvc@ai-assitence.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY = -----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDSjBJLTH+k1Xlh
hkoOzAlHDj5LBuIp1UX3LH5LcVrn/gDAa1LCIuItM/z0zgoMU+XbtjF/PSnLpUCy
DAqry2H92XAPJr+YJCo3rSNo56hd+hQYpPZni0T9IACovS90lH6ZILDAGYIkTKlL
u5LKL9EO2MVHPqM81BCorZLMiCcXESRegAVQ1fvpUKGQS4iQaudhzqyyunhxJkab
u1g0m6s8l/8aclYNdImUzHSxuKoZiL95Hvxb6QRwEsWbO8fI6HoL0RfXW4uSE0ub
O/kBb5i7tdvyCh7foCgvspoYsfNzKwk1Sd6XLBeFeYQkxC9d67ps7wGR5QeI4naE
uxu1vJwBAgMBAAECggEAEbvajp0S4z9Xye8VrclhvqpkdM1Pn1ZnXjpRKOmTTpcG
WS6w+ckWY9hNJhF0pzUp1yexY5YzPwPcPyLkgzPOPSNjXONWn+nr5GSg5uUcOU4n
Ayxh1LbWSLu5Un0c0iTvxNYMDSIY5BXQ7KAP7Re59BYuB6Iu/aCfBpYYF0IgiMCx
rFFI7oKFTLjhpEgVOhFaC3bA8xXyBFYHksZExgT59p8kAVU38tiELdu+dEZRGwHq
qshnt4kVD/moby/OULudl1jB5NOhlOsSAfu0t3ntGaiKGz1Ffl4h/ZIxMhz4b9Ss
rorFi9J16IGsr8ayFsrG/AKu8PMCMc/o89Q5maT8AQKBgQD4fZHOmllFy+4yHK1C
XIbDXqCIMrW6BIBzujrXLkt81yEBOlB67Tyyil9TVj7ZMyKvHb+iugq94LSFJppY
sRfcAFHdk1z3UXI6QfTAxYp4VmKIzo5df4Gr9HRfnUcRshSsWQ/iokzI0GZUYilK
KGKCoMrNsQoVavGIG+VyPw+6yQKBgQDY6PSmBtZR+dn6V7ZR+bUzviJvuw+jPArt
7Xl5xsnf8gcxy6txYjy1WpGpJdQYEse/oPsPbqGWR3Nhb8vYb6fiLJgHLXozZGbe
SQ9Bu5ZCXObQXcL0xxfKV/z8sauw7b45F/w0yXaZ4rqk7vhN86QIvBxGQrZwx8Sn
AFbk7Lk7eQKBgQDLjWlEWdGpSC1eJXmUM+E85yYPi6Krt4ZVxobuwACcSknCDLfi
irW+93Sw+qRPHgFae78AmO+1rP2TWRT0dFU8JZLqNA3ilnhA2siYpPkSLIlY0gNy
+cEKUByIOnj+OOeQawCFQTgvA+/fTe3Ozpgrs3WN22mMM+eY/GkPFjNXaQKBgQCf
Jt5K631ZjK+JZc4ae9OecYWm4WPp62ZBiRq2ZUs+C8GHod7bRK8yiY+SwnTKbQ0u
55kOi6f4MdjQx0yUM+jEpN+vdIjTKHnp40VUf6UScEPS4tjm7SXhi4nOhzZojSgj
kBu3R5LD+n3kAosh9wCGgC9mxhBC0/DQcAlR0vdeUQKBgQCq6Q61Ko0nCrXFK+Fc
pkxtFHe+t0RuJNlGltokPMhfIJXXGHNueK4VzX1nytXnHW1vh1b+uBx0KlaxUYD1
KLZoQxJSttqaKnuvHn//WwIDWa/oUXkmVsneuxZJFpqCqjgDVKMqOadU3XsuZFEc
uUPqtnPeqOgBCL0iXub//MZzDA==
-----END PRIVATE KEY-----

RAZORPAY_WEBHOOK_SECRET = (Get from next step)
```

**Important**: Paste the entire private key as shown above (multi-line is OK in Vercel)

### 6. Setup Razorpay Webhook

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Navigate to **Settings** → **Webhooks**
3. Click **Create New Webhook**
4. Configure:
   - **Webhook URL**: `https://your-domain.vercel.app/api/razorpay-webhook`
   - **Active Events**: Check `payment.captured`
   - **Secret**: Copy the generated secret
5. Save webhook
6. Add the secret to Vercel environment variables as `RAZORPAY_WEBHOOK_SECRET`

### 7. Redeploy

After adding environment variables:
```bash
vercel --prod
```

Or trigger redeploy from Vercel Dashboard → Deployments → Redeploy

## ✅ Testing

### Test Payment Flow:

1. Open your deployed website
2. Login with Google
3. Go to Dashboard
4. Click "Buy Now"
5. Use Razorpay test card:
   - Card: `4111 1111 1111 1111`
   - CVV: Any 3 digits
   - Expiry: Any future date
6. Complete payment
7. Wait 2-5 seconds
8. Dashboard should show updated time

### Check Logs:

```bash
# View Vercel function logs
vercel logs

# Or check in Vercel Dashboard → Deployments → Functions
```

## 🔧 Troubleshooting

### Payment not adding time:

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for errors in `/api/razorpay-webhook`

2. **Verify Webhook**:
   - Razorpay Dashboard → Webhooks → Check webhook logs
   - Ensure webhook is hitting your Vercel URL

3. **Check Environment Variables**:
   - Vercel Dashboard → Settings → Environment Variables
   - Verify all 4 variables are set correctly
   - Redeploy after adding variables

4. **Test Webhook Manually**:
   - Razorpay Dashboard → Webhooks → Test webhook
   - Check if it returns 200 OK

### Common Errors:

**"Invalid signature"**
- Webhook secret is wrong
- Update `RAZORPAY_WEBHOOK_SECRET` in Vercel

**"No email found"**
- User email not being sent in payment notes
- Update payment code to include `notes: { email: user.email }`

**"Firebase permission denied"**
- Private key is incorrect
- Copy entire private key including BEGIN/END lines
- Ensure no extra spaces or line breaks

## 📱 Production Checklist

Before going live:

- [ ] Switch Razorpay to Live mode (not Test mode)
- [ ] Update Razorpay Key ID in code (from `rzp_test_` to `rzp_live_`)
- [ ] Update webhook URL to production domain
- [ ] Test with real payment (small amount)
- [ ] Verify time is added correctly
- [ ] Check payment history in Dashboard
- [ ] Monitor Vercel logs for any errors

## 🎯 Current Setup

**Pricing Logic:**
- First time users: ₹300 (2 hours)
- Regular users: ₹500 (2 hours)

**Payment Links:**
- First time: `https://rzp.io/rzp/7Q42vVa`
- Regular: `https://rzp.io/rzp/GrVtHchT`

**Note**: These payment links will be replaced by Razorpay Checkout integration for better user tracking.

## 📞 Support

If you face issues:
1. Check Vercel function logs
2. Check Razorpay webhook logs
3. Verify all environment variables
4. Test in Razorpay test mode first
5. Check Firebase Firestore rules allow writes

## 🔐 Security Notes

- Never commit `.env` files to Git
- Keep Razorpay keys and webhook secret secure
- Use environment variables for all sensitive data
- Enable Razorpay webhook signature verification (already implemented)
- Firebase Admin SDK runs on server (secure)
