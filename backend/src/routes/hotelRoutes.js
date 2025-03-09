// src/routes/hotelRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getAllHotels,
  getHotelById,
} = require("../controllers/hotelController");

// Get all hotels
router.get("/getAllHotels", protect, getAllHotels);

// Get hotel by ID
router.get("/hotelById/:id", getHotelById);

module.exports = router;
