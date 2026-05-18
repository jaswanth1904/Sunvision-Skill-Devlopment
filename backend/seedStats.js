const mongoose = require('mongoose');
const Stat = require('./models/Stat');
require('dotenv').config();

const defaultStats = [
  { label: "Students Reached", value: 1200, suffix: "+", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Candidates Trained", value: 200, suffix: "+", color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Successful Placements", value: 180, suffix: "+", color: "text-teal-500", bg: "bg-teal-50" },
  { label: "Expert Trainers", value: 15, suffix: "+", color: "text-purple-500", bg: "bg-purple-50" },
];

const seedStats = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding stats...');

    const count = await Stat.countDocuments();
    if (count > 0) {
      console.log('Stats already exist. Skipping seed.');
      process.exit();
    }

    await Stat.insertMany(defaultStats);
    console.log('Default stats seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding stats:', error);
    process.exit(1);
  }
};

seedStats();
