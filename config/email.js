const nodeMailer = require('nodemailer');
const ejs = require('ejs');

const sendMail = async (options) => {

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.Email_From,
    pass: process.env.GMAIL_PASSWORD,
  }
});

  // 2 Render HTML Based on ejs template
  const html = await ejs.renderFile(
    `${__dirname}/email.ejs`,
    {
     message: options.message,
     token: options.token || '',
      user: options.user,
      action: options.action || "Activate account",
      url: options.url,
    }
  );


  // 3 Define Mail Options
  const mailOptions = {
    from: process.env.Email_From,
    to: options.email,
    subject: options.subject,
    // text: htmlToText.fromString(html),
    html,
  };

  // 4 Send Email
 let r =  await transporter.sendMail(mailOptions);
console.log(r);
};

module.exports = sendMail;
