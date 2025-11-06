import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Load products
  const loadProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get("/products/my/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add or update product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Product updated successfully!");
        setEditingProduct(null);
      } else {
        await api.post("/products", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("✅ Product added successfully!");
      }

      setForm({ name: "", description: "", price: "", stock: "" });
      loadProducts();
    } catch (err) {
      console.error("❌ Error saving product:", err.response?.data || err.message);
      alert("Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", stock: "" });
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-8 font-['Poppins']">
      <h1 className="text-4xl font-bold text-emerald-400 mb-10 text-center drop-shadow-lg">
        🧑‍🌾 Farmer Dashboard
      </h1>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-[#1b1f27] p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-[0_0_20px_#22c55e30] transition-all"
      >
        <h2 className="text-2xl font-semibold mb-5 text-emerald-400 text-center">
          {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
        </h2>

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="bg-[#0f1115] border border-gray-700 text-gray-100 p-3 rounded-lg w-full mb-3 focus:outline-none focus:border-emerald-400"
          required
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="bg-[#0f1115] border border-gray-700 text-gray-100 p-3 rounded-lg w-full mb-3 focus:outline-none focus:border-emerald-400"
          required
        />

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="bg-[#0f1115] border border-gray-700 text-gray-100 p-3 rounded-lg w-1/2 focus:outline-none focus:border-emerald-400"
            required
          />
          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="bg-[#0f1115] border border-gray-700 text-gray-100 p-3 rounded-lg w-1/2 focus:outline-none focus:border-emerald-400"
            required
          />
        </div>

        <div className="flex justify-between mt-5">
          <button
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-[0_0_12px_#22c55e80] transition-all"
          >
            {editingProduct ? "Update" : "Add"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-5 rounded-lg transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-[#1b1f27] p-6 rounded-2xl shadow-lg border border-gray-700 hover:shadow-[0_0_20px_#22c55e30] hover:-translate-y-1 transition-all"
          >
            <h2 className="text-2xl font-semibold text-emerald-400 mb-2">{p.name}</h2>
            <p className="text-gray-400 mb-2">{p.description}</p>
            <p className="text-gray-200 font-medium text-lg mb-1">₹{p.price}</p>
            <p className="text-sm text-gray-500 mb-4">Stock: {p.stock}</p>

            {p.totalSold !== undefined && (
              <>
                <p className="text-blue-400 font-medium">Sold: {p.totalSold} units</p>
                <p className="text-orange-400 font-semibold mb-3">
                  Earnings: ₹{p.totalEarnings}
                </p>
              </>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-1 px-4 rounded-lg transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 hover:bg-red-400 text-white font-medium py-1 px-4 rounded-lg transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerDashboard;
