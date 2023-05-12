import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

export const sendEmail = functions.https.onCall(async (data, context) => {
  const { mailAddress, subject, content } = data;

  // Check that the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'The user must be authenticated to send emails.');
  }

  // Create a nodemailer transport object using Gmail SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: functions.config().gmail.email,
      pass: functions.config().gmail.password
    }
  });

  // Define the email message options
  const mailOptions = {
    from: `Sender Name <${functions.config().gmail.email}>`,
    to: mailAddress,
    subject: subject,
    html: content
  };

  // Send the email using the nodemailer transport object
  const info = await transporter.sendMail(mailOptions);

  // Log the email message ID and return a success message
  console.log(`Message ID: ${info.messageId}`);
  return { message: `Email sent to ${mailAddress} successfully.` };
});
