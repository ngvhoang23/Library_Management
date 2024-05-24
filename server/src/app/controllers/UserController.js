const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  // [POST] /register-account
  registerAccount(req, res) {
    const { user_name, password, token } = req.body;

    if (!EmailController.validateToken(token)) {
      return res.status(400).send({ status: 400, code: "INVALID_VALIDATION_CODE" });
    }

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

    const checkValidateUserName = () => {
      const data = [[user_name]];
      const sql = `select * from user_auth_info where user_name = ?`;
      return new Promise((resolve, reject) => {
        db.query(sql, [data], (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length > 0) {
              reject({ message: "User Name id existed", status: 400, code: "USER_NAME_EXISTED" });
            } else {
              resolve(1);
            }
          }
        });
      });
    };

    const registerPromise = () => {
      return new Promise((resolve, reject) => {
        hashPassword(password)
          .then((hashed_password) => {
            const sql = `
            insert into user_auth_info(user_name, password, role) values ?
          `;
            const data = [[user_name, hashed_password, "reader"]];
            db.query(sql, [data], (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result.insertId);
              }
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    checkValidateUserName()
      .then((result) => {
        return registerPromise();
      })
      .then((user_id) => {
        const access_token = jwt.sign(
          {
            user_id: user_id,
            user_name: user_name,
            role: "reader",
          },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          { expiresIn: process.env.ACCESS_TOKEN_DURATION },
        );

        res.status(200).send({
          message: "Register Successful",
          access_token,
          user_info: { user_id: user_id, user_name: user_name, role: "reader" },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [POST] /user-info
  postUserInfo(req, res) {
    const { email_address, first_name, last_name, birth_date, gender, created_at, expired_date } = req.body;

    const { user_id } = req.userInfo;

    let user_avatar = "";
    if (req?.file) {
      user_avatar = `/user-avatars/${req?.file.filename}`;
    } else {
      user_avatar = `/user-avatars/default_avatar.png`;
    }

    const sql = `
      insert into user_info(user_id, first_name, last_name, full_name, email_address, birth_date, gender, user_avatar, reader_type, created_at, expire_date) values ? 
      `;

    const data = [
      [
        user_id || null,
        first_name || null,
        last_name || null,
        `${first_name} ${last_name}`,
        email_address || null,
        birth_date || null,
        gender || null,
        user_avatar || null,
        "student",
        created_at || null,
        expired_date || null,
      ],
    ];

    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(sql, [data], (err, result) => {
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
        res.status(200).send({
          first_name,
          last_name,
          email_address,
          user_avatar,
          birth_date,
          gender,
          role: "reader",
          reader_type: "student",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [GET] /check-email-user
  checkEmailUser(req, res) {
    const { user_name } = req.query;

    const promise = () => {
      return new Promise((resolve, reject) => {
        const data = [[user_name]];

        const sql = `
          select ui.* from user_info ui inner join user_auth_info uai
          on ui.user_id = uai.user_id
          where uai.user_name = ?
        `;

        db.query(sql, data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length == 0) {
              reject({ message: "user does not exists", code: "USER_NONEXISTENT" });
            } else {
              resolve(result[0]);
            }
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

  // [POST] /reset-password
  resetPassword(req, res) {
    const { user_name, new_password, token } = req.body;

    if (!EmailController.validateResetPwToken(token)) {
      return res.status(400).send({ status: 400, code: "INVALID_VALIDATION_CODE" });
    }

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

    const resetPw = (hashed_password) => {
      const sql = `
        update user_auth_info set password = ?
        where user_name = ?
      `;

      const data = [hashed_password, user_name];

      return new Promise((resolve, reject) => {
        db.query(sql, data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    hashPassword(new_password)
      .then((hashed_password) => {
        return resetPw(hashed_password);
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
}

module.exports = new UserController();
