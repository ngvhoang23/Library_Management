const bcrypt = require("bcrypt");
const db = require("../../config/db");
const moment = require("moment");
const { randomInt } = require("crypto");
const { generateString } = require("../../DefinedFunctions");
const sendVerificationEmail = require("../../sendVerificationEmail/sendVerificationEmail");

class EmailController {
  static validationTokens = [];

  static resetPwTokens = [];

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

  validateResetPwToken(token) {
    const isValid = EmailController.resetPwTokens.some((_token) => _token === token);
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
        res.status(200).send({ status: 200, message: "successfull", duration });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
  // [GET] /email/get-ressetpw-token
  getResetPwToken(req, res) {
    const { token } = req.query;
    const isValid = EmailController.validationTokens.some((_token) => _token === token);
    if (isValid) {
      const pw_token = generateString(6);
      EmailController.resetPwTokens.push(pw_token);
      setTimeout(() => {
        EmailController.resetPwTokens = EmailController.resetPwTokens.filter((_token) => _token != pw_token);
      }, process.env.ACCESS_RESET_PW_TOKEN_DURATION);
      res.status(200).send({ token: pw_token, duration: process.env.ACCESS_RESET_PW_TOKEN_DURATION });
    } else {
      res.status(400).send({ message: "INVALID_CODE", status: 400 });
    }
  }
}

module.exports = new EmailController();
