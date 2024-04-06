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

  // [GET] /borrowed-books/borrowers
  getBorrowersWithin4Days(req, res) {
    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `
              with rm as (
                select bb.reader_id, count(bb.book_id) as borrowed_books from borrowed_books bb
                where DATE_ADD(bb.borrow_date, INTERVAL 4 DAY) >= CURDATE() and reader_id = 60
              )
              select ui.*, rm.borrowed_books from user_info ui
              inner join rm on rm.reader_id = ui.user_id
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

  // [GET] /available-books
  getAvailableBooksByGroup(req, res) {
    const { book_detail_id } = req.query;

    const promise = () => {
      const sql = `
      select * from books 
        inner join book_detail on books.book_detail_id = book_detail.book_detail_id
        inner join authors on book_detail.author_id = authors.author_id
        inner join categories on book_detail.category_id = categories.category_id
        where books.book_detail_id = ${book_detail_id} and books.status = 1
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
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
        console.log(err);
      });
  }

  // [POST] /borrowed-books
  postBorrowedBooks(req, res) {
    const { emp_id, reader_id, book_id, borrow_date, return_date } = req.body;

    const data = [];

    data.push([emp_id || null, reader_id || null, book_id || null, borrow_date || null, return_date || null]);

    const checkingBookStatus = () => {
      return new Promise((resolve, reject) => {
        db.query(`select * from books where book_id=${book_id} and status=1`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length === 0) {
              reject({ message: "This book is unavailable", code: "UNAVAILABLE_BOOK", status: 400 });
            } else {
              resolve(result);
            }
          }
        });
      });
    };

    const updateBookStatus = () => {
      return new Promise((resolve, reject) => {
        db.query(`update books set status=0 where book_id=${book_id}`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            console.log(result);
            resolve(result);
          }
        });
      });
    };

    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `insert into borrowed_books(emp_id, reader_id, book_id, borrow_date, return_date) values ?`,
          [data],
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

    checkingBookStatus()
      .then((result) => {
        return updateBookStatus();
      })
      .then((result) => {
        return promise();
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
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
