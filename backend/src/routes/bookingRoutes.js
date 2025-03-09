// src/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createBooking,
  getUserBookings,
  getBookingById,
} = require("../controllers/bookingController");

// All booking routes require authentication
router.use(protect);

// Create a new booking
router.post("/create", protect, createBooking);

// Get user's bookings
router.get("/user", protect, getUserBookings);

// Get booking by ID
router.get("/getBookingById/:id", protect, getBookingById);

module.exports = router;
