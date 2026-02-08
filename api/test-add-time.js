import admin from 'firebase-admin';

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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    console.log('=== TEST ADD TIME ENDPOINT ===');
    console.log('Environment check:');
    console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? 'EXISTS' : 'MISSING');
    console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? 'EXISTS' : 'MISSING');
    console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? 'EXISTS' : 'MISSING');

    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      return res.status(500).json({
        error: 'Firebase environment variables not configured',
        missing: {
          projectId: !process.env.FIREBASE_PROJECT_ID,
          clientEmail: !process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: !process.env.FIREBASE_PRIVATE_KEY
        }
      });
    }

    // Get email and amount from query parameters
    const email = req.query.email || 'abidraza8104@gmail.com';
    const amount = parseInt(req.query.amount) || 1; // Amount in rupees (₹1, ₹300, ₹500)
    const docId = email.replace(/\./g, '_').replace('@', '_at_');
    
    console.log('Looking for user:', docId);
    console.log('Payment amount:', amount);
    
    const userRef = db.collection('users').doc(docId);

    // Get current data
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ 
        error: 'User not found',
        docId: docId,
        email: email,
        message: 'User document does not exist in Firestore'
      });
    }

    console.log('User found! Current data:', userDoc.data());

    const currentData = userDoc.data();
    const currentRemaining = currentData.remaining_seconds || 0;
    const currentTotal = currentData.total_purchased || 0;

    // Calculate seconds based on amount
    let seconds;
    let packageName;
    
    if (amount === 1) {
      // ₹1 = Testing (30 minutes)
      seconds = 1800;
      packageName = 'Testing Package';
    } else if (amount === 300) {
      // ₹300 = First Time (2 hours)
      seconds = 7200;
      packageName = 'First Time Special';
    } else if (amount === 500) {
      // ₹500 = Regular (2 hours)
      seconds = 7200;
      packageName = 'Regular Package';
    } else {
      // Default: 2 hours
      seconds = 7200;
      packageName = 'Custom Package';
    }

    console.log('Adding time:', seconds, 'seconds for', packageName);

    await userRef.set({
      ...currentData,
      remaining_seconds: currentRemaining + seconds,
      total_purchased: currentTotal + seconds,
      payment_history: admin.firestore.FieldValue.arrayUnion({
        amount: amount,
        seconds: seconds,
        package: packageName,
        date: new Date().toISOString(),
        payment_id: 'auto_' + Date.now(),
      }),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });

    console.log('Time added successfully!');

    return res.status(200).json({ 
      success: true,
      message: 'Time added successfully! Refresh your dashboard.',
      user: docId,
      added_seconds: seconds,
      previous_remaining: currentRemaining,
      new_remaining: currentRemaining + seconds,
      previous_total: currentTotal,
      new_total: currentTotal + seconds
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message,
      stack: error.stack
    });
  }
}
