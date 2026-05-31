require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  },
  email: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    to: process.env.CONTACT_EMAIL || 'domenico.rizzi@email.com',
  },
};
