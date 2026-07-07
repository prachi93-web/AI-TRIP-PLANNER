import React from "react";
import Sidebar from "../components/Sidebar";
import TripCard from "../components/TripCard";
import { Briefcase, MapPinned, CalendarDays, Bookmark } from "lucide-react";

const Dashboard = () => {
  // Later this will come from API
  const userName = "Prachi";

  // Generate initials
  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex-1 px-6 lg:px-10 py-8">
        {/* Header */}

        <div className="flex justify-between items-center flex-wrap gap-5">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>

            <p className="text-gray-500 mt-2 text-lg">
              Welcome back, {userName} 👋
            </p>
          </div>

          {/* Avatar */}

          <div className="w-12 h-12 rounded-full bg-purple-700 text-white flex items-center justify-center text-xl font-semibold shadow-md">
            {initials}
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">
          {/* Card 1 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
              <Briefcase className="text-purple-700" size={26} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Total Trips</p>

              <h2 className="text-3xl font-bold">5</h2>
            </div>
          </div>

          {/* Card 2 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <MapPinned className="text-green-600" size={26} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Places Visited</p>

              <h2 className="text-3xl font-bold">3</h2>
            </div>
          </div>

          {/* Card 3 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">
              <CalendarDays className="text-orange-600" size={26} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Days Planned</p>

              <h2 className="text-3xl font-bold">18</h2>
            </div>
          </div>

          {/* Card 4 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Bookmark className="text-blue-600" size={26} />
            </div>

            <div>
              <p className="text-gray-500 text-sm">Upcoming Trips</p>

              <h2 className="text-3xl font-bold">2</h2>
            </div>
          </div>
        </div>

        {/* Upcoming Trips */}

        <div className="flex justify-between items-center mt-12 mb-6 flex-wrap gap-4">
          <h2 className="text-2xl font-bold">Upcoming Trips</h2>

          <button className="text-purple-700 font-medium hover:underline">
            View All
          </button>
        </div>

        {/* Trip Cards */}

        <div className="grid md:grid-cols-2 gap-8">
          <TripCard
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            destination="Goa, India"
            days={4}
            date="12 Jun - 15 Jun 2026"
          />

          <TripCard
            image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
            destination="Manali, India"
            days={5}
            date="20 Jun - 24 Jun 2026"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
