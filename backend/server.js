// backend/server.js
require('dotenv').config({ path: __dirname + '/.env' }); // ✅ load .env first and only once

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send("🌾 Welcome to Farmer's Marketplace Backend!");
});

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use routes (order doesn't really matter, but this is conventional)
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Sync DB and start server
sequelize.sync()
  .then(() => {
    console.log('📦 Database synced');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log('Error syncing database:', err));
