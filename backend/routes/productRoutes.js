// backend/routes/productRoutes.js
const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();

// CRUD routes
router.post('/', createProduct);        // Add new product
router.get('/', getAllProducts);        // Get all products
router.get('/:id', getProductById);     // Get single product
router.put('/:id', updateProduct);      // Update product
router.delete('/:id', deleteProduct);   // Delete product

module.exports = router;
