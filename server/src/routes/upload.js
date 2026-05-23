const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { protect } = require("../middleware/auth");
const { uploadAndGenerate } = require("../controllers/uploadController");

router.post("/", protect, upload.array("documents", 10), uploadAndGenerate);

module.exports = router;