// src/components/HotelCard.jsx
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/hotels/${hotel.id}`)}
    >
      <div className="h-48 overflow-hidden">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{hotel.name}</h3>
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-yellow-500" />
            <span className="ml-1 text-gray-700">{hotel.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-1">{hotel.location}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {hotel.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-lg font-bold text-gray-900">₹{hotel.price}</p>
            <p className="text-sm text-gray-600">per night</p>
          </div>
          <button
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/book/${hotel.id}`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
