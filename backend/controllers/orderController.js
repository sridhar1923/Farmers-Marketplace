// backend/controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    console.log("🧾 Order Request Body:", req.body);
    console.log("👤 Authenticated User:", req.user);

    const { productId, quantity } = req.body;
    const userId = req.user.id; // comes from JWT in authMiddleware

    // 1️⃣ Find the product
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // 2️⃣ Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    // 3️⃣ Calculate total price
    const totalPrice = product.price * quantity;

    // 4️⃣ Create order with totalPrice included ✅
    const order = await Order.create({
      productId,
      userId,
      quantity,
      totalPrice,
    });

    // 5️⃣ Reduce stock
    product.stock -= quantity;
    await product.save();

    // 6️⃣ Respond
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
      include: [{ model: Product, attributes: ['name', 'price'] }]
    });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    await order.destroy();
    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('❌ Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Product, attributes: ["name", "price"] }, { model: User, attributes: ["name", "email"] }]
    });
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching all orders:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

