import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 overflow-hidden">
      <div className="relative h-screen flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
            Page Not Found
          </h2>

          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div>
            <Link
              to="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
