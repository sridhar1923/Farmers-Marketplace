import React, { useState } from "react";
import api from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "farmer" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md w-96">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Register</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 rounded" />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} className="border p-2 rounded" />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-2 rounded" />
        <select name="role" onChange={handleChange} className="border p-2 rounded">
          <option value="farmer">Farmer</option>
          <option value="customer">Customer</option>
        </select>
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
      </form>
      <p className="text-sm mt-4 text-center">
        Already have an account? <Link to="/" className="text-green-600 underline">Login</Link>
      </p>
    </div>
  );
}

export default Register;
