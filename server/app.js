require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");

const app = express();
connectDB();
console.log("Routes loading...");  

app.use(cors({
  origin: "https://tripcraft-nu.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
  app.use("/api/auth", require("./src/routes/auth"));
  app.use("/api/upload", require("./src/routes/upload"));
  app.use("/api/itineraries", require("./src/routes/itinerary"));
  console.log("Routes loaded OK");
} catch(e) {
  console.error("Route load error:", e.message);
}

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));