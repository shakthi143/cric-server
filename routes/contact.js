// /server/routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/contact'); 

// POST endpoint to handle form submissions
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save contact data' });
  }
});

module.exports = router;
