const bcrypt = require("bcrypt");
const db = require("../config/db");
const moment = require("moment");

function generateString(length) {
  const characters = "0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

const checkValidReaderToBorrow = (reader_id) => {
  const sql = `
  select user_id, getDept(user_id) as fine, getOverdueBookQuantity(user_id) as overdue_books, getBorrowingBookQuantity(user_id) as borrowing_books, expire_date < curdate() is_expired 
  from user_info
  where user_id = ${reader_id} and (getOverdueBookQuantity(user_id) > 0 or expire_date < curdate() or getBorrowingBookQuantity(user_id) >= 4 or getDept(user_id) < 0)
    `;

  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        if (result.length > 0) {
          reject({ code: "INVALID_READER", status: 400, message: "Reader is not eligible to borrow" });
        } else {
          resolve({ code: "VALID_READER", status: 200, message: "Reader is eligible to borrow" });
        }
      }
    });
  });
};

module.exports = { generateString, groupBy, checkValidReaderToBorrow };
