import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

const sendEmail = functions.https.onCall(async (data, context) => {
  // Get the email address, subject, and content from the request data
  admin.initializeApp();
  const { email, subject, content } = data;

  // Create a transport object to send the email using a SMTP server
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.REACT_APP_SENDER_MAIL,
      pass: process.env.REACT_APP_SENDER_PASS
    },
  });

  // Configure the email message
  const message = {
    from: process.env.REACT_APP_SENDER_MAIL,
    to: email,
    subject: subject,
    text: content,
  };

  try {
    // Send the email using the transport object
    const result = await transport.sendMail(message);
    console.log('Email sent successfully:', result);
    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { error: error.message };
  }
});
