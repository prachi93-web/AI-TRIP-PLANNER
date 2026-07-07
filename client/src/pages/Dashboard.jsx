import React from "react";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import TripCard from "../components/TripCard";
import { Briefcase, MapPinned, CalendarDays, Bookmark } from "lucide-react";

const Dashboard = () => {
  const userName = "Prachi";

  const initials = userName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

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
              Welcome back, {userName} 👋
            </p>
          </div>

          {/* Desktop Avatar */}

          <div className="hidden lg:flex w-12 h-12 rounded-full bg-purple-700 text-white items-center justify-center text-xl font-semibold shadow-md">
            {initials}
          </div>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mt-8">
          {/* Card 1 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-purple-100 flex items-center justify-center">
              <Briefcase className="text-purple-700" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Total Trips</p>

              <h2 className="text-xl lg:text-3xl font-bold">5</h2>
            </div>
          </div>

          {/* Card 2 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-green-100 flex items-center justify-center">
              <MapPinned className="text-green-600" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Places Visited</p>

              <h2 className="text-xl lg:text-3xl font-bold">3</h2>
            </div>
          </div>

          {/* Card 3 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-orange-100 flex items-center justify-center">
              <CalendarDays className="text-orange-600" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Days Planned</p>

              <h2 className="text-xl lg:text-3xl font-bold">18</h2>
            </div>
          </div>

          {/* Card 4 */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-5 flex items-center gap-3 lg:gap-5">
            <div className="w-11 h-11 lg:w-14 lg:h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <Bookmark className="text-blue-600" size={22} />
            </div>

            <div>
              <p className="text-xs lg:text-sm text-gray-500">Upcoming Trips</p>

              <h2 className="text-xl lg:text-3xl font-bold">2</h2>
            </div>
          </div>
        </div>

        {/* Upcoming Trips */}

        <div className="flex justify-between items-center mt-10 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Upcoming Trips</h2>

          <button className="text-purple-700 text-sm font-medium hover:underline">
            View All
          </button>
        </div>

        {/* Trip Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
