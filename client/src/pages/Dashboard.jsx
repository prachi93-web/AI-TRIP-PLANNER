import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import TripCard from "../components/TripCard";
import { Briefcase, MapPinned, CalendarDays, Bookmark } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "";
  const userTrips = trips.filter((trip) => !trip.isSample);
  const sampleTrips = trips.filter((trip) => trip.isSample);

  const dashboardTrips = userTrips.length === 0 ? sampleTrips.slice(0, 4) : userTrips.slice(0, 4);

  const getTrips = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip/list`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        setTrips(response.data.trips);
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
  const getProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip/profile`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        setUser(response.data.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTrips();
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}

      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Navbar */}

      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileNavbar />
      </div>

      {/* Main Content */}

      <div className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:px-10 pb-8">
        {/* Header */}

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2 text-sm sm:text-base lg:text-lg">
              Welcome back, {user?.name} 👋
            </p>
          </div>

          <div className="hidden lg:flex w-12 h-12 rounded-full bg-purple-700 text-white items-center justify-center text-xl font-semibold shadow-md">
            {initials}
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mt-8">
          {/* Total Trips */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <Briefcase className="text-purple-700" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Total Trips</p>

              <h2 className="text-xl lg:text-3xl font-bold">
                {userTrips.length}
              </h2>
            </div>
          </div>

          {/* Places Visited */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <MapPinned className="text-green-600" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Places Visited</p>

              <h2 className="text-xl lg:text-3xl font-bold">
                {new Set(userTrips.map((trip) => trip.destination)).size}
              </h2>
            </div>
          </div>

          {/* Days Planned */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-orange-100 flex items-center justify-center">
              <CalendarDays className="text-orange-600" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Days Planned</p>

              <h2 className="text-xl lg:text-3xl font-bold">
                {userTrips.reduce((total, trip) => total + trip.days, 0)}
              </h2>
            </div>
          </div>

          {/* Upcoming Trips */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <Bookmark className="text-blue-600" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Upcoming Trips</p>

              <h2 className="text-xl lg:text-3xl font-bold">
                {
                  userTrips.filter((trip) => new Date(trip.startDate) >= new Date(),).length
                }
              </h2>
            </div>
          </div>
        </div>

        {/* Upcoming Trips Heading */}

        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">
            {userTrips.length === 0 ? "Discover Destinations" : "Latest Trips"}
          </h2>

          <button
            onClick={() => navigate("/my-trips")}
            className="text-purple-700 text-sm font-medium hover:underline"
          >
            {userTrips.length === 0 ? "Explore More" : "View All"}
          </button>
        </div>

        {/* Trip Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
          {dashboardTrips.map((trip) => (
            <TripCard
              key={trip._id}
              image={trip.image}
              destination={trip.destination}
              days={trip.days}
              date={new Date(trip.startDate).toLocaleDateString("en-GB")}
              isSample={trip.isSample}
              onView={() => navigate(`/trip/${trip._id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
