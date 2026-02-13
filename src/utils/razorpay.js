// Razorpay Payment Integration

export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Create order via backend API
export const createRazorpayOrder = async (amount, packageName) => {
  try {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, packageName })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const initiatePayment = async (amount, packageName, userEmail, userName, onSuccess, onFailure) => {
  try {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Razorpay SDK failed to load. Please check your internet connection.');
      return;
    }

    // Try to create order via backend
    let options;
    try {
      const orderData = await createRazorpayOrder(amount, packageName);
      
      options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Interview.AI',
        description: packageName,
        order_id: orderData.id,
        prefill: {
          email: userEmail,
          name: userName,
        },
        theme: {
          color: '#3B82F6'
        },
        handler: function (response) {
          console.log('Payment successful:', response);
          onSuccess(response);
        },
        modal: {
          ondismiss: function() {
            onFailure('Payment cancelled by user');
          }
        }
      };
    } catch (orderError) {
      // Fallback: Direct payment without order (for testing)
      console.warn('Order creation failed, using direct payment:', orderError);
      
      options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Interview.AI',
        description: packageName,
        prefill: {
          email: userEmail,
          name: userName,
        },
        theme: {
          color: '#3B82F6'
        },
        handler: function (response) {
          console.log('Payment successful:', response);
          onSuccess(response);
        },
        modal: {
          ondismiss: function() {
            onFailure('Payment cancelled by user');
          }
        },
        notes: {
          package: packageName,
          email: userEmail
        }
      };
    }

    const paymentObject = new window.Razorpay(options);
    
    paymentObject.on('payment.failed', function (response) {
      console.error('Payment failed:', response.error);
      onFailure(response.error.description || 'Payment failed');
    });
    
    paymentObject.open();
  } catch (error) {
    console.error('Payment error:', error);
    onFailure(error.message);
  }
};


