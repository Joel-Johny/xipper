const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const hotelRoutes = require("./src/routes/hotelRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("Hotel Booking API is running");
});
app.post("/test-post", (req, res) => {
  res.send("POST request received");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
