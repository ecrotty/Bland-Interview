require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const stripeRoutes = require('./routes/stripeRoutes');
const paypalRoutes = require('./routes/paypalRoutes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/stripe', stripeRoutes);
app.use('/api/paypal', paypalRoutes);

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
