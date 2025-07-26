const express = require("express");
const router = express.Router();
const {
  checkCompatibility,
  getAllBloodTypes,
} = require("../controllers/bloodController");

// Check if a donor can give blood to a recipient
router.get("/compatibility/:donor/:recipient", checkCompatibility);

// Get all blood types (for dropdown in frontend)
router.get("/types", getAllBloodTypes);

module.exports = router;