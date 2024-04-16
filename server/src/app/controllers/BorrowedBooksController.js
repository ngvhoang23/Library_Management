const bcrypt = require("bcrypt");
const db = require("../../config/db");
const moment = require("moment");
const { groupBy, checkValidReaderToBorrow } = require("../../DefinedFunctions");

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

  // [GET] /borrowing-books/
  getBorrowingBooks(req, res) {
    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `
          select bb.borrow_id, ui2.user_id as emp_id, ui2.full_name as emp_name,
          ui1.user_id as reader_id, ui1.full_name as reader_name, ui1.user_avatar as reader_avatar, ui1.phone_num as reader_phone_num,
          b.book_id, b.book_detail_id, b.position,
          bd.book_name, bd.author_id, bd.cover_photo,
          a.author_name,
          bb.borrow_date, bb.return_date, bb.actual_return_date
          from borrowed_books bb
            inner join user_info ui1 on ui1.user_id = bb.reader_id
            inner join books b on b.book_id = bb.book_id
            inner join user_info ui2 on ui2.user_id = bb.emp_id
            inner join book_detail bd on bd.book_detail_id = b.book_detail_id
            inner join authors a on a.author_id = bd.author_id
          where bb.actual_return_date is null
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

  // [GET] /checking-borrowing-conditions
  checkValidReaderToBorrow(req, res) {
    const { reader_id } = req.query;

    const promise = () => {
      const sql = `
      select user_id, getDept(user_id) as overdue_days, getBorrowingBookQuantity(user_id) as borrowing_books, expire_date < curdate() is_expired 
      from user_info
      where user_id = ${reader_id} and (getDept(user_id) > 0 or expire_date < curdate() or getBorrowingBookQuantity(user_id) >= 4)
      `;

      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            if (result.length > 0) {
              resolve({ code: "INVALID_READER", status: 400, message: "Reader is not eligible to borrow" });
            } else {
              resolve({ code: "VALID_READER", status: 200, message: "Reader is eligible to borrow" });
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

  // [GET] /borrowing-books/searching/:search_value
  searchBorrowingBooks(req, res) {
    const { search_value } = req.query;

    const promise = () => {
      const data = [`%${search_value}%`];
      const sql = `
        select bb.borrow_id, ui2.user_id as emp_id, ui2.full_name as emp_name,
        ui1.user_id as reader_id, ui1.full_name as reader_name, ui1.user_avatar as reader_avatar, ui1.phone_num as reader_phone_num,
        b.book_id, b.book_detail_id, b.position,
        bd.book_name, bd.author_id, bd.cover_photo,
        a.author_name,
        bb.borrow_date, bb.return_date, bb.actual_return_date
        from borrowed_books bb
          inner join user_info ui1 on ui1.user_id = bb.reader_id
          inner join books b on b.book_id = bb.book_id
          inner join user_info ui2 on ui2.user_id = bb.emp_id
          inner join book_detail bd on bd.book_detail_id = b.book_detail_id
          inner join authors a on a.author_id = bd.author_id
        where bb.actual_return_date is null and b.position like ?
      `;
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

    promise()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [GET] /borrowing-readers
  getBorrowingReaders(req, res) {
    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `
          with rm as (
            select bb.reader_id, count(bb.book_id) as borrowed_books from borrowed_books bb
            where bb.actual_return_date is null
            group by bb.reader_id
          )
          select ui.*, rm.borrowed_books from user_info ui
          left join rm on rm.reader_id = ui.user_id
          where ui.reader_type is not null and rm.borrowed_books is not null
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

  // [GET] /borrowing-readers/searching/:search_value
  searchBorrowingReaders(req, res) {
    const { search_value } = req.query;

    const promise = () => {
      const data = [`%${search_value}%`];

      const sql = `
        with rm as (
          select bb.reader_id, count(bb.book_id) as borrowed_books from borrowed_books bb
          where bb.actual_return_date is null
          group by bb.reader_id
        )
        select ui.*, rm.borrowed_books from user_info ui
        left join rm on rm.reader_id = ui.user_id
        where ui.reader_type is not null and rm.borrowed_books is not null and ui.full_name like ?
      `;

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

    promise()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  // [GET] /borrowing-books
  getBorrowingBooksByBorrower(req, res) {
    const { borrower_id } = req.query;

    const promise = () => {
      const sql = `
        select * from borrowed_books bb
        inner join books b on bb.book_id = b.book_id
        inner join book_detail bd on bd.book_detail_id = b.book_detail_id
        inner join authors on bd.author_id = authors.author_id
        inner join categories on bd.category_id = categories.category_id
        where bb.actual_return_date is null and bb.reader_id = ${borrower_id}
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
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [GET] /borrowing-books/detail/:borrow_id
  getBorrowingBookDetail(req, res) {
    const { borrow_id } = req.query;

    const promise = () => {
      const sql = `
          select bb.*, b.*, bd.*, authors.*, categories.*, 
          ui.full_name as reader_name, ui.user_avatar as reader_avatar,
          ui.phone_num as reader_phone_num
          from borrowed_books bb
          inner join user_info ui on ui.user_id = bb.reader_id
          inner join books b on bb.book_id = b.book_id
          inner join book_detail bd on bd.book_detail_id = b.book_detail_id
          inner join authors on bd.author_id = authors.author_id
          inner join categories on bd.category_id = categories.category_id
          where bb.borrow_id = ${borrow_id}
        `;

      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
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

  // [GET] /borrowing-books/searching/:search_value
  searchBorrowingBooksByBorrower(req, res) {
    const { borrower_id, search_value } = req.query;

    const promise = () => {
      const sql = `
          select * from borrowed_books bb
          inner join books b on bb.book_id = b.book_id
          inner join book_detail bd on bd.book_detail_id = b.book_detail_id
          inner join authors on bd.author_id = authors.author_id
          inner join categories on bd.category_id = categories.category_id
          where bb.actual_return_date is null and bb.reader_id = ${borrower_id} and b.position like ?
        `;

      return new Promise((resolve, reject) => {
        const data = [`%${search_value}%`];
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

  // [GET] /borrowed-books/borrowers
  getBorrowers(req, res) {
    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `
          with rm as (
            select bb.reader_id, count(bb.book_id) as borrowed_books from borrowed_books bb
            where DATE_ADD(bb.borrow_date, INTERVAL 4 DAY) >= CURDATE() and bb.actual_return_date is null
            group by bb.reader_id
            )
          select ui.*, rm.borrowed_books from user_info ui
          left join rm on rm.reader_id = ui.user_id
          where ui.reader_type is not null
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

  // [GET] /borrowers/searching/:search_value
  searchBorrowers(req, res) {
    const { search_value } = req.query;

    const promise = () => {
      const data = [`%${search_value}%`];

      const sql = `
      with rm as (
        select bb.reader_id, count(bb.book_id) as borrowed_books from borrowed_books bb
        where DATE_ADD(bb.borrow_date, INTERVAL 4 DAY) >= CURDATE()
        group by bb.reader_id
        )
        select ui.*, rm.borrowed_books from user_info ui
        left join rm on rm.reader_id = ui.user_id
        where ui.reader_type is not null and ui.full_name like ?
          `;
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

  // [GET] /available-books/searching/:search_value
  searchAvailableBooksByGroup(req, res) {
    const { book_detail_id, search_value } = req.query;

    const promise = () => {
      const data = [`%${search_value}%`];
      const sql = `
        select * from books 
          inner join book_detail on books.book_detail_id = book_detail.book_detail_id
          inner join authors on book_detail.author_id = authors.author_id
          inner join categories on book_detail.category_id = categories.category_id
          where books.book_detail_id = ${book_detail_id} and books.status = 1 and books.position like ?
        `;
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

    promise()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
        console.log(err);
      });
  }

  // [GET] /book-groups
  getBookGroups(req, res) {
    const { reader_type } = req.query;

    const promise = () => {
      const sql = `
        with rm as (
          select book_detail_id, count(*) as remaining from books
          where status = 1
          group by book_detail_id
        )
        select bd.*, a.author_name, c.category_name, rm.remaining from book_detail bd
        left join rm on bd.book_detail_id = rm.book_detail_id
        inner join authors a on a.author_id = bd.author_id
        inner join categories c on c.category_id = bd.category_id
        where for_reader = ${reader_type == "student" ? 1 : 2} or for_reader = 3
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
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [GET] /searching/:search_value
  searchBookGroups(req, res) {
    const { reader_type, search_value } = req.query;

    const promise = () => {
      const data = [`%${search_value}%`];
      const sql = `
        with rm as (
          select book_detail_id, count(*) as remaining from books
          where status = 1
          group by book_detail_id
        )
        select bd.*, a.author_name, c.category_name, rm.remaining from book_detail bd
        left join rm on bd.book_detail_id = rm.book_detail_id
        inner join authors a on a.author_id = bd.author_id
        inner join categories c on c.category_id = bd.category_id
        where (for_reader = ${reader_type === "reader" ? 1 : 2} or for_reader = 3) and bd.book_name like ?
      `;

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

    const data = [];

    data.push([
      emp_id || null,
      reader_id || null,
      book_id || null,
      borrow_date || null,
      return_date || null,
      moment().format(),
    ]);

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
            resolve(result);
          }
        });
      });
    };

    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `insert into borrowed_books(emp_id, reader_id, book_id, borrow_date, return_date, created_at) values ?`,
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

    checkValidReaderToBorrow(reader_id)
      .then((result) => {
        return checkingBookStatus();
      })
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

  // [PUT] /borrowed-books/return-book/:borrow_id
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
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [DELETE] /borrowed-books/:borrow_id
  deleteBorrowedBook(req, res) {
    const { book_id, borrow_id } = req.query;

    const updateBookStatus = () => {
      const sql = `
      update books b
        inner join borrowed_books bb on b.book_id = bb.book_id
        set b.status = 1
        where bb.actual_return_date is null and b.book_id = ${book_id}
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

    const deleteBorrowedBook = () => {
      return new Promise((resolve, reject) => {
        db.query(`delete from borrowed_books where borrow_id=${borrow_id}`, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    updateBookStatus()
      .then((result) => {
        return deleteBorrowedBook();
      })
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  // [GET] /fine/
  getFine(req, res) {
    const getAmountCollected = () => {
      const sql = `
        select reader_id, sum(amount_collected) as total_amount_collected from fine_management
        group by reader_id
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

    const getFineAmount = () => {
      const sql = `
      select bb.borrow_id, ui2.user_id as emp_id, ui2.full_name as emp_name,
            ui1.user_id as reader_id, ui1.full_name as reader_name, ui1.user_avatar as reader_avatar, ui1.phone_num as reader_phone_num,
            b.book_id, b.book_detail_id, b.position,
            bd.book_name, bd.author_id, bd.cover_photo,
            a.author_name,
            bb.borrow_date, bb.return_date, bb.actual_return_date
        from borrowed_books bb
        inner join user_info ui1 on bb.reader_id = ui1.user_id
        inner join user_info ui2 on bb.emp_id = ui2.user_id
        inner join books b on b.book_id = bb.book_id
        inner join book_detail bd on bd.book_detail_id = b.book_detail_id
        inner join authors a on a.author_id = bd.author_id
      where CURDATE() > bb.return_date and bb.actual_return_date is null or bb.actual_return_date > bb.return_date
      `;

      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            const data = [];
            const groupByBooks = groupBy(result, "reader_id");
            for (const [key, value] of Object.entries(groupByBooks)) {
              const reader_info = {
                reader_id: value[0].reader_id,
                reader_name: value[0].reader_name,
                reader_avatar: value[0].reader_avatar,
                reader_phone_num: value[0].reader_phone_num,
              };
              const total_fine = value.reduce((fine, book) => {
                return (
                  fine + Math.abs(Math.floor((new Date(book.return_date) - new Date()) / (1000 * 60 * 60 * 24)) * 1000)
                );
              }, 0);
              data.push({ reader_info, total_fine: total_fine, borrowed_books: value });
            }
            resolve(data);
          }
        });
      });
    };

    Promise.all([getFineAmount(), getAmountCollected()])
      .then(([fine_collected, fine_amount]) => {
        fine_collected.forEach((fine_collected_item) => {
          fine_collected_item.amount_collected = 0;
          fine_amount.forEach((fine_amount_item) => {
            if (fine_collected_item.reader_info.reader_id === fine_amount_item.reader_id) {
              fine_collected_item.amount_collected = fine_amount_item.total_amount_collected;
            }
          });
        });
        res.status(200).send(fine_collected);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [GET] /fine/:reader_id
  getFineByReader(req, res) {
    const { reader_id } = req.query;

    const getReaderInfo = () => {
      const sql = `
      select user_id as reader_id, full_name as reader_name, phone_num as reader_phone_num, user_avatar as reader_avatar
      from user_info where user_id = ${reader_id}
    `;

      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        });
      });
    };

    const getAmountCollected = () => {
      const sql = `
        select reader_id, sum(amount_collected) as total_amount_collected from fine_management
        where reader_id = ${reader_id}
        group by reader_id
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

    const getFineAmount = () => {
      const sql = `
      select bb.borrow_id, ui2.user_id as emp_id, ui2.full_name as emp_name,
            ui1.user_id as reader_id, ui1.full_name as reader_name, ui1.user_avatar as reader_avatar, ui1.phone_num as reader_phone_num,
            b.book_id, b.book_detail_id, b.position,
            bd.book_name, bd.author_id, bd.cover_photo,
            a.author_name,
            bb.borrow_date, bb.return_date, bb.actual_return_date
        from borrowed_books bb
        inner join user_info ui1 on bb.reader_id = ui1.user_id
        inner join user_info ui2 on bb.emp_id = ui2.user_id
        inner join books b on b.book_id = bb.book_id
        inner join book_detail bd on bd.book_detail_id = b.book_detail_id
        inner join authors a on a.author_id = bd.author_id
      where CURDATE() > bb.return_date and bb.actual_return_date is null or bb.actual_return_date > bb.return_date and bb.reader_id = ${reader_id}
      `;

      return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            let data;
            const groupByBooks = groupBy(result, "reader_id");
            for (const [key, value] of Object.entries(groupByBooks)) {
              const total_fine = value.reduce((fine, book) => {
                return (
                  fine + Math.abs(Math.floor((new Date(book.return_date) - new Date()) / (1000 * 60 * 60 * 24)) * 1000)
                );
              }, 0);

              data = { total_fine: total_fine, borrowed_books: value };
            }
            console.log(data);
            resolve(data);
          }
        });
      });
    };

    Promise.all([getAmountCollected(), getFineAmount(), getReaderInfo()])
      .then(([res1, res2, reader_info]) => {
        const fine_amount = res2 || {};
        const fine_collected = res1[0] || {};

        const data = { ...fine_amount, ...fine_collected, reader_info };

        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [GET] /fine/searching/:search_value
  searchFine(req, res) {
    const { search_value } = req.query;

    const getAmountCollected = () => {
      const data = [`%${search_value}%`];

      const sql = `
        select reader_id, sum(amount_collected) as total_amount_collected from fine_management fm
        inner join user_info ui on ui.user_id = fm.reader_id
        where ui.full_name like ?
        group by reader_id
      `;

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

    const getFineAmount = () => {
      const data = [`%${search_value}%`];

      const sql = `
      select bb.borrow_id, ui2.user_id as emp_id, ui2.full_name as emp_name,
            ui1.user_id as reader_id, ui1.full_name as reader_name, ui1.user_avatar as reader_avatar, ui1.phone_num as reader_phone_num,
            b.book_id, b.book_detail_id, b.position,
            bd.book_name, bd.author_id, bd.cover_photo,
            a.author_name,
            bb.borrow_date, bb.return_date, bb.actual_return_date
        from borrowed_books bb
        inner join user_info ui1 on bb.reader_id = ui1.user_id
        inner join user_info ui2 on bb.emp_id = ui2.user_id
        inner join books b on b.book_id = bb.book_id
        inner join book_detail bd on bd.book_detail_id = b.book_detail_id
        inner join authors a on a.author_id = bd.author_id
      where CURDATE() > bb.return_date and bb.actual_return_date is null or bb.actual_return_date > bb.return_date and ui1.full_name like ?
      `;

      return new Promise((resolve, reject) => {
        db.query(sql, data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            const data = [];
            const groupByBooks = groupBy(result, "reader_id");
            for (const [key, value] of Object.entries(groupByBooks)) {
              const reader_info = {
                reader_id: value[0].reader_id,
                reader_name: value[0].reader_name,
                reader_avatar: value[0].reader_avatar,
                reader_phone_num: value[0].reader_phone_num,
              };
              const total_fine = value.reduce((fine, book) => {
                return (
                  fine + Math.abs(Math.floor((new Date(book.return_date) - new Date()) / (1000 * 60 * 60 * 24)) * 1000)
                );
              }, 0);
              data.push({ reader_info, total_fine: total_fine, borrowed_books: value });
            }
            resolve(data);
          }
        });
      });
    };

    Promise.all([getFineAmount(), getAmountCollected()])
      .then(([fine_collected, fine_amount]) => {
        fine_collected.forEach((fine_collected_item) => {
          fine_amount.forEach((fine_amount_item) => {
            if (fine_collected_item.reader_info.reader_id === fine_amount_item.reader_id) {
              fine_collected_item.amount_collected = fine_amount_item.total_amount_collected;
            }
          });
        });
        res.status(200).send(fine_collected);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }

  // [POST] /fine/
  payFine(req, res) {
    const { amount_collected, reader_id, emp_id } = req.body;

    const data = [[emp_id, reader_id, moment().format(), amount_collected]];

    const promise = () => {
      return new Promise((resolve, reject) => {
        db.query(
          `insert into fine_management(emp_id, reader_id, created_at, amount_collected) values ?`,
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

    promise()
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err);
      });
  }
}

module.exports = new BorrowedBooksController();
