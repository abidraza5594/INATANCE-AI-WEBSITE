# User Experience Guide - API Key System

## 🎯 What Users Will See

### Pricing Page

#### Basic Plan Card (₹300)
```
┌─────────────────────────────────┐
│ BASIC PLAN                      │
│ ₹300 /interview                 │
│ ⚡ Use your own API keys        │
│                                 │
│ ✓ All AI Features               │
│ ✓ Voice Transcription           │
│ ✓ Screenshot Analysis           │
│ ✓ Resume Support                │
│ ✓ Your Mistral API Key          │ ← Yellow highlight
│ ✓ Your Gemini API Key           │ ← Yellow highlight
│                                 │
│ [Get Started (₹300)]            │
└─────────────────────────────────┘
```

#### Premium Plan Card (₹500)
```
┌─────────────────────────────────┐
│ PREMIUM PLAN      [Popular]     │
│ ₹500 /interview                 │
│ 🚀 No API keys needed           │
│                                 │
│ ✓ All AI Features               │
│ ✓ Voice Transcription           │
│ ✓ Screenshot Analysis           │
│ ✓ Resume Support                │
│ ✓ Pre-configured API Keys       │ ← Green highlight
│ ✓ Priority Support              │ ← Green highlight
│                                 │
│ [Upgrade Now (₹500)]            │
└─────────────────────────────────┘
```

---

## 📱 Dashboard Experience

### For Basic Plan Users

When user logs into dashboard after purchasing Basic plan:

```
╔═══════════════════════════════════════════════════════════════╗
║  🔑 API Key Configuration                                     ║
║  Basic Plan - Your API Keys Required                          ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ⚠️ Important: You're on the Basic Plan. Please provide      ║
║     your own Mistral and Gemini API keys to use the          ║
║     desktop application.                                      ║
║                                                               ║
║  ┌─────────────────────────┐  ┌─────────────────────────┐   ║
║  │ Mistral API Key *       │  │ Gemini API Key *        │   ║
║  │ [••••••••••••••••] 👁   │  │ [••••••••••••••••] 👁   │   ║
║  │ Get from Mistral Console│  │ Get from Google AI Studio│  ║
║  └─────────────────────────┘  └─────────────────────────┘   ║
║                                                               ║
║  ⚠️ API keys not configured - app won't work                 ║
║                                          [Save API Keys]      ║
╚═══════════════════════════════════════════════════════════════╝
```

After saving keys:

```
╔═══════════════════════════════════════════════════════════════╗
║  🔑 API Key Configuration                                     ║
║  Basic Plan - Your API Keys Required                          ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ⚠️ Important: You're on the Basic Plan. Please provide      ║
║     your own Mistral and Gemini API keys to use the          ║
║     desktop application.                                      ║
║                                                               ║
║  ┌─────────────────────────┐  ┌─────────────────────────┐   ║
║  │ Mistral API Key *       │  │ Gemini API Key *        │   ║
║  │ [sk-abc123...xyz] 👁    │  │ [AIza...789] 👁         │   ║
║  │ Get from Mistral Console│  │ Get from Google AI Studio│  ║
║  └─────────────────────────┘  └─────────────────────────┘   ║
║                                                               ║
║  ✓ API keys configured                  [Save API Keys]      ║
╚═══════════════════════════════════════════════════════════════╝
```

### For Premium Plan Users

When user logs into dashboard after purchasing Premium plan:

```
╔═══════════════════════════════════════════════════════════════╗
║  ✓ Premium Plan Active                          [All Set ✓]  ║
║  Pre-configured API keys - No setup needed!                   ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## 🖥️ Desktop App Experience

### Basic Plan User - First Launch (No Keys)

```
╔════════════════════════════════════════════╗
║   ⚠️  API Keys Required                    ║
╠════════════════════════════════════════════╣
║                                            ║
║  You're on the Basic Plan.                ║
║                                            ║
║  Please configure your API keys in the     ║
║  dashboard to use the application:         ║
║                                            ║
║  • Mistral API Key (Required)              ║
║  • Gemini API Key (Required)               ║
║                                            ║
║  Without API keys, the application         ║
║  cannot function.                          ║
║                                            ║
║  [Open Dashboard]  [Exit]                  ║
║                                            ║
╚════════════════════════════════════════════╝
```

### Basic Plan User - With Keys Configured

```
╔════════════════════════════════════════════╗
║   Interview.AI                             ║
╠════════════════════════════════════════════╣
║                                            ║
║  ✓ API Keys Loaded                         ║
║  ✓ Mistral AI Connected                    ║
║  ✓ Gemini AI Connected                     ║
║                                            ║
║  Remaining Time: 1h 45m                    ║
║                                            ║
║  [Start Interview]                         ║
║                                            ║
╚════════════════════════════════════════════╝
```

### Premium Plan User - First Launch

```
╔════════════════════════════════════════════╗
║   Interview.AI                             ║
╠════════════════════════════════════════════╣
║                                            ║
║  ✓ Premium Plan Active                     ║
║  ✓ Pre-configured API Keys                 ║
║  ✓ All Systems Ready                       ║
║                                            ║
║  Remaining Time: 2h 0m                     ║
║                                            ║
║  [Start Interview]                         ║
║                                            ║
╚════════════════════════════════════════════╝
```

---

## 🔄 User Journey Examples

### Journey 1: Basic Plan User

1. **Purchase**: User buys ₹300 Basic plan
2. **Dashboard**: Sees API key configuration section (yellow/orange)
3. **Action Required**: Must add Mistral + Gemini keys
4. **Get Keys**: 
   - Clicks "Mistral Console" link → Gets Mistral key
   - Clicks "Google AI Studio" link → Gets Gemini key
5. **Save**: Enters both keys, clicks "Save API Keys"
6. **Confirmation**: ✓ "API keys configured" message
7. **Desktop App**: Downloads and launches app
8. **App Loads**: Keys fetched from Firebase, app works!

### Journey 2: Premium Plan User

1. **Purchase**: User buys ₹500 Premium plan
2. **Dashboard**: Sees "Premium Plan Active" badge (green)
3. **No Action Needed**: No API key section shown
4. **Desktop App**: Downloads and launches app
5. **App Loads**: Pre-configured keys used, app works immediately!

### Journey 3: Basic → Premium Upgrade

1. **Current**: User on Basic plan with own keys
2. **Upgrade**: Purchases Premium plan
3. **Dashboard**: API key section disappears, Premium badge appears
4. **Desktop App**: Next launch uses pre-configured keys
5. **User Keys**: Still stored but not used (can keep as backup)

---

## 💡 Key Differences Summary

| Feature | Basic Plan (₹300) | Premium Plan (₹500) |
|---------|-------------------|---------------------|
| **Price** | ₹300/interview | ₹500/interview |
| **All Features** | ✓ Yes | ✓ Yes |
| **API Keys** | User provides | Pre-configured |
| **Setup Time** | 5-10 minutes | Instant |
| **Dashboard UI** | API key inputs | Premium badge |
| **App Launch** | Validates user keys | Uses premium keys |
| **Maintenance** | User manages keys | Zero maintenance |
| **Support** | Standard | Priority |

---

## 🎓 User Education

### For Basic Plan Users

**What you need to know:**
- You'll need to create free accounts on Mistral and Google AI
- Both platforms offer free API credits to start
- Keys are stored securely in Firebase
- You can update keys anytime from dashboard
- Desktop app won't work without keys

**Getting API Keys:**
1. **Mistral**: Visit console.mistral.ai → Sign up → API Keys → Create
2. **Gemini**: Visit makersuite.google.com → Get API Key → Create

**Cost of API Keys:**
- Mistral: Free tier available, pay-as-you-go after
- Gemini: Free tier available, pay-as-you-go after
- Typical usage: 1-2 interviews = minimal cost

### For Premium Plan Users

**What you need to know:**
- No setup required
- API keys pre-configured
- Just download and use
- Priority support included
- Zero maintenance

---

## 🆘 Common Issues & Solutions

### Issue 1: "API keys not configured"
**Solution**: Go to dashboard → Enter both Mistral and Gemini keys → Save

### Issue 2: "Invalid API key"
**Solution**: Check keys are copied correctly (no extra spaces)

### Issue 3: "Desktop app won't start"
**Solution**: Ensure you've saved keys in dashboard first

### Issue 4: "Want to switch from Basic to Premium"
**Solution**: Purchase Premium plan, keys auto-switch

### Issue 5: "Lost my API keys"
**Solution**: Generate new keys from Mistral/Gemini consoles, update in dashboard
