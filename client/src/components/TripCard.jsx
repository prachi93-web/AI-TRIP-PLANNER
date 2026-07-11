import React from "react";
import { CalendarDays, Clock } from "lucide-react";

const TripCard = ({ image, destination, days, date, onView, isSample }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition overflow-hidden">
      {/* Image */}

      <div className="relative">
        <img src={image} alt={destination} className="w-full h-56 lg:h-64 object-cover object-center"/>

        {isSample && (
          <span className="absolute top-3 right-3 bg-white text-purple-700 border border-purple-800 text-xs font-semibold px-3 py-1 rounded-sm shadow-sm">Sample</span>
        )}
      </div>

      {/* Content */}

      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-900">{destination}</h2>

        <div className="flex items-center gap-5 mt-4 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{days} Days</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>{date}</span>
          </div>
        </div>

        <button
          onClick={onView}
          className="mt-6 w-full h-11 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-medium transition"
        >
          View Trip
        </button>
      </div>
    </div>
  );
};

export default TripCard;
