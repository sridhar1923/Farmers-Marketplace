// src/components/Navbar.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-[#1b1f27] border-b border-gray-800 text-gray-100 py-4 px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold text-emerald-400 tracking-wide drop-shadow-md">
        🌾 Farmer's Marketplace
      </div>

      <div className="space-x-6 text-lg">
        <Link
          to="/products"
          className="hover:text-emerald-400 transition-all duration-300"
        >
          Products
        </Link>

        {user && user.role === "farmer" && (
          <Link
            to="/farmer-dashboard"
            className="hover:text-emerald-400 transition-all duration-300"
          >
            Dashboard
          </Link>
        )}

        <Link
          to="/orders"
          className="hover:text-emerald-400 transition-all duration-300"
        >
          Orders
        </Link>

        {user ? (
          <button
            onClick={logout}
            className="ml-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg 
                       shadow-md hover:shadow-[0_0_10px_#22c55e80] transition-all"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded-lg 
                       shadow-md hover:shadow-[0_0_10px_#22c55e80] transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
