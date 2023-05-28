import fetch from 'node-fetch';

export async function sendEmail(mail: string, subject: string, content: string): Promise<void> {
  const functionUrl = 'https://europe-west1-gvanim-app.cloudfunctions.net/sendMail';

  try {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destinationMail: mail, subject, content }),
    });
    
    if (response.ok) {
      console.log('Email sent successfully');
    } else {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
