// backend/controllers/orderController.js
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const user = await User.findByPk(userId);
    const product = await Product.findByPk(productId);

    if (!user || !product) {
      return res.status(400).json({ message: "Invalid user or product" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const totalPrice = product.price * quantity;

    // Create order and update stock
    const order = await Order.create({ userId, productId, quantity, totalPrice });
    await product.update({ stock: product.stock - quantity });

    res.status(201).json({ message: "✅ Order placed successfully", order });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Product, attributes: ['name', 'price'] }
      ]
    });
    res.json(orders);
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error' });
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
