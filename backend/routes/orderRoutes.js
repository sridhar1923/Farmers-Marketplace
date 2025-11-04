// backend/routes/orderRoutes.js
const express = require('express');
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  deleteOrder
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);              // Place new order
router.get('/', getAllOrders);              // View all orders
router.get('/user/:userId', getUserOrders); // View specific user's orders
router.delete('/:id', deleteOrder);         // Cancel an order

module.exports = router;
