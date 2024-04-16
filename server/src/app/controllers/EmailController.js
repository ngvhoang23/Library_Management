const bcrypt = require("bcrypt");
const db = require("../../config/db");
const moment = require("moment");
const { randomInt } = require("crypto");
const { generateString } = require("../../DefinedFunctions");
const sendVerificationEmail = require("../../sendVerificationEmail/sendVerificationEmail");

class EmailController {
  static validationTokens = [];

  static sendToken(email_address) {
    return new Promise((resolve, reject) => {
      const token = generateString(6);
      sendVerificationEmail({ email: email_address }, token)
        .then((result) => {
          EmailController.validationTokens.push(token);
          setTimeout(() => {
            EmailController.validationTokens = EmailController.validationTokens.filter((_token) => _token != token);
          }, process.env.ACCESS_EMAIL_CHANGING_TOKEN_DURATION);
          resolve(process.env.ACCESS_EMAIL_CHANGING_TOKEN_DURATION);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  validateToken(token) {
    const isValid = EmailController.validationTokens.some((_token) => _token === token);
    return isValid;
  }

  verifyEmail(user_id, email_address) {
    const data = [user_id, email_address];

    return new Promise((resolve, reject) => {
      db.query(`select * from user_info where user_id = ? and email_address = ?`, data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (result.length == 0) {
            reject({ status: 400, message: "INVALID_EMAIL" });
          } else {
            resolve(result);
          }
        }
      });
    });
  }

  // [GET] /email/validation-token
  sendTokenToEmail(req, res) {
    const { email_address } = req.query;

    EmailController.sendToken(email_address)
      .then((duration) => {
        console.log(duration);
        res.status(200).send({ status: 200, message: "successfull", duration });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
}

module.exports = new EmailController();
