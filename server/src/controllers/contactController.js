const Contact = require('../models/Contact');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const submitMessage = async (req, res, next) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = await Contact.create({
      name,
      email,
      message
    });

    if (process.env.RESEND_API_KEY) {
      try {
        const data = await resend.emails.send({
          from: 'AMPP Contact Form <onboarding@resend.dev>', // Resend requires this 'from' email unless you verify a domain
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'your-email@gmail.com',
          subject: `New Contact Message from ${name}`,
          html: `
            <h3>New Message Received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <br>
            <p>This message has been saved to the database.</p>
          `
        });
        console.log("Email sent via Resend:", data);
      } catch (error) {
        console.error("Resend Email error:", error);

        return res.status(500).json({
          success: false,
          message: "Failed to send email",
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon.'
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
  submitMessage,
};
