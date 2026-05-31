const config = require('../config');

async function sendContactEmail({ name, email, subject, message }) {
  if (!process.env.BREVO_API_KEY) {
    console.log('═══════════════════════════════════════');
    console.log('📧 NEW CONTACT MESSAGE (console mode)');
    console.log('═══════════════════════════════════════');
    console.log(`From: ${name} <${email}>`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log('═══════════════════════════════════════');
    return { success: true, mode: 'console' };
  }

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'Portfolio — Domenico Rizzi', email: 'info@mimmorizzi.com' },
      to: [{ email: config.email.to }],
      replyTo: { email: email, name: name },
      subject: `[Portfolio] ${subject}`,
      htmlContent: `
        <h2>Nuovo messaggio dal portfolio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Oggetto:</strong> ${subject}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo error ${res.status}: ${err}`);
  }

  return { success: true, mode: 'email' };
}

module.exports = { sendContactEmail };
