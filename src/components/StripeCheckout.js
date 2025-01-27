import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_stripe_publishable_key');

const CheckoutForm = ({ amount, currency }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const response = await axios.post('/api/stripe/create-payment-intent', {
        amount,
        currency,
      });
      setClientSecret(response.data.clientSecret);
    };

    fetchPaymentIntent();
  }, [amount, currency]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        // Handle successful payment
        console.log('Payment succeeded');
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div>{error}</div>}
      <button type="submit" disabled={!stripe || processing}>
        Pay
      </button>
    </form>
  );
};

const StripeCheckout = ({ amount, currency }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} currency={currency} />
    </Elements>
  );
};

export default StripeCheckout;
