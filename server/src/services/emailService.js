const nodemailer = require('nodemailer');
const config = require('../config');

async function sendContactEmail({ name, email, subject, message }) {
  // Se SMTP non è configurato, log in console
  if (!config.email.host || !config.email.user) {
    console.log('═══════════════════════════════════════');
    console.log('📧 NEW CONTACT MESSAGE');
    console.log('═══════════════════════════════════════');
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('═══════════════════════════════════════');
    return { success: true, mode: 'console' };
  }

  const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${config.email.user}>`,
    replyTo: email,
    to: config.email.to,
    subject: `[Portfolio] ${subject}`,
    html: `
      <h2>Nuovo messaggio dal portfolio</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Oggetto:</strong> ${subject}</p>
      <hr>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
  });

  return { success: true, mode: 'email' };
}

module.exports = { sendContactEmail };
