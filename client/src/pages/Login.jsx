import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plane, Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 background-color: bg-white"
      // style={{
      //   background:
      //     "linear-gradient(135deg, #ffffff 0%, #faf5ff 45%, #f3e8ff 100%)",
      // }}
    >
      <div className="w-full max-w-md">
        {/* Back Button */}

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-purple-700 duration-300 mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        {/* Login Content */}

        <div className="px-2">
          {/* Logo */}

          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center">
              <Plane size={26} className="text-purple-700 rotate-45" />
            </div>
          </div>

          {/* Heading */}

          <h1 className="text-4xl font-bold text-center text-gray-900">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mt-2 text-sm">
            Sign in to continue your journey
          </p>

          {/* Form */}

          <form className="mt-10 space-y-6">
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
                  placeholder="Enter your password"
                  className="flex-1 ml-3 bg-transparent outline-none text-sm"
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

            {/* Forgot Password */}

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-purple-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-semibold transition shadow-lg"
            >
              Login
            </button>
          </form>

          {/* Register */}

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-purple-700 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
