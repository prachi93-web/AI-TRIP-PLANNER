import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Plane, User, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/register`,
        formData,
      );

      if (response.data.success) {
        toast.success(response.data.message);

        navigate("/verify-otp", {
          state: {
            email: formData.email,
          },
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-white">
      <div className="w-full max-w-md">
        {/* Back Button */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Register Card */}

        <div className="px-2">
          {/* Logo */}

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
              <Plane size={26} className="text-purple-700 rotate-45" />
            </div>
          </div>

          {/* Heading */}

          <h1 className="text-4xl font-bold text-center text-gray-900">
            Create Account
          </h1>

          <p className="text-center text-gray-500 mt-2 text-sm">
            Register to start planning your dream trips
          </p>

          {/* Form */}

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {/* Name */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="mt-2 h-12 border border-gray-300 rounded-xl flex items-center px-4 bg-white focus-within:border-purple-600 transition">
                <User size={18} className="text-gray-400" />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="flex-1 ml-3 bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            {/* Email */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <div className="mt-2 h-12 border border-gray-300 rounded-xl flex items-center px-4 bg-white focus-within:border-purple-600 transition">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="flex-1 ml-3 bg-transparent outline-none text-sm"
                  required
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="mt-2 h-12 border border-gray-300 rounded-xl flex items-center px-4 bg-white focus-within:border-purple-600 transition">
                <Lock size={18} className="text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="flex-1 ml-3 bg-transparent outline-none text-sm"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-purple-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Register Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {/* Login */}

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
