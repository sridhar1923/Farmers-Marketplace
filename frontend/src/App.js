// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import FarmerDashboard from "./pages/FarmerDashboard";
import Cart from "./pages/Cart";

function App() {
  return (
    <Router>
      <div className="bg-[#0f1115] text-gray-100 min-h-screen font-['Poppins'] transition-colors duration-300">
        {/* Navbar always visible */}
        <Navbar />

        {/* Page Container */}
        <div className="pt-20 px-6 sm:px-10 pb-10">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route
              path="/farmer-dashboard"
              element={
                <ProtectedRoute>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
