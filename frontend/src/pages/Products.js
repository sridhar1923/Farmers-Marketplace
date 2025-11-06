import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosConfig";


function Products() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

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
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("✅ Order placed successfully!");
  } catch (error) {
    console.error("❌ Order error:", error.response?.data || error.message);
    alert("Failed to place order");
  }
};



  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 font-bold text-green-700">₹{product.price}</p>

          <button
            onClick={() => handleOrder(product.id)}
            className="mt-3 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            🛒 Order Now
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
