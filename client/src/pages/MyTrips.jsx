import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import { Calendar, Clock, IndianRupee, Plus, Trash2 } from "lucide-react";

const trips = [
  {
    id: 1,
    destination: "Goa, India",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    date: "12 Jun - 15 Jun 2026",
    days: 4,
    budget: "₹20,000",
  },
  {
    id: 2,
    destination: "Manali, India",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    date: "20 Jun - 24 Jun 2026",
    days: 5,
    budget: "₹25,000",
  },
  {
    id: 3,
    destination: "Jaipur, India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
    date: "10 Jul - 13 Jul 2026",
    days: 3,
    budget: "₹15,000",
  },
];

const MyTrips = () => {
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
            {trips.map((trip) => (
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
                        {trip.date}
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3 text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock size={15} />
                          {trip.days} Days
                        </div>

                        <div className="flex items-center gap-1">
                          <IndianRupee size={15} />
                          {trip.budget}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}

                  <div className="flex gap-3 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-6 h-10 rounded-xl border border-purple-300 text-purple-700 hover:bg-purple-50 transition">
                      View
                    </button>

                    <button className="w-10 h-10 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition flex items-center justify-center">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
