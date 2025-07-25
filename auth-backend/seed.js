require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blood_match_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Import models
const BloodType = require('./models/BloodType');
const BloodBank = require('./models/BloodBank');

// Blood Type Data
const bloodTypes = [
  {
    bloodGroup: "O-",
    canDonateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-"],
    description: "Universal donor (can donate to any blood type)"
  },
  {
    bloodGroup: "O+",
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O-", "O+"],
    description: "Can donate to O+, A+, B+, AB+"
  },
  {
    bloodGroup: "A-",
    canDonateTo: ["A-", "A+", "AB-", "AB+"],
    canReceiveFrom: ["O-", "A-"],
    description: "Can donate to A+, A-, AB+, AB-"
  },
  {
    bloodGroup: "A+",
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["O-", "O+", "A-", "A+"],
    description: "Can donate to A+, AB+"
  },
  {
    bloodGroup: "B-",
    canDonateTo: ["B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-", "B-"],
    description: "Can donate to B+, B-, AB+, AB-"
  },
  {
    bloodGroup: "B+",
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["O-", "O+", "B-", "B+"],
    description: "Can donate to B+, AB+"
  },
  {
    bloodGroup: "AB-",
    canDonateTo: ["AB-", "AB+"],
    canReceiveFrom: ["O-", "A-", "B-", "AB-"],
    description: "Can donate to AB+, AB-"
  },
  {
    bloodGroup: "AB+",
    canDonateTo: ["AB+"],
    canReceiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    description: "Universal recipient (can receive from any blood type)"
  }
];

// Blood Bank Data
const bloodBanks = [
  {
    name: "Nepal Red Cross Society, Bhaktapur Branch",
    location: {
      type: "Point",
      coordinates: [85.42232821529674, 27.67241562185881]
    },
    address: "Bhaktapur Municipality-10, Nepal",
    contact: "016611661",
    bloodInventory: {
      'O+': 14,
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
    name: "Civil Service Hospital of Nepal",
    location: {
      type: "Point",
      coordinates: [85.3387996870091, 27.686429396977587]
    },
    address: "Minbhawan Marg, Kathmandu 44600",
    contact: "014107000",
    bloodInventory: {
      'O+': 18,
      'O-': 4,
      'A+': 12,
      'A-': 0,
      'B+': 15,
      'B-': 2,
      'AB+': 8,
      'AB-': 1
    }
  },
  {
    name: "Bhaktapur Hospital",
    location: {
      type: "Point",
      coordinates: [85.42202526323616, 27.671922660908553]
    },
    address: "Doodhpati, Bhaktapur",
    contact: "016610798",
    bloodInventory: {
      'O+': 9,
      'O-': 5,
      'A+': 14,
      'A-': 2,
      'B+': 18,
      'B-': 3,
      'AB+': 6,
      'AB-': 0
    }
  },
  {
    name: "मदरल्याण्ड हस्पिटल प्रा. लि",
    location: {
      type: "Point",
      coordinates: [85.35985293253538, 27.68939773253168]
    },
    address: "Bhaktapur Road, Kathmandu 44600",
    contact: "014992788",
    bloodInventory: {
      'O+': 4,
      'O-': 5,
      'A+': 14,
      'A-': 2,
      'B+': 0,
      'B-': 3,
      'AB+': 0,
      'AB-': 1
    }
  },
  {
    name: "Everest Hospital Pvt. Ltd.",
    location: {
      type: "Point",
      coordinates: [85.33281290710842, 27.688550560262925]
    },
    address: "Kathmandu 44600",
    contact: "014793024",
    bloodInventory: {
      'O+': 0,
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
      coordinates: [85.38798382179867, 27.6725942430451]
    },
    address: "Thimi, Bhaktapur",
    contact: "+977 981-0105711",
    bloodInventory: {
      'O+': 0,
      'O-': 0,
      'A+': 14,
      'A-': 2,
      'B+': 18,
      'B-': 3,
      'AB+': 0,
      'AB-': 0
    }
  },
  {
    name: "Korea Nepal Friendship Hospital, Bhaktapur",
    location: {
      type: "Point",
      coordinates: [85.38374386247705, 27.67864708178822]
    },
    address: "Thimi, Bhaktapur",
    contact: "016633442",
    bloodInventory: {
      'O+': 7,
      'O-': 0,
      'A+': 0,
      'A-': 0,
      'B+': 0,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "KMC Hospital - Duwakot",
    location: {
      type: "Point",
      coordinates: [85.43262189831094, 27.668541914508772]
    },
    address: "Changunarayan Rd, Bhaktapur 44800",
    contact: "016618007",
    bloodInventory: {
      'O+': 12,
      'O-': 0,
      'A+': 14,
      'A-': 0,
      'B+': 0,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Bhaktapur Cancer Hospital",
    location: {
      type: "Point",
      coordinates: [85.42229984258873, 27.673439943828324]
    },
    address: "MCFC+7W8 cancer hospital, Bhaktapur 44800",
    contact: "not available",
    bloodInventory: {
      'O+': 8,
      'O-': 0,
      'A+': 0,
      'A-': 0,
      'B+': 0,
      'B-': 3,
      'AB+': 0,
      'AB-': 1
    }
  },
  {
    name: "KMC Hospital - Duwakot",
    location: {
      type: "Point",
      coordinates: [85.36647792489445, 27.67493810971918]
    },
    address: "Changunarayan Rd, Bhaktapur 44800",
    contact: "016637171",
    bloodInventory: {
      'O+': 12,
      'O-': 0,
      'A+': 0,
      'A-': 2,
      'B+': 0,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Bhaktapur Model Hospital",
    location: {
      type: "Point",
      coordinates: [85.36188693322383, 27.67438809316802]
    },
    address: "M9F6+PQP, Araniko Highway, Madhyapur Thimi 44800",
    contact: "015924640",
    bloodInventory: {
      'O+': 12,
      'O-': 0,
      'A+': 0,
      'A-': 2,
      'B+': 0,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Aarogya Multispeciality Hospital",
    location: {
      type: "Point",
      coordinates: [85.37805443095232, 27.67203618825906]
    },
    address: "M9CH+G47, Sundarnagar, 44600, Madhyapur Thimi 44600",
    contact: "016637137",
    bloodInventory: {
      'O+': 2,
      'O-': 0,
      'A+': 14,
      'A-': 2,
      'B+': 0,
      'B-': 3,
      'AB+': 0,
      'AB-': 0
    }
  },
  {
    name: "MED VALLEY MULTISPECIALITY HOSPITAL",
    location: {
      type: "Point",
      coordinates: [85.40803771189793, 27.67717465740435]
    },
    address: "MCG5+M73, Bhaktapur Road, Bhaktapur 44800",
    contact: "9849088733",
    bloodInventory: {
      'O+': 15,
      'O-': 0,
      'A+': 14,
      'A-': 2,
      'B+': 0,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Human Organ Transplant Centre (Shahid Dharma Bhakta Hospital)",
    location: {
      type: "Point",
      coordinates: [85.42190960026143, 27.67303764803329]
    },
    address: "Bhaktapur Hospital & Human Organ Transplant Centre, Bhaktapur 44800",
    contact: "016614709",
    bloodInventory: {
      'O+': 6,
      'O-': 0,
      'A+': 0,
      'A-': 2,
      'B+': 18,
      'B-': 3,
      'AB+': 0,
      'AB-': 1
    }
  },
  {
    name: "Khwopa Hospital",
    location: {
      type: "Point",
      coordinates: [85.43901628491605, 27.674527550088456]
    },
    address: "MCCQ+P67, Chyamhasingha Bhaktapur Minicipality ward-9, Garud Kundal Road, Bhaktapur 44800",
    contact: "016610317",
    bloodInventory: {
      'O+': 6,
      'O-': 0,
      'A+': 14,
      'A-': 0,
      'B+': 18,
      'B-': 3,
      'AB+': 6,
      'AB-': 1
    }
  },
  {
    name: "Dr. Iwamura Memorial Hospital (DRIM HOSPITAL)",
    location: {
      type: "Point",
      coordinates: [85.41181905002449, 27.672561971327948]
    },
    address: "Kamalbinayak, Bhaktapur",
    contact: "016612705",
    bloodInventory: {
      'O+': 10,
      'O-': 0,
      'A+': 8,
      'A-': 1,
      'B+': 1,
      'B-': 2,
      'AB+': 4,
      'AB-': 0
    }
  }
];

async function seedDatabase() {
  try {
    // Clear existing data
    await BloodType.deleteMany({});
    await BloodBank.deleteMany({});

    // Insert new data
    await BloodType.insertMany(bloodTypes);
    await BloodBank.insertMany(bloodBanks);

    console.log('Database seeded successfully with blood types and blood banks');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();