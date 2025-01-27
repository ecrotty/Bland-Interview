require('dotenv').config();
const express = require('express');
const interviewSimulator = require('./interviewSimulator');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/start-interview', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      return res.status(400).json({ error: 'Phone number is required' });
    }
    const result = await interviewSimulator.startInterview(phoneNumber);
    res.json(result);
  } catch (error) {
    logger.error('Error starting interview:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
