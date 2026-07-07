import React from "react";
import { CalendarDays } from "lucide-react";

const TripCard = ({ image, destination, days, date }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition duration-300 max-w-[35rem] w-full">
      <img src={image} alt={destination} className="w-full h-48 object-cover" />

      <div className="p-5">
        <h2 className="text-xl font-semibold">{destination}</h2>

        <p className="text-gray-500 mt-1">{days} Days Trip</p>

        <div className="flex items-center gap-2 text-gray-500 mt-5">
          <CalendarDays size={16} />

          {date}
        </div>

        <button className="mt-5 w-full bg-purple-100 hover:bg-purple-700 hover:text-white transition py-2 rounded-lg font-medium text-purple-700">
          View Trip
        </button>
      </div>
    </div>
  );
};

export default TripCard;
