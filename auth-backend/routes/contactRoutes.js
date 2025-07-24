const express = require('express');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure Nodemailer (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail (e.g., 'your@gmail.com')
    pass: process.env.EMAIL_PASS, // App Password (not regular password)
  },
});

// Submit contact form + send email
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, phone, subject, message });
    await newContact.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'sudiptiruwa27@gmail.com', // Where you want to receive messages
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Thank you for contacting us!' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;