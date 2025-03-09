// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import HotelCard from "../components/HotelCard";
import API from "../api";
export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch hotels data
  useEffect(() => {
    fetchHotels();
  }, []);
  const fetchHotels = async () => {
    try {
      setIsLoading(true);
      const response = await API.get("/hotel/getAllHotels");
      setHotels(response.data);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && <LoadingSpinner />}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome user */}
        <h3 className="text-xl font-bold text-blue-600 mb-8">
          Welcome, {user?.name || "Guest"}!
        </h3>

        {/* Hotels List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Available Hotels
          </h2>

          {hotels.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center flex flex-col items-center justify-center">
              <div className="text-center">
                <p className="text-xl text-gray-600 mb-4">
                  No hotels found matching your search
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
