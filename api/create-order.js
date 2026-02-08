import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, email, phone } = req.body;

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: 'rzp_live_SDa0tRbVfVpnhQ',
      key_secret: '0Rajmnf2pV1PEEvsdvbiI7SU',
    });

    // Create order with auto-capture
    const order = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto-capture enabled
      notes: {
        email: email,
        phone: phone || '',
      },
    });

    console.log('Order created:', order.id);
    return res.status(200).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    return res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message 
    });
  }
}
