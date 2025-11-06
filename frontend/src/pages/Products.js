import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

function Products() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Error loading products:", err));
  }, []);

  // Handle Order
  const handleOrder = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await api.post(
        "/orders",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error("❌ Order error:", error.response?.data || error.message);
      alert("Failed to place order");
    }
  };

  // Handle Add to Cart
  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await api.post(
        "/cart",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("🛒 Added to cart!");
    } catch (error) {
      console.error("❌ Add to cart error:", error.response?.data || error.message);
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-8 font-['Poppins']">
      <h1 className="text-4xl font-bold text-emerald-400 mb-10 text-center drop-shadow-lg">
        🌾 Available Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-[#1b1f27] p-6 rounded-2xl shadow-lg border border-gray-700 
                       hover:shadow-[0_0_15px_#22c55e40] hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-emerald-400 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-400 mb-2">{product.description}</p>
            <p className="text-gray-200 font-medium text-lg mb-4">
              ₹{product.price}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => handleAddToCart(product.id)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 rounded-lg 
                           shadow-md hover:shadow-[0_0_10px_#facc1540] transition-all"
              >
                ➕ Add to Cart
              </button>

              <button
                onClick={() => handleOrder(product.id)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg 
                           shadow-md hover:shadow-[0_0_10px_#22c55e80] transition-all"
              >
                🛒 Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Cart */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/cart")}
          className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-8 rounded-lg 
                     shadow-md hover:shadow-[0_0_15px_#3b82f640] transition-all text-lg"
        >
          🧺 View Cart
        </button>
      </div>
    </div>
  );
}

export default Products;
