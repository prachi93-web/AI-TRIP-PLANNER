import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
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

const trip = {
  destination: "Goa, India",
  image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  date: "12 Jun - 15 Jun 2026",
  days: 4,
  budget: "₹20,000",
  interests: ["Beaches", "Adventure", "Relaxation", "Food"],
  itinerary: [
    {
      day: 1,
      title: "Arrival in Goa",
      description:
        "Arrive in Goa, check-in at the hotel and relax at Baga Beach. Enjoy the sunset and local cuisine.",
    },
    {
      day: 2,
      title: "Water Sports",
      description:
        "Visit Fort Aguada, enjoy water sports, explore local markets and experience Goa's nightlife.",
    },
    {
      day: 3,
      title: "Sightseeing",
      description:
        "Visit Dudhsagar Falls, spice plantation and enjoy authentic Goan food.",
    },
    {
      day: 4,
      title: "Departure",
      description: "Morning at Anjuna Beach, shopping and departure.",
    },
  ],
};

const TripDetails = () => {
  const [openDay, setOpenDay] = useState(1);

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

        {/* Content */}

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

              <div className="flex flex-wrap gap-4 mt-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  {trip.date}
                </div>

                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  {trip.days} Days
                </div>

                <div className="flex items-center gap-1">
                  <IndianRupee size={16} />
                  {trip.budget}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Interests</h3>

                <div className="flex flex-wrap gap-2">
                  {trip.interests.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Card */}

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-bold text-purple-700 mb-5">
                ✨ AI Generated Plan
              </h2>

              <div className="space-y-4">
                {trip.itinerary.map((item) => (
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

                        <p className="text-sm text-gray-500 mt-1">
                          {item.title}
                        </p>
                      </div>

                      {openDay === item.day ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>

                    {openDay === item.day && (
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-7">
                        {item.description}
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
                  <li>Carry sunscreen and sunglasses.</li>
                  <li>Keep your original ID proofs.</li>
                  <li>Stay hydrated during sightseeing.</li>
                  <li>Carry some cash for local markets.</li>
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
