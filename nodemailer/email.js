const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 

app.use(cors());
app.use(bodyParser.json()); 

// Set up nodemailer transporter
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'saitejayerramreddy2004.com', // Your email
    pass: 'cxbersdaalctaicr'      // Your app-specific password
  }
});

// POST route to handle sending payment email
app.post('/send-payment-email', (req, res) => {
  const { email, name, address, cardNumber, amount } = req.body;

  // Define the email options
  let mailOptions = {
    from: 'saitejayerramreddy2004.com',  // Sender address
    to: email,                      // Recipient address
    subject: 'Payment Confirmation', // Subject line
    text: `Hello ${name},\n\n` +
          `Thank you for your payment!\n\n` +
          `Amount Paid: Rs.${amount}\n` +
          `Shipping Address: ${address}\n` +
          `Card Number: ${cardNumber.slice(-4)} (last 4 digits)\n\n` +
          `Best Regards,\nYourPharm Team`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error while sending email:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
    console.log('Email sent: ' + info.response);
    res.json({ success: true, message: 'Email sent successfully!' });
  });
});


// POST route to handle sending booking email
app.post('/send-booking-email', (req, res) => {
  const { email, name, city, Hospital, Doctor, Date, Time } = req.body;

  if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Email and name are required.' });
  }

  let mailOptions = {
      from: 'saitejayerramreddy2004.com',
      to: email,
      subject: 'Booking Confirmation',
      text: `Hello ${name},\n\n` +
            `Thank you for Booking!\n\n` +
            `City : ${city}\n` + // Fixed from Rs.${city} to ${city}
            `Hospital : ${Hospital}\n` +
            `Doctor : ${Doctor}\n\n` +
            `Date : ${Date}\n` +
            `Time-slot : ${Time}\n\n` + // Added comma here
            `Best Regards,\nYourPharm Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error while sending email:', error);
          return res.status(500).json({ success: false, message: 'Failed to send email.' });
      }
      console.log('Email sent: ' + info.response);
      res.json({ success: true, message: 'Email sent successfully!' });
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
