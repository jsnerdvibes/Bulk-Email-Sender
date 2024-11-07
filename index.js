const nodemailer = require("nodemailer");
const path = require("path");

// Gmail SMTP configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "YOUR EMAIL", // Replace with your Gmail address
    pass: "YOUR APP PASS",    // Replace with your Gmail App Password
  },
});

// List of recipient emails
const recipients = [
  // Add more emails here
  "email1.email.com",
  "email1.email.com"
];

// Email details
const subject = "Your Subject";
const text = `Your Mail body`;

const pdfPath = path.join(__dirname, "Attachment name if any"); // Path to your PDF file if not comment this line

function sendEmailWithAttachment(recipient, delay) {
  setTimeout(async () => {
    try {
      const info = await transporter.sendMail({
        from: '"Your Name" <your email>',
        to: recipient,
        subject: subject,
        text: text,

//comment or remove attachment if no attachments in your mail
        attachments: [
          {
            filename: "Custom file name", // You can change this to a custom filename
            path: pdfPath, // Path to the PDF file
          },
        ],
      });
      console.log(`Email sent to ${recipient}: ${info.messageId}`);
    } catch (error) {
      console.error(`Failed to send email to ${recipient}:`, error);
    }
  }, delay);
}

function sendBulkEmailsWithAttachment(recipients) {
  let delay = 0;
  recipients.forEach((recipient) => {
    sendEmailWithAttachment(recipient, delay);
    delay += Math.floor(Math.random() * 5000) + 15000; // Random delay between 5-15 seconds
  });
}

// Start sending emails
sendBulkEmailsWithAttachment(recipients);
