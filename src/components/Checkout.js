import React, { useState } from 'react';
import StripeCheckout from './StripeCheckout';
import PayPalCheckout from './PayPalCheckout';

const Checkout = ({ amount, currency }) => {
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        <label>
          <input
            type="radio"
            value="stripe"
            checked={paymentMethod === 'stripe'}
            onChange={() => setPaymentMethod('stripe')}
          />
          Pay with Card
        </label>
        <label>
          <input
            type="radio"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={() => setPaymentMethod('paypal')}
          />
          Pay with PayPal
        </label>
      </div>
      {paymentMethod === 'stripe' ? (
        <StripeCheckout amount={amount} currency={currency} />
      ) : (
        <PayPalCheckout amount={amount} currency={currency} />
      )}
    </div>
  );
};

export default Checkout;
