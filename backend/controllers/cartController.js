const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // If product already in cart → update quantity
    const existingItem = await Cart.findOne({ where: { userId, productId } });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json({ message: "Cart updated", cart: existingItem });
    }

    // Else create new item
    const cart = await Cart.create({ userId, productId, quantity });
    res.status(201).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error("❌ Add to cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Product, attributes: ["name", "price", "stock"] }],
    });
    res.json(cartItems);
  } catch (error) {
    console.error("❌ Get cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findByPk(id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    await item.destroy();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("❌ Remove cart error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
