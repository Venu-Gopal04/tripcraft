const axios = require("axios");

const GROQ_BASE = "https://api.groq.com/openai/v1";

const groqVisionExtract = async (imageUrl) => {
  const response = await axios.post(
    `${GROQ_BASE}/chat/completions`,
    {
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
            {
              type: "text",
              text: `You are a travel document parser. Extract ALL relevant travel information from this document.
Return ONLY valid JSON with this structure:
{
  "documentType": "flight|hotel|train|bus|car_rental|other",
  "passengerName": "",
  "origin": "",
  "destination": "",
  "departureDate": "",
  "departureTime": "",
  "arrivalDate": "",
  "arrivalTime": "",
  "flightNumber": "",
  "trainNumber": "",
  "seatInfo": "",
  "hotelName": "",
  "checkIn": "",
  "checkOut": "",
  "roomType": "",
  "bookingReference": "",
  "additionalInfo": {}
}
Fill only what is present. Use null for missing fields.`,
            },
          ],
        },
      ],
      max_tokens: 1024,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].message.content;
};

const groqGenerateItinerary = async (extractedDataArray) => {
  const response = await axios.post(
    `${GROQ_BASE}/chat/completions`,
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an expert travel planner. Generate detailed, practical travel itineraries. Always respond with valid JSON only, no markdown, no extra text.`,
        },
        {
          role: "user",
          content: `Based on these travel booking details, generate a complete day-by-day itinerary:

${JSON.stringify(extractedDataArray, null, 2)}

Return ONLY valid JSON with this exact structure (no markdown):
{
  "title": "Trip title",
  "destination": "Main destination",
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "travelers": 1,
  "summary": "2-3 sentence trip overview",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "title": "Day theme",
      "activities": ["activity 1", "activity 2"],
      "meals": ["Breakfast suggestion", "Lunch suggestion", "Dinner suggestion"],
      "accommodation": "Hotel name or transit",
      "transport": "Flight/Train details",
      "tips": ["useful tip"]
    }
  ]
}`,
        },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.choices[0].message.content;
};

module.exports = { groqVisionExtract, groqGenerateItinerary };