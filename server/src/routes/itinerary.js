const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getMyItineraries,
  getItineraryById,
  getSharedItinerary,
  deleteItinerary,
} = require("../controllers/itineraryController");

router.get("/", protect, getMyItineraries);
router.get("/shared/:token", getSharedItinerary);  // public route
router.get("/:id", protect, getItineraryById);
router.delete("/:id", protect, deleteItinerary);

module.exports = router;