import { useState } from 'react';
import { initiatePayment } from '../utils/razorpay';

export default function TestPayment() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const testPayment = async () => {
    setLoading(true);
    setResult('Initiating payment...');

    await initiatePayment(
      1, // ₹1 for testing
      'Test Payment',
      'test@example.com',
      'Test User',
      (response) => {
        setResult('Payment Successful! Response: ' + JSON.stringify(response, null, 2));
        setLoading(false);
      },
      (error) => {
        setResult('Payment Failed: ' + error);
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Payment Test Page</h1>
        
        <div className="bg-slate-800 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-4">Razorpay Configuration</h2>
          <p className="text-sm text-gray-400 mb-2">
            Key ID: {import.meta.env.VITE_RAZORPAY_KEY_ID || 'Not configured'}
          </p>
          <p className="text-sm text-gray-400">
            Status: {import.meta.env.VITE_RAZORPAY_KEY_ID ? '✅ Configured' : '❌ Not configured'}
          </p>
        </div>

        <button
          onClick={testPayment}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {loading ? 'Processing...' : 'Test Payment (₹1)'}
        </button>

        {result && (
          <div className="bg-slate-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-3">Result:</h3>
            <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-auto">
              {result}
            </pre>
          </div>
        )}

        <div className="mt-8 bg-yellow-900/20 border border-yellow-600/30 p-4 rounded-xl">
          <h3 className="text-yellow-400 font-semibold mb-2">⚠️ Test Mode Instructions:</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Use test card: 4111 1111 1111 1111</li>
            <li>• CVV: Any 3 digits</li>
            <li>• Expiry: Any future date</li>
            <li>• Name: Any name</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
