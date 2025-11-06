// backend/routes/orderRoutes.js
const express = require("express");
const { createOrder, getAllOrders, getUserOrders, deleteOrder } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// 🧾 Routes
router.post("/", protect, createOrder);
router.get("/", protect, getAllOrders);
router.get("/user/:userId", protect, getUserOrders);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
