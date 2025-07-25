// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const BloodBank = require('./models/BloodBank');

const bloodBanks = [
  {
    name: "Nepal Red Cross Society, Bhaktapur Branch",
    location: {
      type: "Point",
      coordinates: [85.4223014365304,27.672755363127987] // Approximate coordinates of Bhaktapur Red Cross
    },
    address: "Bhaktapur Municipality-10, Nepal",
    contact: "016611661",
    bloodInventory: {
      'O+': 18,
      'O-': 4,
      'A+': 12,
      'A-': 3,
      'B+': 15,
      'B-': 2,
      'AB+': 8,
      'AB-': 1
    }
  },
  {
    name: "Bhaktapur Hospital Blood Bank",
    location: {
      type: "Point",
      coordinates: [85.4220, 27.6720] // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Dekocha, Bhaktapur",
    contact: "016610798",
    bloodInventory: {
      'O+': 22,
      'O-': 5,
      'A+': 14,
      'A-': 2,
      'B+': 18,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Madhyapur Thimi Hospital Blood Bank",
    location: {
      type: "Point",
      coordinates:  [85.38798382179867,27.6725942430451]// Approximate coordinates of Bhaktapur Hospital
    },
    address: "Thimi, Bhaktapur",
    contact: "+977 981-0105711",
    bloodInventory: {
      'O+': 22,
      'O-': 5,
      'A+': 14,
      'A-': 2,
      'B+': 18,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Korea Nepal Friendship Hospital, Bhaktapur",
    location: {
      type: "Point",
      coordinates:  [85.38374386247705,27.67864708178822] // Approximate coordinates of Bhaktapur Hospital
    },
    address: "Thimi, Bhaktapur",
    contact: "+977 981-0105711",
    bloodInventory: {
      'O+': 22,
      'O-': 5,
      'A+': 14,
      'A-': 2,
      'B+': 18,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Golden Hospital Blood Bank",
    location: {
      type: "Point",
      coordinates: [85.4215, 27.6708] // Approximate coordinates in Bhaktapur
    },
    address: "Kamalbinayak, Bhaktapur",
    contact: "+977-1-6635678",
    bloodInventory: {
      'O+': 10,
      'O-': 2,
      'A+': 8,
      'A-': 1,
      'B+': 12,
      'B-': 2,
      'AB+': 4,
      'AB-': 0
    }
  }
  // Note: Inventory numbers are illustrative - real-time data would require API connection
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bloodDonationDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await BloodBank.deleteMany({});
    await BloodBank.insertMany(bloodBanks);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();