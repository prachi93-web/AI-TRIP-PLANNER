import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plane,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

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

        {/* Register Content */}

        <div className="px-2">

          {/* Logo */}

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
              <Plane
                size={26}
                className="text-purple-700 rotate-45"
              />
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

          <form className="mt-10 space-y-6">

            {/* Name */}

            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <div className="mt-2 h-12 border border-gray-300 rounded-xl flex items-center px-4 bg-white focus-within:border-purple-600 transition">
                <User size={18} className="text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="flex-1 ml-3 bg-transparent outline-none text-sm"
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
                  placeholder="Enter your email"
                  className="flex-1 ml-3 bg-transparent outline-none text-sm"
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
                  placeholder="Create a password"
                  className="flex-1 ml-3 bg-transparent outline-none text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-purple-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Register Button */}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold transition shadow-lg"
            >
              Register
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