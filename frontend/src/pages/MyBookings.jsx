// src/pages/MyBookings.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../api";
const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);

      const response = await API.get("/bookings/user");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Failed to load your bookings. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-xl text-gray-600 mb-4">
            You don't have any bookings yet
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Browse Hotels
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 md:mb-0">
                    {booking.hotel.name}
                  </h2>
                  <div
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium 
                    {booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' : 
                     booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : 
                     'bg-yellow-100 text-yellow-800'}"
                  >
                    {booking.status}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">
                      {formatDate(booking.checkInDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">
                      {formatDate(booking.checkOutDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room Type</p>
                    <p className="font-medium">{booking.roomType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{booking.numberOfGuests}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold text-blue-600">
                      ₹{booking.totalAmount}
                    </p>
                  </div>

                  {booking.status === "CONFIRMED" && !booking.isCheckedIn ? (
                    <button
                      onClick={() => navigate(`/checkin/${booking.id}`)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Web Check-in
                    </button>
                  ) : booking.isCheckedIn ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-green-700 font-medium mb-1">
                        Checked In
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.checkIn?.familyMembers.length} family members
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* Display family members if checked in */}
                {booking.isCheckedIn && booking.checkIn && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="font-medium mb-2">Family Members</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {booking.checkIn.familyMembers.map((member, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded">
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">
                            Aadhaar: {member.aadhaarNumber.substring(0, 4)}...
                            {member.aadhaarNumber.substring(8)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
