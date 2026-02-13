# Desktop App API Key Integration Guide

## Overview
The website now supports two subscription plans with different API key requirements:
- **Basic Plan (₹300)**: User must provide their own Mistral + Gemini API keys
- **Premium Plan (₹500)**: Pre-configured API keys (no user input needed)

## Firebase User Schema

Each user document in Firestore now includes:

```javascript
{
  email: string,
  displayName: string,
  subscription_plan: 'basic' | 'premium',  // NEW FIELD
  api_keys: {                               // NEW FIELD
    mistral: string,
    gemini: string,
    updated_at: string (ISO date)
  },
  remaining_seconds: number,
  total_purchased: number,
  payment_history: [...],
  // ... other fields
}
```

## Desktop App Implementation Requirements

### 1. On App Launch - Check User Plan

```python
import firebase_admin
from firebase_admin import firestore

def get_user_subscription_data(user_email):
    """Fetch user's subscription plan and API keys from Firebase"""
    db = firestore.client()
    doc_id = user_email.replace('@', '_at_').replace('.', '_')
    
    user_doc = db.collection('users').document(doc_id).get()
    
    if user_doc.exists:
        data = user_doc.to_dict()
        return {
            'subscription_plan': data.get('subscription_plan', 'basic'),
            'api_keys': data.get('api_keys', {'mistral': '', 'gemini': ''}),
            'remaining_seconds': data.get('remaining_seconds', 0)
        }
    return None
```

### 2. API Key Validation Logic

```python
def validate_and_get_api_keys(user_email):
    """
    Validate user's subscription and return appropriate API keys
    Returns: (mistral_key, gemini_key, error_message)
    """
    user_data = get_user_subscription_data(user_email)
    
    if not user_data:
        return None, None, "User not found in database"
    
    plan = user_data['subscription_plan']
    
    if plan == 'premium':
        # Use pre-configured keys (stored in app config or env)
        mistral_key = os.getenv('PREMIUM_MISTRAL_KEY')
        gemini_key = os.getenv('PREMIUM_GEMINI_KEY')
        return mistral_key, gemini_key, None
    
    elif plan == 'basic':
        # User must provide their own keys
        user_mistral = user_data['api_keys'].get('mistral', '')
        user_gemini = user_data['api_keys'].get('gemini', '')
        
        if not user_mistral or not user_gemini:
            return None, None, "API keys not configured. Please add your API keys in the dashboard."
        
        return user_mistral, user_gemini, None
    
    return None, None, "Invalid subscription plan"
```

### 3. App Startup Flow

```python
def initialize_app(user_email):
    """Initialize app with proper API keys based on user plan"""
    
    # Step 1: Fetch user data
    mistral_key, gemini_key, error = validate_and_get_api_keys(user_email)
    
    # Step 2: Handle errors
    if error:
        show_error_dialog(
            title="API Keys Required",
            message=error,
            action_button="Open Dashboard",
            action_url="https://yourwebsite.com/dashboard"
        )
        return False
    
    # Step 3: Initialize AI services
    initialize_mistral_client(mistral_key)
    initialize_gemini_client(gemini_key)
    
    return True
```

### 4. Error Dialog for Basic Plan Users

When Basic plan users haven't configured their API keys, show:

```
╔════════════════════════════════════════════╗
║   API Keys Required                        ║
╠════════════════════════════════════════════╣
║                                            ║
║  You're on the Basic Plan.                ║
║                                            ║
║  Please configure your API keys in the     ║
║  dashboard to use the application:         ║
║                                            ║
║  • Mistral API Key                         ║
║  • Gemini API Key                          ║
║                                            ║
║  [Open Dashboard]  [Exit]                  ║
║                                            ║
╚════════════════════════════════════════════╝
```

### 5. Premium Plan Badge (Optional UI)

For Premium users, you can show a badge in the app:

```
┌─────────────────────────────┐
│ ✓ Premium Plan Active       │
│   Pre-configured API keys   │
└─────────────────────────────┘
```

## Website API Endpoints

The website provides these utilities for API key management:

### Save API Keys
```javascript
import { saveUserAPIKeys } from './utils/apiKeyManager';

await saveUserAPIKeys(userEmail, mistralKey, geminiKey);
```

### Get API Keys
```javascript
import { getUserAPIKeys } from './utils/apiKeyManager';

const result = await getUserAPIKeys(userEmail);
// Returns: { success, api_keys: { mistral, gemini }, subscription_plan }
```

### Update Subscription Plan
```javascript
import { updateSubscriptionPlan } from './utils/apiKeyManager';

await updateSubscriptionPlan(userEmail, 'premium'); // or 'basic'
```

## Security Considerations

1. **Never log API keys** - Don't print them in console or logs
2. **Encrypt in transit** - Always use HTTPS for Firebase communication
3. **Validate on server** - Desktop app should validate keys before storing
4. **Premium keys protection** - Store premium keys in environment variables, not hardcoded
5. **Key rotation** - Allow users to update their keys anytime from dashboard

## Testing Checklist

- [ ] Basic plan user without keys → Shows error dialog
- [ ] Basic plan user with keys → App works normally
- [ ] Premium plan user → App works with pre-configured keys
- [ ] Invalid/expired keys → Shows appropriate error
- [ ] Network error → Graceful fallback message
- [ ] User updates keys on website → Desktop app reflects changes on next launch

## Payment Flow Integration

When user purchases a plan:

1. Website calls `addPurchasedTime()` with `subscriptionPlan` parameter
2. Firebase updates user document with:
   - `subscription_plan: 'basic' | 'premium'`
   - `plan_updated_at: timestamp`
3. Desktop app checks plan on next launch
4. If Basic plan → Requires API keys
5. If Premium plan → Uses pre-configured keys

## Support Links

- Dashboard: `https://yourwebsite.com/dashboard`
- Mistral Console: `https://console.mistral.ai/`
- Google AI Studio: `https://makersuite.google.com/app/apikey`
