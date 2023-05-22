/**
 * the format of the page is diffrent from the rest of thr project,
 * due to firebase rules
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
// import {request} from "http";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const sendMail = functions.https.onRequest((request, response) => {
  const {destinationMail, subject, content} = request.body;

  // Configure the SMTP transport for sending emails
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_MAIL,
      pass: process.env.SENDER_PASS,
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.REACT_APP_SENDER_MAIL,
    to: destinationMail,
    subject: subject,
    text: content,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // Handle the error case
      console.error("Error sending email:", error);
      response.status(500).send("Error sending email");
    } else {
      // Handle the success case
      console.log("Email sent:", info.response);
      response.send("Email sent successfully");
    }
  });
});
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
