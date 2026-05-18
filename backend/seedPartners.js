const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Partner = require('./models/Partner');

dotenv.config();

const partners = [
  { name: "DMart", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150" },
  { name: "airtel", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150" },
  { name: "MedPlus+", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150" },
  { name: "Apollo Hospitals", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150" },
  { name: "Reliance", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150" },
  { name: "HDFC Bank", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150" },
  { name: "ICICI Bank", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150" },
];

const seedPartners = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for seeding partners...");

    await Partner.deleteMany();
    console.log("Cleared existing partners");

    await Partner.insertMany(partners);
    console.log("Seeded partners successfully!");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedPartners();
