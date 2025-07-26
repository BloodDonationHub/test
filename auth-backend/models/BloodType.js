const mongoose = require("mongoose");

const bloodTypeSchema = new mongoose.Schema({
  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  canDonateTo: [String], // List of compatible blood types
  canReceiveFrom: [String], // List of compatible blood types
});

module.exports = mongoose.model("BloodType", bloodTypeSchema);