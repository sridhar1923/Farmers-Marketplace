// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');  // ✅ Correct import

const authMiddleware = require('../middleware/authMiddleware'); // ✅ Correct import

// CRUD routes
router.post('/', authMiddleware, createProduct);        // ✅ Create Product
router.get('/', getAllProducts);                        // ✅ Read All
router.get('/:id', getProductById);                     // ✅ Read One
router.put('/:id', authMiddleware, updateProduct);      // ✅ Update
router.delete('/:id', authMiddleware, deleteProduct);   // ✅ Delete

module.exports = router;
