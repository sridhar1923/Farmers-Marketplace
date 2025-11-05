import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import FarmerDashboard from "./pages/FarmerDashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-green-700 mb-8">
          🌾 Farmer's Marketplace
        </h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
