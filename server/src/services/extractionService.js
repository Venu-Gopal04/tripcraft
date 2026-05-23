const { groqVisionExtract } = require("./groqService");

const parseJSON = (text) => {
  try {
    const match = text.match(/\{[\s\S]*\}/);
    return match ? JSON.parse(match[0]) : null;
  } catch {
    return null;
  }
};

const extractFromDocument = async (fileUrl, mimeType) => {
  // For PDFs uploaded to Cloudinary, they get a URL we can pass to vision
  // For images, pass directly
  try {
    const raw = await groqVisionExtract(fileUrl);
    return parseJSON(raw) || { raw, fileUrl };
  } catch (err) {
    console.error("Extraction error:", err.response?.data || err.message);
    // Return basic info so itinerary generation can still proceed
    return { documentType: "other", fileUrl, error: err.message };
  }
};

module.exports = { extractFromDocument };