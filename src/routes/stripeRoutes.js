const express = require('express');
const { body, validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('../utils/logger');

const router = express.Router();

router.post('/create-payment-intent',
  [
    body('amount').isNumeric(),
    body('currency').isLength({ min: 3, max: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { amount, currency } = req.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      logger.error('Error creating payment intent:', error);
      res.status(500).json({ error: 'Failed to create payment intent' });
    }
  }
);

router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error('Webhook signature verification failed:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    logger.info('PaymentIntent was successful!');
    // Handle successful payment (e.g., update order status)
  }

  res.json({ received: true });
});

router.post('/refund',
  [
    body('paymentIntentId').isString(),
    body('amount').optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { paymentIntentId, amount } = req.body;

    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount, // Optional: partial refund if specified
      });

      res.json({ refund });
    } catch (error) {
      logger.error('Error processing refund:', error);
      res.status(500).json({ error: 'Failed to process refund' });
    }
  }
);

module.exports = router;
