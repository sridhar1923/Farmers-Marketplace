import React, { useState } from "react";
import api from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/products");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="border p-2 rounded" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
      <p className="text-sm mt-4 text-center">
        Don’t have an account? <Link to="/register" className="text-green-600 underline">Register</Link>
      </p>
    </div>
  );
}

export default Login;
