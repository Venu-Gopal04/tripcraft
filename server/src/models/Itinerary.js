const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const daySchema = new mongoose.Schema({
  day: Number,
  date: String,
  title: String,
  activities: [String],
  meals: [String],
  accommodation: String,
  transport: String,
  tips: [String],
});

const itinerarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  destination: String,
  startDate: String,
  endDate: String,
  travelers: { type: Number, default: 1 },
  sourceDocuments: [String],  // Cloudinary URLs
  extractedData: { type: Object },
  days: [daySchema],
  summary: String,
  shareToken: { type: String, default: uuidv4, unique: true },
  isPublic: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Itinerary", itinerarySchema);