import * as functions from "firebase-functions";
import * as cors from "cors";
import * as nodemailer from "nodemailer";


const corsHandler = cors({origin: true});


exports.sendMail = functions
  .region("europe-west1")
  .https.onRequest((request: any, response: any) => {
    corsHandler(request, response, async () => {
      try {
        // Implement your email sending logic here
        const {destinationMail, subject, content} = request.body;

        // Create the nodemailer transporter
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SENDER_MAIL,
            pass: process.env.SENDER_PASS,
          },
        });

        // Send the email
        await transporter.sendMail({
          from: process.env.SENDER_MAIL,
          to: destinationMail,
          subject: subject,
          text: content,
        });

        // Send a success response
        response.status(200).json({message: "Email sent successfully"});
      } catch (error) {
        // Handle any errors and send an error response
        console.error("Error sending email:", error);
        response.status(500).json({error: "Failed to send email"});
      }
    });
  });
