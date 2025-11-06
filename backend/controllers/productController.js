// backend/controllers/productController.js
const Product = require('../models/Product');
const User = require('../models/User');
const Order = require("../models/Order");

exports.getFarmerStats = async (req, res) => {
  try {
    const farmerId = req.user.id;

    // ✅ Fetch all products belonging to this farmer
    const products = await Product.findAll({ where: { farmerId } });

    // ✅ For each product, calculate total sold quantity and total earnings
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const totalSold = await Order.sum("quantity", {
          where: { productId: product.id },
        });

        const totalEarnings = await Order.sum("totalPrice", {
          where: { productId: product.id },
        });

        return {
          ...product.dataValues,
          totalSold: totalSold || 0,
          totalEarnings: totalEarnings || 0,
        };
      })
    );

    res.json(productsWithStats);
  } catch (error) {
    console.error("❌ Error fetching farmer stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ➕ Add a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const farmerId = req.user.id; // ✅ use authenticated user id

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      farmerId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// 📋 Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: { model: User, attributes: ['name', 'email'] }
    });
    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🔍 Get a single product by ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id, {
      include: { model: User, attributes: ['name', 'email'] }
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('❌ Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ✏️ Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const farmerId = req.user.id;

    // ✅ Find the product
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Make sure the logged-in farmer owns the product
    if (product.farmerId !== farmerId) {
      return res.status(403).json({ message: "Unauthorized: cannot edit others' products" });
    }

    // ✅ Update product fields
    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// 🗑️ Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
