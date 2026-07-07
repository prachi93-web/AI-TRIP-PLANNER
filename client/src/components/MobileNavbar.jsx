import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  Map,
  User,
  LogOut,
  Plane,
} from "lucide-react";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Create Trip",
      path: "/create-trip",
      icon: <PlusCircle size={20} />,
    },
    {
      name: "My Trips",
      path: "/my-trips",
      icon: <Map size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <>
      {/* Top Navbar */}

      <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 h-16 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => setOpen(true)}>
          <Menu size={26} className="text-gray-700" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
            <Plane size={18} className="text-purple-700 rotate-45" />
          </div>

          <h1 className="font-bold text-lg">
            <span className="text-purple-700">AI</span> Travel
          </h1>
        </div>

        {/* Profile Initial */}

        <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold text-lg">
          P
        </div>
      </div>

      {/* Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}

        <div className="flex justify-between items-center px-6 py-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Plane className="text-purple-700 rotate-45" size={18} />
            </div>

            <h2 className="font-bold text-lg">
              <span className="text-purple-700">AI</span> Travel Planner
            </h2>
          </div>

          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Menu */}

        <div className="mt-6 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition
              ${
                location.pathname === item.path
                  ? "bg-purple-100 text-purple-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}

              {item.name}
            </Link>
          ))}
        </div>

        {/* Bottom */}

        <div className="absolute bottom-8 left-4 right-4">
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
