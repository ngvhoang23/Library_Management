const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../config/db");

class NotificationController {
  getNotificationsByEmployee(req, res) {
    console.log("object");

    const promise = () => {
      const sql = `
        select bb.*, bd.cover_photo, bd.book_name, ui.full_name, ui.user_avatar from borrowed_books bb
        inner join user_info ui on bb.reader_id = ui.user_id
        inner join books b on b.book_id = bb.book_id
        inner join book_detail bd on bd.book_detail_id = b.book_detail_id
        where actual_return_date is null;
        select fm.*, ui.full_name, ui.user_avatar from fine_management fm inner join user_info ui 
          on fm.reader_id = ui.user_id 
        `;

      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
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
        let borrowing_data = result[0].map((item) => {
          return { ...item, noti_type: "borrowing" };
        });
        let fine_data = result[1].map((item) => {
          return { ...item, noti_type: "fine" };
        });

        let data = [...borrowing_data, ...fine_data];

        data = data.sort((item1, item2) => {
          return new Date(item2.created_at) - new Date(item1.created_at);
        });

        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send(err);
        console.log(err);
      });
  }
}

module.exports = new NotificationController();
