const express = require('express');
const router = express.Router();
const { contactValidation, handleValidation } = require('../middleware/validator');
const { contactLimiter } = require('../middleware/rateLimiter');
const { sendContactEmail } = require('../services/emailService');

router.post('/', contactLimiter, contactValidation, handleValidation, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const result = await sendContactEmail({ name, email, subject, message });
    res.status(200).json({ success: true, message: 'Message received successfully.' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

module.exports = router;
