const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Setting = require('./models/Setting');

dotenv.config();

const seedSettings = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for seeding settings...");

    // Seed Footer
    await Setting.findOneAndUpdate(
      { key: "footer" },
      {
        value: {
          address: "Dilsukhnagar, Hyderabad, TG",
          phone: "+91 97030 54999",
          email: "info@sunvisionsociety.org",
        }
      },
      { upsert: true, new: true }
    );

    // Seed About
    await Setting.findOneAndUpdate(
      { key: "about" },
      {
        value: {
          text: "Sunvision Skill Development portrays an indispensable role in generating employability of rural unemployed youth and sustainability in organizations. We bridge the gap between academic learning and professional skills.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
          pinpoints: [
            "Quality training by certified professionals",
            "Guaranteed placement assistance",
            "Specialized focus on IT/ITES, Retail, and Telecom"
          ]
        }
      },
      { upsert: true, new: true }
    );

    console.log("Seeded settings successfully!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedSettings();
