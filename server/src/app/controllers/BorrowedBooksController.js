const bcrypt = require("bcrypt");
const db = require("../../config/db");
const moment = require("moment");

class BorrowedBooksController {
  // [GET] /borrowed-books
  getBorrowedBooks(req, res) {
    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `
          select bb.borrow_id, ui2.user_id as emp_id, ui2.full_name as emp_name,
          ui1.user_id as reader_id, ui1.full_name as reader_name, ui1.user_avatar as reader_avatar, ui1.phone_num as reader_phone_num,
          b.book_id, b.book_detail_id, b.position,
          bd.book_name, bd.author_id, bd.cover_photo as book_cover_photo,
          a.author_name,
          bb.borrow_date, bb.return_date, bb.actual_return_date
          from borrowed_books bb
            inner join user_info ui1 on ui1.user_id = bb.reader_id
            inner join books b on b.book_id = bb.book_id
            inner join user_info ui2 on ui2.user_id = bb.emp_id
            inner join book_detail bd on bd.book_detail_id = b.book_detail_id
            inner join authors a on a.author_id = bd.author_id
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
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [POST] /borrowed-books
  postBorrowedBooks(req, res) {
    const { emp_id, reader_id, book_id, borrow_date, return_date } = req.body;

    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `insert into borrowed_books(emp_id, reader_id, book_id, borrow_date, return_date) values(
            ${emp_id},
            ${reader_id},
            ${book_id},
            ${borrow_date ? `'${borrow_date}'` : null},
            ${return_date ? `'${return_date}'` : null},
        )`,
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

  // [PUT] /borrowed-books/return-book
  returnBook(req, res) {
    const { borrow_id, actual_return_date } = req.body;

    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `update borrowed_books set actual_return_date='${actual_return_date}' where borrow_id=${borrow_id}`,
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
}

module.exports = new BorrowedBooksController();
