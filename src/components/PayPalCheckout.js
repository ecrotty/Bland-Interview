import React, { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import axios from 'axios';

const PayPalCheckout = ({ amount, currency }) => {
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency]);

  const createOrder = async () => {
    try {
      const response = await axios.post('/api/paypal/create-order', {
        amount,
        currency,
      });
      return response.data.orderId;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
    }
  };

  const onApprove = async (data) => {
    try {
      const response = await axios.post('/api/paypal/capture-order', {
        orderId: data.orderID,
      });
      console.log('Payment captured:', response.data);
      // Handle successful payment
    } catch (error) {
      console.error('Error capturing PayPal payment:', error);
    }
  };

  if (isPending) return <div>Loading PayPal...</div>;

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
    />
  );
};

export default PayPalCheckout;
