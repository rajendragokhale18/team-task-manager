import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../layouts/MainLayout";
import { loginUser } from "../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(formData);

      toast.success(
        "Login successful"
      );

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="min-h-[90vh] flex items-center justify-center px-6">

        <div className="glass rounded-[32px] p-10 w-full max-w-md">

          <div className="mb-10 text-center">

            <h1 className="text-5xl font-black tracking-tight mb-3">
              Welcome
              <span className="gradient-text">
                .
              </span>
            </h1>

            <p className="text-slate-400">
              Sign in to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-black/20 border border-white/10 outline-none"
            />

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-white text-black py-4 rounded-2xl font-bold hover:scale-[1.02] transition"
            >
              {loading
                ? "Signing In..."
                : "Login"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;