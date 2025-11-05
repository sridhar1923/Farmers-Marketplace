const express = require("express");
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  deleteOrder
} = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createOrder);   // ✅ protect this
router.get("/", authMiddleware, getAllOrders);
router.get("/user/:userId", authMiddleware, getUserOrders);
router.delete("/:id", authMiddleware, deleteOrder);

module.exports = router;
