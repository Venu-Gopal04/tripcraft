const Itinerary = require("../models/Itinerary");

exports.getMyItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .select("-extractedData");
    res.json({ itineraries });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!itinerary) return res.status(404).json({ message: "Not found" });
    res.json({ itinerary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSharedItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      shareToken: req.params.token,
      isPublic: true,
    }).select("-extractedData -userId");
    if (!itinerary) return res.status(404).json({ message: "Itinerary not found or not public" });
    res.json({ itinerary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItinerary = async (req, res) => {
  try {
    await Itinerary.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};