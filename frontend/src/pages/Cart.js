import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("🧺 Cart data:", res.data);
        setCartItems(res.data);
      } catch (err) {
        console.error("❌ Error fetching cart:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [token]);

  // Remove item from cart
  const handleRemove = async (id) => {
    try {
      await api.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("❌ Remove item error:", err.response?.data || err);
    }
  };

  // Checkout (place all items as orders)
  const handleCheckout = async () => {
    try {
      await api.post(
        "/orders/checkout",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Checkout successful!");
      setCartItems([]);
    } catch (err) {
      console.error("❌ Checkout error:", err.response?.data || err);
      alert("Failed to checkout");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center text-gray-300 text-xl">
        Loading your cart...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-100 p-8 font-['Poppins']">
      <h1 className="text-4xl font-bold text-emerald-400 mb-10 text-center drop-shadow-lg">
        🧺 Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          Your cart is currently empty.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1b1f27] p-6 rounded-2xl shadow-lg border border-gray-700 
                           hover:shadow-[0_0_15px_#22c55e40] hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-emerald-400 mb-2">
                  {item.Product?.name || "Product"}
                </h3>
                <p className="text-gray-300 text-lg mb-1">
                  Price: ₹{item.Product?.price}
                </p>
                <p className="text-gray-400 mb-4">
                  Quantity: {item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg 
                             font-semibold transition-all hover:shadow-[0_0_10px_#ef444450]"
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={handleCheckout}
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-8 rounded-lg 
                         shadow-md hover:shadow-[0_0_15px_#22c55e80] transition-all text-lg"
            >
              ✅ Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
