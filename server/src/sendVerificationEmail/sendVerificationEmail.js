const transporter = require("../config/nodemailer/nodemailer");

const sendVerificationEmail = (user, token) => {
  console.log(user.email);

  const mailOptions = {
    from: "phuoclongahi@gmail.com",
    to: user.email,
    subject: "Email Verification",
    html: `<p>${token}</p>`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
};

module.exports = sendVerificationEmail;
