import React from "react";
import { Link } from "react-router-dom";
import { Plane, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-white/90 backdrop-blur-lg border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-purple-100 flex items-center justify-center">
            <Plane className="w-5 h-5 text-purple-700 rotate-45" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-purple-700">AI</span> Travel Planner
          </h1>
        </Link>

        {/* Login Button */}
        <Link
          to="/login"
          className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 duration-300 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md" >
          <User size={16} />
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
