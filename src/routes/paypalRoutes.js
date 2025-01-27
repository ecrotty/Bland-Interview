const express = require('express');
const { body, validationResult } = require('express-validator');
const paypal = require('@paypal/checkout-server-sdk');
const logger = require('../utils/logger');

const router = express.Router();

// PayPal client configuration
let environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
let client = new paypal.core.PayPalHttpClient(environment);

router.post('/create-order',
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
      const request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: currency,
            value: amount
          }
        }]
      });

      const order = await client.execute(request);
      res.json({ orderId: order.result.id });
    } catch (error) {
      logger.error('Error creating PayPal order:', error);
      res.status(500).json({ error: 'Failed to create PayPal order' });
    }
  }
);

router.post('/capture-order',
  [
    body('orderId').isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { orderId } = req.body;

    try {
      const request = new paypal.orders.OrdersCaptureRequest(orderId);
      const capture = await client.execute(request);
      
      logger.info('PayPal order captured successfully');
      res.json({ capture: capture.result });
    } catch (error) {
      logger.error('Error capturing PayPal order:', error);
      res.status(500).json({ error: 'Failed to capture PayPal order' });
    }
  }
);

router.post('/refund',
  [
    body('captureId').isString(),
    body('amount').optional().isNumeric(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { captureId, amount } = req.body;

    try {
      const request = new paypal.payments.CapturesRefundRequest(captureId);
      request.requestBody({
        amount: {
          value: amount,
          currency_code: 'USD' // Assuming USD, adjust as needed
        }
      });

      const refund = await client.execute(request);
      res.json({ refund: refund.result });
    } catch (error) {
      logger.error('Error processing PayPal refund:', error);
      res.status(500).json({ error: 'Failed to process PayPal refund' });
    }
  }
);

module.exports = router;
