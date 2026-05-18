const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Partner = require('./models/Partner');

dotenv.config();

const clearLogos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for clearing partner logos...");

    await Partner.updateMany({}, { image: "" });
    console.log("Cleared logos for all partners in database!");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

clearLogos();
