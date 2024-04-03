const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "phuoclongahi@gmail.com",
    pass: "mftvgyflsekxybcx",
  },
});

module.exports = transporter;
