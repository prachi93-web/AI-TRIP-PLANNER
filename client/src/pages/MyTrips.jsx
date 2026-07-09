import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import axios from "axios";
import { toast } from "react-toastify";
import { Calendar, Clock, IndianRupee, Plus, Trash2 } from "lucide-react";

const MyTrips = () => {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const deleteTrip = async (id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip/delete`,
        {
          id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Refresh the list
        getTrips();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getTrips();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600">Loading your trips...</p>
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
        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-5 sm:p-8">
          {/* Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Trips
              </h1>

              <p className="text-gray-500 mt-1">View all your saved trips</p>
            </div>

            <Link
              to="/create-trip"
              className="inline-flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-xl font-medium transition"
            >
              <Plus size={18} />
              Create New Trip
            </Link>
          </div>

          {/* Trips */}

          <div className="mt-6 space-y-5">
            {trips.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-semibold">No Trips Found</h2>

                <p className="text-gray-500 mt-2">Create your first AI trip.</p>
              </div>
            ) : (
              trips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white border border-purple-100 rounded-2xl shadow-sm p-4 sm:p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                    {/* Left */}

                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      <img
                        src={trip.image}
                        alt={trip.destination}
                        className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                          {trip.destination}
                        </h2>

                        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                          <Calendar size={15} />
                          {new Date(trip.startDate).toLocaleDateString("en-GB")}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-gray-600 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock size={15} />
                            {trip.days} Days
                          </div>

                          <div className="flex items-center gap-1">
                            <IndianRupee size={15} />₹{trip.budget}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Buttons */}

                    <div className="flex gap-3 w-full md:w-auto">
                      <button
                        onClick={() => navigate(`/trip/${trip._id}`)}
                        className="flex-1 md:flex-none px-6 h-10 rounded-xl border border-purple-300 text-purple-700 hover:bg-purple-50 transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() => deleteTrip(trip._id)}
                        className="w-10 h-10 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
