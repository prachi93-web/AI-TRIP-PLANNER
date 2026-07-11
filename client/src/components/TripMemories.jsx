import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Camera, Trash2 } from "lucide-react";

const TripMemories = ({ trip, refreshTrip }) => {
  const fileInputRef = useRef();

  const [uploading, setUploading] = useState(false);

  const today = new Date();
  const tripDate = new Date(trip.startDate);

  const canUpload = today.setHours(0, 0, 0, 0) >= tripDate.setHours(0, 0, 0, 0);

  // Upload Photos
  const uploadPhotos = async (e) => {
    try {
      const files = Array.from(e.target.files);

      if (files.length === 0) return;

      setUploading(true);

      const formData = new FormData();

      formData.append("tripId", trip._id);

      files.forEach((file) => {
        formData.append("photos", file);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip/upload-photos`,
        formData,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        refreshTrip();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete Photo
  const deletePhoto = async (photoUrl) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/trip/delete-photo`,
        {
          tripId: trip._id,
          photoUrl,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        },
      );

      if (response.data.success) {
        toast.success(response.data.message);
        refreshTrip();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="mt-10 bg-white rounded-3xl border border-gray-200 shadow-sm p-7">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            📸 Trip Memories
            {!trip.isSample && (
              <span className="text-lg text-gray-500 font-medium">
                ({trip.photos?.length || 0})
              </span>
            )}
          </h2>

          <p className="text-gray-500 mt-1">
            Relive your moments from this trip.
          </p>
        </div>

        {!trip.isSample && canUpload && (
          <>
            <input
              hidden
              multiple
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={uploadPhotos}
            />

            <button
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl px-5 py-3 flex items-center gap-2 font-medium transition"
            >
              <Camera size={18} />

              {uploading ? "Uploading..." : "Add Photos"}
            </button>
          </>
        )}
      </div>

      {/* Sample */}

      {trip.isSample && (
        <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-200 py-12 text-center">
          <Camera className="mx-auto text-gray-400 mb-4" size={45} />

          <h3 className="text-xl font-semibold">Sample Trip</h3>

          <p className="text-gray-500 mt-2">
            Personal memories are available only for your own trips.
          </p>
        </div>
      )}

      {/* Before Trip Starts */}

      {!trip.isSample && !canUpload && (
        <div className="mt-8 rounded-2xl bg-purple-50 border border-purple-200 p-8 text-center">
          <div className="text-5xl mb-4">✈️</div>

          <h3 className="text-2xl font-bold">
            Your journey hasn't started yet
          </h3>

          <p className="text-gray-600 mt-3">
            You can start adding memories once your trip begins.
          </p>

          <div className="mt-5 inline-flex bg-white px-5 py-3 rounded-xl border border-purple-200 font-semibold text-purple-700">
            Trip starts on{" "}
            {new Date(trip.startDate).toLocaleDateString("en-GB")}
          </div>
        </div>
      )}

      {/* Empty */}

      {!trip.isSample && canUpload && (trip.photos?.length || 0) === 0 && (
        <div className="mt-10 text-center py-14">
          <Camera className="mx-auto text-purple-400 mb-5" size={55} />

          <h3 className="text-2xl font-semibold">No memories yet</h3>

          <p className="text-gray-500 mt-3">
            Upload your favorite travel moments.
          </p>
        </div>
      )}

      {/* Gallery */}

      {!trip.isSample && (trip.photos?.length || 0) > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
          {trip.photos.map((photo) => (
            <div
              key={photo}
              className="relative rounded-2xl overflow-hidden group"
            >
              <img
                src={photo}
                alt=""
                className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
              />

              <button
                onClick={() => deletePhoto(photo)}
                className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Card */}

      {!trip.isSample && (
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 p-6 flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-xl text-purple-700">
              💜 Keep your memories safe!
            </h3>

            <p className="text-gray-600 mt-2">
              You can add, view and delete your trip photos anytime.
            </p>
          </div>

          <div className="hidden md:block text-6xl">🖼️</div>
        </div>
      )}
    </div>
  );
};

export default TripMemories;
