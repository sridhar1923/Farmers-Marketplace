import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function Orders() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  const userId = 1; // temporary, will use logged-in user later

  // Load products and existing orders
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          api.get("/products"),
          api.get(`/orders/user/${userId}`)
        ]);
        setProducts(productRes.data);
        setOrders(orderRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle order placement
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders", { userId, productId: selectedProduct, quantity });
      setMessage("✅ Order placed successfully!");
      setQuantity(1);
      setSelectedProduct("");
      const orderRes = await api.get(`/orders/user/${userId}`);
      setOrders(orderRes.data);
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("❌ Failed to place order.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
        🛒 Customer Orders
      </h1>

      {/* Order Form */}
      <form
        onSubmit={handleOrder}
        className="bg-white p-6 rounded-xl shadow-md mb-6 max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4 text-green-600">Place an Order</h2>

        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border p-2 rounded w-full mb-3"
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
          className="border p-2 rounded w-full mb-3"
          required
        />

        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full">
          Place Order
        </button>

        {message && (
          <p className="text-center text-sm mt-3 text-green-700 font-semibold">
            {message}
          </p>
        )}
      </form>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Your Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500">No orders placed yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((o) => (
              <div key={o.id} className="bg-white p-4 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-green-800">
                  {o.Product?.name}
                </h3>
                <p>Quantity: {o.quantity}</p>
                <p>Total Price: ₹{o.totalPrice}</p>
                <p className="text-sm text-gray-500">
                  Ordered on: {new Date(o.createdAt).toLocaleDateString()}
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
