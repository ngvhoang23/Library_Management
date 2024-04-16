const bcrypt = require("bcrypt");
const db = require("../../config/db");
const moment = require("moment");
const { generateString } = require("../../DefinedFunctions");
const sendVerificationEmail = require("../../sendVerificationEmail/sendVerificationEmail");
const EmailController = require("../controllers/EmailController");

class UserController {
  // [GET] /users/user-info ****
  getUserInfo(req, res) {
    const { user_id } = req.userInfo;
    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `select ui.*, uai.role from user_info ui 
            inner join user_auth_info uai
            on ui.user_id = uai.user_id
          where ui.user_id = ${user_id}`,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              if (result?.length > 0) {
                resolve(result[0]);
              } else {
                reject({ status: 400, message: "User not found" });
              }
            }
          },
        );
      });
    };

    promise()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  // [PUT] /user-info/:user_id
  changeuserInfo(req, res) {
    const { user_id } = req.userInfo;

    const { phone_num, birth_date, address, gender, first_name, last_name } = req.body;

    const user_avatar = `/user-avatars/${req?.file?.filename}`;

    const updateUserInfo = () => {
      const updateUserInfoSql = `
            update user_info set 
            ${req?.file?.filename ? `user_avatar=${user_avatar ? `'${user_avatar}'` : null},` : ""} 
            phone_num=${phone_num ? `'${phone_num}'` : null}, 
            address=${address ? `'${address}'` : null}, 
            birth_date=${birth_date ? `'${birth_date}'` : null},
            gender=${gender ? `'${gender}'` : null}, 
            first_name=${first_name ? `'${first_name}'` : null}, 
            last_name=${last_name ? `'${last_name}'` : null},
            full_name='${first_name ? first_name : ""} ${last_name ? last_name : ""}'
            where user_id=${user_id}
          `;

      console.log(updateUserInfoSql);
      return new Promise((resolve, reject) => {
        db.query(updateUserInfoSql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    updateUserInfo()
      .then((result) => {
        console.log(result);
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  //[PUT] /users/password
  changePasswordUser(req, res) {
    const { old_password, new_password } = req.body;

    const { user_id, user_name } = req.userInfo;

    const comparePassword = () => {
      return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM user_auth_info WHERE user_name = '${user_name}'`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length > 0) {
              const user = result[0];
              console.log(user);
              bcrypt.compare(old_password, user.password).then((passwordCheck) => {
                if (!passwordCheck) {
                  return res.status(400).send({
                    message: "WRONG_PASSWORD",
                  });
                } else {
                  resolve(1);
                }
              });
            } else {
              reject({ status: 400, message: "USER NOT EXTST" });
            }
          }
        });
      });
    };

    const hashPassword = (password) => {
      return new Promise((resolve, reject) => {
        bcrypt
          .hash(password, 10)
          .then((hashed_password) => {
            resolve(hashed_password);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    const updatePassword = (password) => {
      return new Promise((resolve, reject) => {
        hashPassword(password).then((hashed_password) => {
          db.query(
            `update user_auth_info set password='${hashed_password}' where user_id='${user_id}'`,
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            },
          );
        });
      });
    };

    comparePassword()
      .then(() => {
        return updatePassword(new_password);
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  //[PUT] /users/password-admin
  changePasswordByAdmin(req, res) {
    const { user_id, password } = req.body;

    const hashPassword = () => {
      return new Promise((resolve, reject) => {
        bcrypt
          .hash(password, 10)
          .then((hashed_password) => {
            resolve(hashed_password);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    const updatePassword = () => {
      return new Promise((resolve, reject) => {
        hashPassword().then((hashed_password) => {
          db.query(
            `update user_auth_info set password='${hashed_password}' where user_id='${user_id}'`,
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            },
          );
        });
      });
    };

    updatePassword()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [POST] /email/
  changeEmail(req, res) {
    const user_id = req.userInfo;
    const { email_address, token } = req.body;

    const promise = () => {
      const data = [email_address, user_id];

      const sql = `
        update user_info set email_address = ? where user_id = ?
      `;

      return new Promise((resolve, reject) => {
        if (!EmailController.validateToken(token)) {
          reject({ status: 400, message: "INVALID_VALIDATION_CODE" });
          return;
        }
        db.query(sql, data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    promise()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [PUT] /passowrd
  changePassword;
}

module.exports = new UserController();
