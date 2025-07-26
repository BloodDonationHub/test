const BloodType = require("../models/BloodType");

// Check if donor blood is compatible with recipient
exports.checkCompatibility = async (req, res) => {
  const { donor, recipient } = req.params;

  try {
    const donorData = await BloodType.findOne({ bloodGroup: donor });
    if (!donorData) {
      return res.status(404).json({ error: "Invalid donor blood type" });
    }

    const isCompatible = donorData.canDonateTo.includes(recipient);
    res.json({ donor, recipient, isCompatible });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get all blood types (for frontend dropdown)
exports.getAllBloodTypes = async (req, res) => {
  try {
    const bloodTypes = await BloodType.find({}, "bloodGroup");
    res.json(bloodTypes.map((bt) => bt.bloodGroup));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};