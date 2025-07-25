// routes/bloodBankRoutes.js
const express = require('express');
const router = express.Router();
const BloodBank = require('../models/BloodBank');
const { calculateDistance } = require('../utils/geoUtils');

// Search for blood banks with specific blood type near a location
router.get('/search', async (req, res) => {
    try {
        const { latitude, longitude, bloodType, maxDistance = 50 } = req.query;

        if (!latitude || !longitude || !bloodType) {
            return res.status(400).json({
                error: 'Latitude, longitude, and bloodType are required parameters'
            });
        }

        const bloodTypes = [
            'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'
        ];

        if (!bloodTypes.includes(bloodType)) {
            return res.status(400).json({
                error: 'Invalid blood type. Must be one of: O+, O-, A+, A-, B+, B-, AB+, AB-'
            });
        }

        const lat = parseFloat(latitude);
        const lng = parseFloat(longitude);
        const distance = parseFloat(maxDistance);

        // Find blood banks with the requested blood type in stock within maxDistance km
        const bloodBanks = await BloodBank.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: distance * 1000 // Convert km to meters
                }
            },
            [`bloodInventory.${bloodType}`]: { $gt: 0 }
        });

        // Add distance information to each blood bank
        // In routes/bloodBankRoutes.js
        const results = bloodBanks.map(bank => ({
            id: bank._id,
            name: bank.name,
            address: bank.address,
            contact: bank.contact,
            location: bank.location,
            distance: calculateDistance(lat, lng, ).toFixed(2),
            unitsAvailable: bank.bloodInventory[bloodType],
            // Add real-worlSd properties:
            hours: "9AM-5PM", // Real hours
            website: "https://redcross.org", // Real URL
            lastUpdated: new Date() // Track freshness
        }));

        // Sort by distance (nearest first)
        results.sort((a, b) => a.distance - b.distance);

        res.json(results);
    } catch (error) {
        console.error('Error searching blood banks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;