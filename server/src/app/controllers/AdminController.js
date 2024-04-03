const db = require("../../config/db");

class AdminController {
  // [GET] /users/suggested-users
  getEmployees(req, res) {
    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `
            select * from user_auth_info uai
                inner join user_info ui
                on uai.user_id = ui.user_id
            where uai.role = 'emp'
            `,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
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

  // [POST] /users/
}

module.exports = new AdminController();
