// backend/controllers/productController.js
const Product = require('../models/Product');
const User = require('../models/User');

// ➕ Add a new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, farmerId } = req.body;

    // check if farmer exists
    const farmer = await User.findByPk(farmerId);
    if (!farmer || farmer.role !== 'farmer') {
      return res.status(400).json({ message: 'Invalid farmer ID' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      farmerId
    });

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    console.error('❌ Error creating product:', error);
    res.status(500).json({ message: 'Internal server error' });
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

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.update({ name, description, price, stock });
    res.json({ message: '✅ Product updated successfully', product });
  } catch (error) {
    console.error('❌ Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
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
