// import React, { useState } from 'react';

// const PaymentPage: React.FC = () => {
//   const [selectedMethod, setSelectedMethod] = useState<'credit' | 'paypal'>('credit');

//   return (
//     <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Payment Information</h2>

//       {/* Payment Method Selection */}
//       <div className="mb-6">
//         <p className="text-lg font-semibold mb-2">Choose Payment Method:</p>
//         <div className="flex items-center mb-2">
//           <input
//             type="radio"
//             id="credit"
//             name="paymentMethod"
//             value="credit"
//             checked={selectedMethod === 'credit'}
//             onChange={() => setSelectedMethod('credit')}
//             className="mr-2"
//           />
//           <label htmlFor="credit" className="text-lg">Credit Card</label>
//         </div>
//         <div className="flex items-center">
//           <input
//             type="radio"
//             id="paypal"
//             name="paymentMethod"
//             value="paypal"
//             checked={selectedMethod === 'paypal'}
//             onChange={() => setSelectedMethod('paypal')}
//             className="mr-2"
//           />
//           <label htmlFor="paypal" className="text-lg">PayPal</label>
//         </div>
//       </div>

//       {/* Credit Card Form */}
//       {selectedMethod === 'credit' && (
//         <div className="mb-6">
//           <div className="mb-4">
//             <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
//             <input
//               type="text"
//               id="cardNumber"
//               placeholder="1234 5678 9012 3456"
//               className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="mb-4">
//               <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
//               <input
//                 type="text"
//                 id="expiryDate"
//                 placeholder="MM/YY"
//                 className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
//               <input
//                 type="text"
//                 id="cvv"
//                 placeholder="123"
//                 className="mt-1 p-2 w-full border border-gray-300 rounded-md"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* PayPal Button */}
//       {selectedMethod === 'paypal' && (
//         <div className="mb-6">
//           <p className="text-sm text-gray-700 mb-2">You will be redirected to PayPal for payment.</p>
//           <button className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700">
//             Pay with PayPal
//           </button>
//         </div>
//       )}

//       {/* Summary */}
//       <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
//         <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
//         <div className="flex justify-between mb-2">
//           <span>Item Total</span>
//           <span>$99.99</span>
//         </div>
//         <div className="flex justify-between mb-2">
//           <span>Other</span>
//           <span>$10.00</span>
//         </div>
//         <div className="flex justify-between mb-4 font-bold">
//           <span>Total</span>
//           <span>$109.99</span>
//         </div>
//         <button className="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700">
//           Confirm Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;











"use client"
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Apple } from 'lucide-react'; 

//  Replace  with  publishable key
const stripePromise = loadStripe('pk_test_51PajouCLGd2J5MjD94qNoTCcmrDGFhYfVcskH0HRtQpKZ3bUwaNofs2jKcKLx2Bd05NZPMH7cyNYxRMS1Kh2xCrF00P4i8r2Ub');

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [zip, setZip] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
        billing_details: {
          email,
          name,
          address: {
            country,
            postal_code: zip,
          },
        },
      });

      if (error) {
        // setError(error?.message);
        return;
      }

      // Handle successful payment method creation
      //  Send paymentMethod.id to  backend

      setPaymentSuccessful(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  text-white">
      <div className="w-full max-w-md p-4 bg-yellow-300 rounded-lg mt-0">
        <div className="text-center mb-4">
          <h1 className="text-mg">Pay MSB App</h1>
          <h2 className="text-3xl font-bold">£10.00</h2>
          <button className="mt-2 py-2 px-2 bg-white text-black rounded-lg">View details</button>
        </div>

        <button className="w-full py-2 mb-4 bg-black text-white rounded-lg flex justify-center items-center">
          <Apple className="mr-2" /> Apple Pay
        </button>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-1 border border-gray-700 rounded-lg bg-white text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Card information</label>
            <CardElement className="w-full p-2 border border-gray-700 rounded-lg bg-white text-black" />
          </div>
          <div>
            <label className="block text-sm mb-1">Name on card</label>
            <input
              type="text"
              className="w-full p-1 border border-gray-700 rounded-lg bg-white text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Country or region</label>
            <select
              className="w-full p-1 border border-gray-700 rounded-lg bg-white text-black"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>United Kingdom</option>
              <option>India</option>
            </select>
            <input
              type="text"
              className="w-full p-1 border border-gray-700 rounded-lg bg-white text-black mt-1"
              placeholder="ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-3 bg-gray-700 rounded-lg">
            Pay £10.00
          </button>
          {error && <div className="text-red-500">{error}</div>}
          {paymentSuccessful && <div className="text-green-500">Payment Successful!</div>}
        </form>

        <div className="mt-2 text-center text-gray-500">
          <p>Powered by <span className="font-bold">stripe</span></p>
          <div className="flex justify-center space-x-2">
            <a href="#" className="hover:underline">Terms</a>
            <span>|</span>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
};


const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;

