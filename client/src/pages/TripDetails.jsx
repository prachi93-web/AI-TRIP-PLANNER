import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import axios from "axios";
import { toast } from "react-toastify";

import {
  ArrowLeft,
  Trash2,
  Calendar,
  Clock,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  Lightbulb,
} from "lucide-react";

const TripDetails = () => {
  const { id } = useParams();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDay, setOpenDay] = useState(1);

  const getTripDetails = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip/tripDetails`,
        { id },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        setTrip(response.data.trip);
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
    getTripDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-gray-600">Loading trip details...</p>
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

      {/* Main */}

      <div className="lg:ml-64 pt-20 lg:pt-8 px-4 sm:px-6 lg:px-10 pb-8">
        {/* Header */}

        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <Link
            to="/my-trips"
            className="flex items-center gap-2 text-gray-700 hover:text-purple-700 font-medium"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition">
            <Trash2 size={17} />
            Delete Trip
          </button>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Card */}

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <img
                src={trip.image}
                alt={trip.destination}
                className="w-full h-64 object-cover rounded-xl"
              />

              <h1 className="text-3xl font-bold text-gray-900 mt-5">
                {trip.destination}
              </h1>

              <p className="text-gray-500 mt-2">{trip.aiPlan.summary}</p>

              <div className="flex flex-wrap gap-4 mt-5 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(trip.startDate).toLocaleDateString("en-GB")}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {trip.days} Days
                </div>

                <div className="flex items-center gap-1">
                  <IndianRupee size={16} />₹{trip.budget}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Interests</h3>

                <div className="flex flex-wrap gap-2">
                  {trip.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-purple-700">
                {trip.aiPlan.tripTitle}
              </h2>

              <p className="text-gray-500 mt-2 mb-6">
                {trip.aiPlan.bestTimeToVisit}
              </p>

              <div className="space-y-4">
                {trip.aiPlan.itinerary.map((item) => (
                  <div
                    key={item.day}
                    className="border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setOpenDay(openDay === item.day ? 0 : item.day)
                      }
                      className="w-full flex justify-between items-center px-5 py-4 hover:bg-gray-50 transition"
                    >
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">
                          Day {item.day}
                        </h3>
                      </div>

                      {openDay === item.day ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>

                    {openDay === item.day && (
                      <div className="px-5 pb-5 space-y-6">
                        {/* Morning */}

                        <div>
                          <h4 className="font-semibold text-purple-700">
                            🌅 Morning
                          </h4>

                          <p className="font-medium mt-2">
                            {item.morning.place}
                          </p>

                          <p className="text-gray-600 text-sm mt-1">
                            {item.morning.activity}
                          </p>

                          <p className="text-sm text-green-600 mt-2">
                            Approx Cost : ₹{item.morning.approximateCost}
                          </p>
                        </div>

                        {/* Afternoon */}

                        <div>
                          <h4 className="font-semibold text-orange-600">
                            ☀️ Afternoon
                          </h4>

                          <p className="font-medium mt-2">
                            {item.afternoon.place}
                          </p>

                          <p className="text-gray-600 text-sm mt-1">
                            {item.afternoon.activity}
                          </p>

                          <p className="text-sm text-green-600 mt-2">
                            Approx Cost : ₹{item.afternoon.approximateCost}
                          </p>
                        </div>

                        {/* Evening */}

                        <div>
                          <h4 className="font-semibold text-indigo-600">
                            🌙 Evening
                          </h4>

                          <p className="font-medium mt-2">
                            {item.evening.place}
                          </p>

                          <p className="text-gray-600 text-sm mt-1">
                            {item.evening.activity}
                          </p>

                          <p className="text-sm text-green-600 mt-2">
                            Approx Cost : ₹{item.evening.approximateCost}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Travel Tips */}

              <div className="mt-8 rounded-2xl bg-yellow-50 border border-yellow-200 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="text-yellow-600" size={20} />

                  <h3 className="font-semibold text-gray-800">Travel Tips</h3>
                </div>

                <ul className="text-sm text-gray-600 space-y-2 list-disc ml-5">
                  {trip.aiPlan.travelTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
