// src/controllers/hotelController.js
const prisma = require("../lib/prisma");

// Get all hotels
const getAllHotels = async (req, res) => {
  try {
    const hotels = await prisma.hotel.findMany();
    res.status(200).json(hotels);
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ message: "Server error while fetching hotels" });
  }
};

// Get hotel by ID
const getHotelById = async (req, res) => {
  try {
    const { id } = req.params;

    const hotel = await prisma.hotel.findUnique({
      where: { id: parseInt(id) },
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error("Error fetching hotel:", error);
    res.status(500).json({ message: "Server error while fetching hotel" });
  }
};

module.exports = {
  getAllHotels,
  getHotelById,
};
