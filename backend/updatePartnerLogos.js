const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Partner = require('./models/Partner');

dotenv.config();

const updates = [
  { name: "DMart", image: "https://logo.clearbit.com/dmartindia.com" },
  { name: "airtel", image: "https://logo.clearbit.com/airtel.in" },
  { name: "Apollo Hospitals", image: "https://logo.clearbit.com/apollohospitals.com" },
  { name: "Reliance", image: "https://logo.clearbit.com/ril.com" },
  { name: "HDFC Bank", image: "https://logo.clearbit.com/hdfcbank.com" },
  { name: "ICICI Bank", image: "https://logo.clearbit.com/icicibank.com" },
];

const updateLogos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for updating partner logos via Clearbit...");

    for (const u of updates) {
      await Partner.findOneAndUpdate({ name: u.name }, { image: u.image });
      console.log(`Updated logo for: ${u.name}`);
    }

    console.log("Finished updating logos!");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateLogos();
