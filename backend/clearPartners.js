const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Partner = require('./models/Partner');

dotenv.config();

const clearPartners = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for clearing partners...");

    await Partner.deleteMany({});
    console.log("Cleared all partners from database!");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

clearPartners();
