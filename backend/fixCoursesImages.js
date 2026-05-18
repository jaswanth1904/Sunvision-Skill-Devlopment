const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

const autocadImage = "https://images.unsplash.com/photo-1503387762-592dea58ef21?q=80&w=2031&auto=format&fit=crop";

const fixCoursesImages = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for fixing courses...');

    // Force update AutoCAD image
    const result = await Course.findOneAndUpdate(
      { slug: 'autocad' },
      { image: autocadImage },
      { new: true }
    );

    if (result) {
      console.log('AutoCAD course image updated successfully!');
      console.log('Updated Course Image URL:', result.image);
    } else {
      console.log('AutoCAD course not found in database to update.');
    }

    // Check if any other courses have empty or invalid images and fix them too
    const courses = await Course.find();
    console.log(`Found ${courses.length} courses in database.`);
    
    process.exit();
  } catch (error) {
    console.error('Error fixing courses:', error);
    process.exit(1);
  }
};

fixCoursesImages();
