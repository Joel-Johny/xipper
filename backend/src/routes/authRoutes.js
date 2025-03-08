const express = require("express");
const {
  register,
  login,
  verifyUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", protect, verifyUser);
module.exports = router;
