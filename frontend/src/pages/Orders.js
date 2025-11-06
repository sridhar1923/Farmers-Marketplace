// src/pages/Orders.js
import React, { useState, useEffect, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  // Load products & orders
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          api.get("/products"),
          api.get("/orders", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setProducts(productRes.data);
        setOrders(orderRes.data);
      } catch (error) {
        console.error("❌ Error loading data:", error);
      }
    };
    fetchData();
  }, [token]);

  // Handle order placement
  const handleOrder = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("⚠️ Please login first!");
      return;
    }

    try {
      await api.post(
        "/orders",
        { productId: selectedProduct, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("✅ Order placed successfully!");
      setQuantity(1);
      setSelectedProduct("");

      // Refresh orders
      const orderRes = await api.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orderRes.data);
    } catch (error) {
      console.error("❌ Error placing order:", error.response?.data || error);
      setMessage("❌ Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-8 font-['Poppins']">
      <h1 className="text-4xl font-bold text-emerald-400 mb-10 text-center drop-shadow-lg">
        🛒 Your Orders
      </h1>

      {/* Order Form */}
      <form
        onSubmit={handleOrder}
        className="bg-[#1b1f27] p-6 rounded-2xl shadow-lg border border-gray-700 
                   hover:shadow-[0_0_15px_#22c55e40] transition-all duration-300 mb-10 max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold mb-5 text-emerald-400 text-center">
          Place a New Order
        </h2>

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="bg-[#0f1115] border border-gray-700 p-3 rounded-lg w-full text-gray-100 mb-4 
                     focus:outline-none focus:border-emerald-400 transition-all"
          required
        >
          <option value="">Select Product</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} — ₹{p.price}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(e.target.value)}
          className="bg-[#0f1115] border border-gray-700 p-3 rounded-lg w-full text-gray-100 mb-5 
                     focus:outline-none focus:border-emerald-400 transition-all"
          required
        />

        <button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-4 rounded-lg 
                     shadow-md hover:shadow-[0_0_15px_#22c55e80] transition-all w-full"
        >
          🚀 Place Order
        </button>

        {message && (
          <p className="text-center text-sm mt-4 text-emerald-400 font-semibold">
            {message}
          </p>
        )}
      </form>

      {/* Orders List */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-emerald-400 text-center">
          Order History
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders placed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {orders.map((o) => (
              <div
                key={o.id}
                className="bg-[#1b1f27] p-5 rounded-2xl shadow-md border border-gray-700 
                           hover:shadow-[0_0_15px_#22c55e30] transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-emerald-400 mb-1">
                  {o.Product?.name}
                </h3>
                <p className="text-gray-300 mb-1">Quantity: {o.quantity}</p>
                <p className="text-gray-300 mb-1">Total: ₹{o.totalPrice}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Ordered on:{" "}
                  {new Date(o.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
