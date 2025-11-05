import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";

function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🥕 Available Products
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-green-800">{p.name}</h2>
            <p className="text-gray-600 mb-2">{p.description}</p>
            <p className="text-green-600 font-bold">₹{p.price}</p>
            <p className="text-sm text-gray-500">Farmer: {p.User?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
