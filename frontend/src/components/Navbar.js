import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">🌾 Farmer's Marketplace</div>
      <div className="space-x-4">
        <Link to="/products">Products</Link>
        {user && user.role === "farmer" && <Link to="/farmer-dashboard">Dashboard</Link>}
        <Link to="/orders">Orders</Link>
        {user ? (
          <button onClick={logout} className="bg-white text-green-700 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
