// src/pages/HotelDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import { CheckIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import API from "../api";

const HotelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("Hotel Details");
  useEffect(() => {
    fetchHotelDetail();
  }, [id]);

  const fetchHotelDetail = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`/hotel/hotelById/${id}`);
      setHotel(response.data);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!token) {
      navigate("/login", { state: { redirectTo: `/book/${id}` } });
    } else {
      navigate(`/book/${id}`);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!hotel) return <div className="text-center py-10">Hotel not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/")}
        className="flex items-center text-blue-600 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Hotels
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="h-72 overflow-hidden">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{hotel.name}</h1>
            <div className="flex items-center">
              <StarIcon className="h-5 w-5 text-yellow-500" />
              <span className="ml-1 text-lg">{hotel.rating}/5</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{hotel.location}</p>

          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-700">{hotel.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">
              Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hotel.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4 text-blue-600">
              Room Types
            </h2>
            <div className="flex flex-wrap gap-2">
              {hotel.roomTypes.map((roomType, index) => (
                <div
                  key={index}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {roomType}
                </div>
              ))}
            </div>
          </div>

          {/* Price and Booking */}
          <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <p className="text-lg text-gray-700">Price</p>
              <p className="text-3xl font-bold text-blue-600">₹{hotel.price}</p>
              <p className="text-sm text-gray-600">per night</p>
            </div>

            <button
              onClick={handleBookNow}
              className="px-6 py-3 bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
