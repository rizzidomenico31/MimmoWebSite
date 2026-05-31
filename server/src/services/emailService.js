const { Resend } = require('resend');
const config = require('../config');

async function sendContactEmail({ name, email, subject, message }) {
  if (!process.env.RESEND_API_KEY) {
    console.log('═══════════════════════════════════════');
    console.log('📧 NEW CONTACT MESSAGE (console mode)');
    console.log('═══════════════════════════════════════');
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('═══════════════════════════════════════');
    return { success: true, mode: 'console' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: `Portfolio <info@mimmorizzi.com>`,
    to: config.email.to,
    reply_to: email,
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
