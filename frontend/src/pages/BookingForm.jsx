// src/pages/BookingForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../api";
const BookingForm = () => {
  // Get the hotel ID from the URL params
  const { hotelId } = useParams();
  const navigate = useNavigate();

  // State variables
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [roomType, setRoomType] = useState("");
  const [totalNights, setTotalNights] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  // Fetch hotel details when component loads
  useEffect(() => {
    fetchHotelDetail();
  }, [hotelId]);

  // Calculate total nights and amount when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const diffTime = Math.abs(checkOut - checkIn);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalNights(diffDays);

      if (hotel) {
        setTotalAmount(hotel.price * diffDays);
      }
    }
  }, [checkInDate, checkOutDate, hotel]);

  // Function to fetch hotel details
  const fetchHotelDetail = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`/hotel/hotelById/${hotelId}`);
      setHotel(response.data);

      // Set default room type to first available
      if (response.data.roomTypes.length > 0) {
        setRoomType(response.data.roomTypes[0]);
      }
    } catch (error) {
      console.error("Error fetching hotel details:", error);
      setError("Could not load hotel details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!checkInDate || !checkOutDate || !roomType) {
      setError("Please fill all required fields");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkIn < today) {
      setError("Check-in date cannot be in the past");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date");
      return;
    }

    try {
      setIsLoading(true);
      // Prepare booking data
      const bookingData = {
        hotelId,
        checkInDate,
        checkOutDate,
        roomType,
        numberOfGuests,
        totalAmount,
      };

      // Make API call to create booking
      const response = await API.post("/bookings/create", bookingData);

      // Navigate to bookings page on success
      navigate(`/bookings}`);
    } catch (error) {
      console.error("Error creating booking:", error);
      setError("Failed to create booking. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!hotel) return <div className="text-center py-10">Hotel not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(`/hotels/${hotelId}`)}
        className="flex items-center text-blue-600 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Hotel
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-blue-600">
          <h1 className="text-xl font-bold text-white">Book Your Stay</h1>
        </div>

        <div className="p-6">
          {/* Hotel name */}
          <h2 className="text-lg font-semibold mb-6">{hotel.name}</h2>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Date selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in Date*
                  </label>
                  <input
                    type="date"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out Date*
                  </label>
                  <input
                    type="date"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Room type and guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Type*
                  </label>
                  <select
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                    required
                  >
                    {hotel.roomTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Guests*
                  </label>
                  <select
                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={numberOfGuests}
                    onChange={(e) =>
                      setNumberOfGuests(parseInt(e.target.value))
                    }
                    required
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Price Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      ₹{hotel.price} x {totalNights} nights
                    </span>
                    <span className="font-medium">
                      ₹{hotel.price * totalNights}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-blue-600">
                      ₹{totalAmount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
