const { extractFromDocument } = require("../services/extractionService");
const { groqGenerateItinerary } = require("../services/groqService");
const Itinerary = require("../models/Itinerary");

exports.uploadAndGenerate = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "No files uploaded" });

    console.log("Files uploaded:", req.files.map(f => ({ name: f.originalname, url: f.path })));

    // Extract from each uploaded document
    const extractions = await Promise.all(
      req.files.map((file) => extractFromDocument(file.path, file.mimetype))
    );

    console.log("Extractions:", JSON.stringify(extractions, null, 2));

    // Generate itinerary
    const raw = await groqGenerateItinerary(extractions);
    console.log("Raw AI response:", raw.substring(0, 200));

    // Parse JSON - strip markdown if present
    const clean = raw.replace(/```json|```/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (!match) return res.status(500).json({ message: "AI failed to generate valid itinerary" });
    
    const generated = JSON.parse(match[0]);

    const itinerary = await Itinerary.create({
      userId: req.user._id,
      title: generated.title || "My Trip",
      destination: generated.destination,
      startDate: generated.startDate,
      endDate: generated.endDate,
      travelers: generated.travelers || 1,
      sourceDocuments: req.files.map((f) => f.path),
      extractedData: extractions,
      days: generated.days || [],
      summary: generated.summary,
    });

    res.status(201).json({ itinerary });
  } catch (err) {
    console.error("Upload error:", err.response?.data || err.message);
    res.status(500).json({ message: err.response?.data?.error?.message || err.message });
  }
};