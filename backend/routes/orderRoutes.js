// backend/routes/orderRoutes.js
const express = require("express");
const { createOrder, getAllOrders, getUserOrders, deleteOrder, checkout } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// 🧾 Routes
router.post("/", protect, createOrder);
router.get("/", protect, getAllOrders);
router.get("/user/:userId", protect, getUserOrders);
router.delete("/:id", protect, deleteOrder);
router.post("/checkout", protect, checkout);

module.exports = router;
