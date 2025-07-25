// controllers/bloodBankController.js
const User = require("../models/User");

async function findNearestBloodBanks(userCoords, maxDistance = 50) {
  const bloodBanks = await User.find({
    role: "bloodbank",
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: userCoords, // [longitude, latitude]
        },
        $maxDistance: maxDistance * 1000, // Convert km to meters
      },
    },
  });
  return bloodBanks;
}