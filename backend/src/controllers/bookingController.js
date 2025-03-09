// src/controllers/bookingController.js
const prisma = require("../lib/prisma");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      hotelId,
      checkInDate,
      checkOutDate,
      roomType,
      numberOfGuests,
      totalAmount,
    } = req.body;

    // Validate request body
    if (
      !hotelId ||
      !checkInDate ||
      !checkOutDate ||
      !roomType ||
      !numberOfGuests ||
      !totalAmount
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required booking details" });
    }

    // Check if hotel exists
    const hotel = await prisma.hotel.findUnique({
      where: { id: parseInt(hotelId) },
    });

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        hotelId: parseInt(hotelId),
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        roomType,
        numberOfGuests: parseInt(numberOfGuests),
        totalAmount: parseFloat(totalAmount),
        status: "CONFIRMED",
        isCheckedIn: false,
      },
      include: {
        hotel: true,
      },
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ message: "Server error during booking creation" });
  }
};

// Get user's bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        hotel: true,
        checkIn: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Server error while fetching bookings" });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(id) },
      include: {
        hotel: true,
        checkIn: true,
      },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if booking belongs to user
    if (booking.userId !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this booking" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error while fetching booking" });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
};
