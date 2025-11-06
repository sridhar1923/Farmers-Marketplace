// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getFarmerStats
} = require('../controllers/productController');  // ✅ Correct import

const authMiddleware = require('../middleware/authMiddleware'); // ✅ Correct import

// CRUD routes
router.post('/', authMiddleware, createProduct);        // ✅ Create Product
router.get('/', getAllProducts);                        // ✅ Read All
router.get('/:id', getProductById);                     // ✅ Read One
router.put('/:id', authMiddleware, updateProduct);      // ✅ Update
router.delete('/:id', authMiddleware, deleteProduct); 
router.get("/my/stats", authMiddleware, getFarmerStats);  // ✅ Delete
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { farmerId: req.user.id },
    });
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching farmer's products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
