// src/pages/CheckInForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import API from "../api";
const CheckInForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [booking, setBooking] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([
    { name: "", aadhaarNumber: "" },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  const fetchBookingDetails = async () => {
    try {
      setIsLoading(true);
      const response = await API.get(`/bookings/getBookingById/${bookingId}`);
      setBooking(response.data);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      setError("Could not load booking details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: "", aadhaarNumber: "" }]);
  };

  const handleRemoveFamilyMember = (index) => {
    if (familyMembers.length > 1) {
      const newFamilyMembers = [...familyMembers];
      newFamilyMembers.splice(index, 1);
      setFamilyMembers(newFamilyMembers);
    }
  };

  const handleFamilyMemberChange = (index, field, value) => {
    const newFamilyMembers = [...familyMembers];
    newFamilyMembers[index][field] = value;
    setFamilyMembers(newFamilyMembers);
  };

  const validateAadhaar = (aadhaar) => {
    // Basic validation: 12 digits
    return /^\d{12}$/.test(aadhaar);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    let isValid = true;
    for (const member of familyMembers) {
      if (!member.name.trim() || !member.aadhaarNumber.trim()) {
        setError("Please fill in all fields for all family members");
        isValid = false;
        break;
      }

      if (!validateAadhaar(member.aadhaarNumber)) {
        setError("Aadhaar number must be 12 digits");
        isValid = false;
        break;
      }
    }

    if (!isValid) return;

    try {
      setIsLoading(true);

      await API.post(`/bookings/${bookingId}/checkin`, { familyMembers });

      navigate("/bookings");
    } catch (error) {
      console.error("Error during check-in:", error);
      setError("Failed to complete check-in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!booking)
    return <div className="text-center py-10">Booking not found</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate("/bookings")}
        className="flex items-center text-blue-600 mb-6"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Bookings
      </button>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-blue-600">
          <h1 className="text-xl font-bold text-white">Web Check-in</h1>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">{booking.hotel.name}</h2>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Check-in Date:</span>{" "}
                <span className="font-medium">
                  {new Date(booking.checkInDate).toLocaleDateString("en-IN")}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Room Type:</span>{" "}
                <span className="font-medium">{booking.roomType}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-medium mb-4">
              Family Members' Details
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Please provide Aadhaar details for all guests
            </p>

            <div className="space-y-4 mb-6">
              {familyMembers.map((member, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Person {index + 1}</h4>
                    {familyMembers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveFamilyMember(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        value={member.aadhaarNumber}
                        onChange={(e) =>
                          handleFamilyMemberChange(
                            index,
                            "aadhaarNumber",
                            e.target.value
                          )
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="12 digit Aadhaar number"
                        maxLength={12}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <button
                type="button"
                onClick={handleAddFamilyMember}
                className="flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
              >
                <UserPlusIcon className="h-5 w-5 mr-1" />
                Add Family Member
              </button>

              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Complete Check-in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckInForm;
