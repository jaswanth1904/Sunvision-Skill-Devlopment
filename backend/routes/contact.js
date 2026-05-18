const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { z } = require('zod');

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
});

// @route   POST /api/contact
// @desc    Submit a contact form
router.post('/', async (req, res) => {
  try {
    const data = formSchema.parse(req.body);
    
    const newContact = new Contact(data);
    await newContact.save();

    console.log("Contact form submission saved to DB");
    res.status(200).json({ message: "Submission successful" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(400).json({ error: "Invalid form submission or server error." });
  }
});



// @route   GET /api/contact
// @desc    Get all contacts (For Admin Panel)
// TODO: Add auth middleware here
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
