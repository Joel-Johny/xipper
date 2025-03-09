import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HotelDetail from "./pages/HotelDetail";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
import CheckInForm from "./pages/CheckInForm";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hotels/:id" element={<HotelDetail />} />

              <Route
                path="/book/:hotelId"
                element={
                  <PrivateRoute>
                    <BookingForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bookings"
                element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/checkin/:bookingId"
                element={
                  <PrivateRoute>
                    <CheckInForm />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
