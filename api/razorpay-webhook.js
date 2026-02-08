import admin from 'firebase-admin';
import crypto from 'crypto';

// Initialize Firebase Admin (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify Razorpay signature
    const signature = req.headers['x-razorpay-signature'];
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const body = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('Invalid signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Process payment
    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    if (event === 'payment.captured') {
      const { amount, notes } = payload;
      const userEmail = notes?.email;

      if (!userEmail) {
        console.error('No email in payment notes');
        return res.status(400).json({ error: 'No email found' });
      }

      // Calculate seconds based on amount
      let seconds;
      let packageName;
      
      if (amount === 100) {
        // ₹1 = Testing (30 minutes)
        seconds = 1800;
        packageName = 'Testing Package';
      } else if (amount === 30000) {
        // ₹300 = First Time (2 hours)
        seconds = 7200;
        packageName = 'First Time Special';
      } else if (amount === 50000) {
        // ₹500 = Regular (2 hours)
        seconds = 7200;
        packageName = 'Regular Package';
      } else {
        // Default: 2 hours
        seconds = 7200;
        packageName = 'Custom Package';
      }

      // Convert email to Firestore document ID
      const docId = userEmail.replace('.', '_').replace('@', '_at_');
      const userRef = db.collection('users').doc(docId);

      // Get current user data
      const userDoc = await userRef.get();
      const currentData = userDoc.exists ? userDoc.data() : {};

      const currentRemaining = currentData.remaining_seconds || 0;
      const currentTotal = currentData.total_purchased || 0;

      // Update user document
      await userRef.set({
        ...currentData,
        remaining_seconds: currentRemaining + seconds,
        total_purchased: currentTotal + seconds,
        payment_history: admin.firestore.FieldValue.arrayUnion({
          amount: amount / 100, // Convert paise to rupees
          seconds: seconds,
          package: packageName,
          date: new Date().toISOString(),
          payment_id: payload.id,
        }),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      console.log(`Payment processed for ${userEmail}: +${seconds}s`);
      return res.status(200).json({ success: true, message: 'Payment processed' });
    }

    return res.status(200).json({ success: true, message: 'Event received' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
