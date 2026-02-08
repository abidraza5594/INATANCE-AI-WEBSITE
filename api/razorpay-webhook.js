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

    // Handle both captured and authorized payments
    if (event === 'payment.captured' || event === 'payment.authorized') {
      const { amount, notes, email, contact } = payload;
      
      // Try to get email and phone from multiple sources
      const userEmail = notes?.email || email;
      const userPhone = notes?.phone || contact;

      console.log('Payment received:', {
        paymentId: payload.id,
        amount,
        email: userEmail,
        phone: userPhone,
      });

      // Try to find user by email or phone
      let userRef = null;
      let docId = null;

      if (userEmail) {
        // Try email first
        docId = userEmail.replace(/\./g, '_').replace('@', '_at_');
        userRef = db.collection('users').doc(docId);
        const userDoc = await userRef.get();
        
        if (userDoc.exists()) {
          console.log('User found by email:', userEmail);
        } else if (userPhone) {
          // If email not found, try phone number
          console.log('Email not found, trying phone:', userPhone);
          const usersSnapshot = await db.collection('users')
            .where('phoneNumber', '==', userPhone)
            .limit(1)
            .get();
          
          if (!usersSnapshot.empty) {
            userRef = usersSnapshot.docs[0].ref;
            docId = usersSnapshot.docs[0].id;
            console.log('User found by phone:', userPhone);
          }
        }
      } else if (userPhone) {
        // Only phone available
        console.log('Only phone available, searching:', userPhone);
        const usersSnapshot = await db.collection('users')
          .where('phoneNumber', '==', userPhone)
          .limit(1)
          .get();
        
        if (!usersSnapshot.empty) {
          userRef = usersSnapshot.docs[0].ref;
          docId = usersSnapshot.docs[0].id;
          console.log('User found by phone:', userPhone);
        }
      }

      if (!userRef || !docId) {
        console.error('User not found. Email:', userEmail, 'Phone:', userPhone);
        return res.status(400).json({ 
          error: 'User not found',
          email: userEmail,
          phone: userPhone 
        });
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
        phoneNumber: userPhone || currentData.phoneNumber, // Save phone if available
        payment_history: admin.firestore.FieldValue.arrayUnion({
          amount: amount / 100, // Convert paise to rupees
          seconds: seconds,
          package: packageName,
          date: new Date().toISOString(),
          payment_id: payload.id,
        }),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      console.log(`Payment processed for user ${docId}: +${seconds}s`);
      return res.status(200).json({ 
        success: true, 
        message: 'Payment processed',
        user: docId,
        seconds: seconds
      });
    }

    return res.status(200).json({ success: true, message: 'Event received' });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
