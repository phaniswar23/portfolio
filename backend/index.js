import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Message from './models/Message.js';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Basic health check route
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Contact formulation
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    // 1. Save to Database (Asynchronous/Non-blocking)
    const newMessage = new Message({ name, email, message });
    newMessage.save().catch(dbError => {
      console.error('Background MongoDB Save Error:', dbError.message);
    });


    // 2. Send Email to Admin (Site Owner)
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'phaniswarjanyavula@gmail.com',
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #22d3ee;">New Contact Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message}
          </div>
        </div>
      `,
    };

    // 3. Send Auto-Reply to User
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thanks for contacting - Phaniswar J.',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #22d3ee;">Hello ${name},</h2>
          <p>Thank you for reaching out! I've received your message and will get back to you within 24 hours.</p>
          <p>Best Regards,<br><strong>Phaniswar J.</strong><br>Full Stack Developer</p>
        </div>
      `,
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions)
    ]);

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error in contact route:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});


// Connect DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Start Server locally
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
