import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import axios from "axios";
import {
  User,
  Mail,
  Briefcase,
  Bookmark,
  Pencil,
  Lock,
  LogOut,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const getProfile = async () => {
  try {
    setLoading(true);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/trip/profile`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );

    if (response.data.success) {
      setUser(response.data.profile);
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
useEffect(() => {
  getProfile();
}, []);
  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

  const initials = user?.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully!");

    navigate("/login");
  };
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto"></div>

        <p className="mt-4 text-gray-600">
          Loading Profile...
        </p>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-white">
      {/* Desktop Sidebar */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Navbar */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileNavbar />
      </div>

      {/* Main */}

      <div className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:px-10 pb-8">
        <div className="max-w-3xl mx-auto p-6 sm:p-8">
          {/* Heading */}

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            My Profile
          </h1>

          <p className="text-gray-500 mt-2 text-center">
            Manage your account information
          </p>

          {/* Avatar */}

          <div className="flex justify-center mt-8">
            <div className="w-24 h-24 rounded-full bg-purple-700 flex items-center justify-center text-white text-3xl font-bold">
              {initials}
            </div>
          </div>

          {/* User Details */}

          <div className="mt-8 space-y-5">
            <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <User size={18} className="text-purple-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Mail size={18} className="text-purple-700" />
              </div>

              <div>
                <p className="text-sm text-gray-500">Email Address</p>
                <h3 className="font-semibold text-gray-900">{user?.email}</h3>
              </div>
            </div>
          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-5 mt-8">
            <div className="border border-gray-200 rounded-xl p-5 text-center">
              <Briefcase className="mx-auto text-purple-700 mb-2" />

              <h2 className="text-2xl font-bold">{user?.totalTrips}</h2>

              <p className="text-gray-500 text-sm">Total Trips</p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5 text-center">
              <Bookmark className="mx-auto text-purple-700 mb-2" />

              <h2 className="text-2xl font-bold">{user?.upcomingTrips}</h2>

              <p className="text-gray-500 text-sm">Upcoming Trips</p>
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-10 space-y-4">
            <button
              className="w-full h-12 rounded-xl border border-purple-200 text-purple-700 hover:bg-purple-50 transition flex items-center justify-center gap-2"
              disabled
            >
              <Pencil size={18} />
              Edit Profile
            </button>

            <button
              className="w-full h-12 rounded-xl border border-gray-200 hover:bg-gray-50 transition flex items-center justify-center gap-2"
              disabled
            >
              <Lock size={18} />
              Change Password
            </button>

            <button
              onClick={handleLogout}
              className="w-full h-12 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
