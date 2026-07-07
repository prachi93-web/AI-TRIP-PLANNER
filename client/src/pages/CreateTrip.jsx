import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MobileNavbar from "../components/MobileNavbar";
import { Sparkles, Calendar, ChevronDown } from "lucide-react";

const interestOptions = [
  "Beaches",
  "Adventure",
  "Culture",
  "Food",
  "Mountains",
  "Nature",
  "Shopping",
  "Wildlife",
];

const CreateTrip = () => {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    startDate: "",
  });

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addInterest = (interest) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const removeInterest = (interest) => {
    setSelectedInterests(
      selectedInterests.filter((item) => item !== interest)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      ...formData,
      interests: selectedInterests,
    });

    // Call Generate Trip API here
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        <MobileNavbar />
      </div>

      {/* Main Content */}
      <div className="flex-1 pt-20 lg:pt-8 px-4 sm:px-6 lg:px-10 pb-8">
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-7 lg:p-10">
          {/* Heading */}

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Create New Trip
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Fill in the details and let AI plan your perfect trip.
          </p>

          {/* Form */}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Row 1 */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {/* Destination */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>

                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. Goa, Manali, Bali"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-purple-600"
                />
              </div>

              {/* Days */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Days
                </label>

                <input
                  type="number"
                  name="days"
                  value={formData.days}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-purple-600"
                />
              </div>
            </div>

            {/* Row 2 */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {/* Budget */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget (INR)
                </label>

                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="e.g. 20000"
                  className="w-full h-12 px-4 rounded-xl border border-gray-300 outline-none focus:border-purple-600"
                />
              </div>

              {/* Start Date */}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-gray-300 outline-none focus:border-purple-600"
                  />
                </div>
              </div>
            </div>

            {/* Interests */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests
              </label>

              <div className="relative">
                <div
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="min-h-14 border border-gray-300 rounded-xl p-3 flex flex-wrap gap-2 items-center cursor-pointer"
                >
                  {selectedInterests.length === 0 ? (
                    <span className="text-gray-400 text-sm">
                      Select Interests
                    </span>
                  ) : (
                    selectedInterests.map((interest) => (
                      <div
                        key={interest}
                        className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {interest}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeInterest(interest);
                          }}
                          className="font-bold hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}

                  <ChevronDown
                    size={18}
                    className={`ml-auto text-gray-500 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {showDropdown && (
                  <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-56 overflow-y-auto">
                    {interestOptions.map((interest) => (
                      <div
                        key={interest}
                        onClick={() => addInterest(interest)}
                        className={`px-4 py-3 cursor-pointer transition ${
                          selectedInterests.includes(interest)
                            ? "bg-purple-50 text-purple-700 font-medium"
                            : "hover:bg-purple-50"
                        }`}
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Button */}

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-purple-700 hover:bg-purple-800 transition text-white font-semibold flex items-center justify-center gap-2 shadow-md"
            >
              <Sparkles size={18} />
              Generate Trip Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;