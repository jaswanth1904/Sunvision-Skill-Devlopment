const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Testimonial = require('./models/Testimonial');

dotenv.config();

const testimonials = [
  {
    name: "M Siva Naga Raju",
    role: "Placed at IT Sector (TCS)",
    text: "Sunvision Society transformed my career. The Free skill training program provided me with the necessary professional skills to excel in the corporate world.",
  },
  {
    name: "A Suneetha",
    role: "Placed at HDFC Bank",
    text: "The training methodologies and certified trainers at Sunvision are exceptional. Not only did I learn technical skills, but my confidence and interpersonal skills also improved drastically.",
  },
  {
    name: "HARSHI",
    role: "Placed at Airtel",
    text: "To flourish interpersonal and intrapersonal skills, Sunvision Society was the best choice. They built up my confidence level and placed me in a reputed company.",
  },
  {
    name: "Jaswanth",
    role: "Software Developer",
    text: "I appreciate the workaholics at Sunvision. They value our efforts by providing pre-eminent courses which modified my good learning skills to become optimistic.",
  }
];

const seedTestimonials = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected for seeding...");

    await Testimonial.deleteMany();
    console.log("Cleared existing testimonials");

    await Testimonial.insertMany(testimonials);
    console.log("Seeded testimonials successfully!");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedTestimonials();
