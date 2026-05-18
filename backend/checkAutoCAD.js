const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const check = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const course = await Course.findOne({ slug: 'autocad' });
    console.log('AutoCAD Course from DB:', JSON.stringify(course, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

check();
