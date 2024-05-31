const nodemailer = require('nodemailer');

const sendNotificationToAdmin = async (message) => {
  let transporter = nodemailer.createTransport({
    service: process.env.SMPT_SERVICE,
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
  });

  let mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: 'New Product Report',
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification sent to admin');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = { sendNotificationToAdmin };
