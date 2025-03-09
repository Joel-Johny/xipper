import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import HotelListings from "./pages/HotelListings";
import HotelDetail from "./pages/HotelDetails";
import BookingForm from "./pages/BookingForm";
import MyBookings from "./pages/MyBookings";
function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HotelListings />
                </PrivateRoute>
              }
            />
            <Route
              path="/hotels/:id"
              element={
                <PrivateRoute>
                  <HotelDetail />
                </PrivateRoute>
              }
            />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
