const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

// Standard working blueprint photo from Unsplash
const cleanUrl = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop";

const fix = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Force set the AutoCAD image clean URL, trimmed of any spaces
    const result = await Course.findOneAndUpdate(
      { slug: 'autocad' },
      { image: cleanUrl.trim() },
      { new: true }
    );
    
    console.log('Cleaned AutoCAD image result:', result.image);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fix();
