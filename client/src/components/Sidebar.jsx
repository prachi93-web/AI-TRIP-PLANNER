import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Plus,
  Briefcase,
  User,
  LogOut,
  Plane,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Create Trip",
      path: "/create-trip",
      icon: Plus,
    },
    {
      name: "My Trips",
      path: "/my-trips",
      icon: Briefcase,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        {/* Logo */}

        <div className="flex items-center gap-3 px-7 py-8">
          <Plane size={28} className="text-purple-700 rotate-45" />

          <h2 className="text-2xl font-bold">
            <span className="text-purple-700">AI</span> Travel Planner
          </h2>
        </div>

        {/* Menu */}

        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3 rounded-xl transition ${
                  location.pathname === item.path
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                <Icon size={20} />

                {item.name}
              </Link>
            );
          })}

          {/* Logout */}

          <button className="w-full mt-2 flex items-center gap-4 px-5 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Bottom Card */}

      <div className="m-5 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 p-5">
        <h3 className="font-semibold text-purple-700">
          Let AI plan your perfect trip ✨
        </h3>

        <p className="text-sm text-gray-600 mt-2">Smart, Fast and Easy.</p>
      </div>
    </div>
  );
};

export default Sidebar;
