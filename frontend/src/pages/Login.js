import React, { useState, useContext } from "react";
import api from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#14161b] text-gray-100 font-['Poppins']">
      <div className="bg-[#1b1f27] p-8 rounded-2xl shadow-lg border border-gray-700 w-96 backdrop-blur-md 
                      hover:shadow-[0_0_20px_#22c55e30] transition-all duration-300">
        <h2 className="text-3xl font-bold mb-6 text-center text-emerald-400 drop-shadow-lg">
          Welcome Back 🌿
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            className="bg-[#0f1115] border border-gray-700 text-gray-100 p-3 rounded-lg 
                       focus:outline-none focus:border-emerald-400 transition-all"
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            className="bg-[#0f1115] border border-gray-700 text-gray-100 p-3 rounded-lg 
                       focus:outline-none focus:border-emerald-400 transition-all"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-2 rounded-lg 
                       shadow-md hover:shadow-[0_0_15px_#22c55e80] transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-6 text-center text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-emerald-400 font-semibold hover:underline hover:text-emerald-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
