const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Partner = require('./models/Partner');

dotenv.config();

const defaultPartners = [
  { name: "DMart", image: "" },
  { name: "airtel", image: "" },
  { name: "MedPlus+", image: "" },
  { name: "Apollo Hospitals", image: "" },
  { name: "Reliance", image: "" },
  { name: "HDFC Bank", image: "" },
  { name: "ICICI Bank", image: "" },
];

const addDefaults = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for adding default partners...");

    for (const p of defaultPartners) {
      const exists = await Partner.findOne({ name: p.name });
      if (!exists) {
        await new Partner(p).save();
        console.log(`Added default partner: ${p.name}`);
      } else {
        console.log(`Partner already exists: ${p.name}`);
      }
    }

    console.log("Finished adding defaults!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

addDefaults();
