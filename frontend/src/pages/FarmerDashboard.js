import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function FarmerDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    farmerId: 1, // temporary
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // Load all products
  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        // Update existing
        await api.put(`/products/${editingProduct.id}`, form);
        setEditingProduct(null);
      } else {
        // Add new
        await api.post("/products", form);
      }

      setForm({ name: "", description: "", price: "", stock: "", farmerId: 1 });
      loadProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      farmerId: product.farmerId,
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      loadProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setForm({ name: "", description: "", price: "", stock: "", farmerId: 1 });
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🧑‍🌾 Farmer Dashboard
      </h1>

      {/* Add/Edit Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-green-600">
          {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
        </h2>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded w-full mb-3"
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded w-full mb-3"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded w-full mb-3"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="border p-2 rounded w-full mb-4"
          required
        />

        <div className="flex justify-between">
          <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            {editingProduct ? "Update" : "Add"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-green-800">{p.name}</h2>
            <p className="text-gray-600 mb-2">{p.description}</p>
            <p className="text-green-700 font-bold">₹{p.price}</p>
            <p className="text-sm text-gray-500 mb-3">Stock: {p.stock}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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
