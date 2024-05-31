const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const sendActivationEmail = async (options) => {
  // Read the HTML template file
  const htmlTemplate = fs.readFileSync(path.join(__dirname, "emailTemplate.html"), 'utf8');

  // Replace placeholders with actual values
  const htmlContent = htmlTemplate
    .replace("{{name}}", options.name )
    .replace("{{activationUrl}}", options.activationUrl);

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

const sendPasswordResetEmail = async (options) => {
  // Read the HTML template file
  const htmlTemplate = fs.readFileSync(path.join(__dirname, "passwordResetTemplate.html"), 'utf8');


  // Replace placeholders with actual values
  const htmlContent = htmlTemplate
  .replace("{{name}}", options.name )
  .replace("{{resetLink}}", options.resetLink);

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

const sendSellerActivationEmail = async (options) => {
  // Read the HTML template file
  const htmlTemplate = fs.readFileSync(path.join(__dirname, "emailTemplateSeller.html"), 'utf8');

  console.log(options)
  // Replace placeholders with actual values
  const htmlContent = htmlTemplate
    .replace("{{name}}", options.name )
    .replace("{{activationUrlSeller}}", options.activationUrlSeller);

  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendActivationEmail, sendPasswordResetEmail, sendSellerActivationEmail };
