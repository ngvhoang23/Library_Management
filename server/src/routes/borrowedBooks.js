var express = require("express");
var router = express.Router();

const { uploadCoverPhoto } = require("../uploadFile/uploadFile");

const BorrowedBooksController = require("../app/controllers/BorrowedBooksController");
const { reader_auth, emp_auth, admin_auth } = require("../auth/auth");

router.get("/", BorrowedBooksController.getBorrowedBooks);
router.get("/checking-borrowing-conditions", BorrowedBooksController.checkValidReaderToBorrow);

router.get("/fine", BorrowedBooksController.getFine);
router.get("/fine/searching/:search_value", BorrowedBooksController.searchFine);

router.get("/borrowers", BorrowedBooksController.getBorrowers);
router.get("/borrowers/searching/:search_value", BorrowedBooksController.searchBorrowers);

router.get("/borrowing-readers", BorrowedBooksController.getBorrowingReaders);
router.get("/borrowing-readers/searching/:search_value", BorrowedBooksController.searchBorrowingReaders);

router.get("/borrowing-books/", BorrowedBooksController.getBorrowingBooks);
router.get("/borrowing-books/searching/:search_value", BorrowedBooksController.searchBorrowingBooks);
router.get(
  "/borrowing-books/searching-by-borrower/:search_value",
  BorrowedBooksController.searchBorrowingBooksByBorrower,
);
router.get("/borrowing-books/:borrower_id", BorrowedBooksController.getBorrowingBooksByBorrower);

router.get("/book-groups", BorrowedBooksController.getBookGroups);
router.get("/book-groups/searching/:search_value", BorrowedBooksController.searchBookGroups);

router.get("/available-books/:book_detail_id", BorrowedBooksController.getAvailableBooksByGroup);
router.get("/available-books/searching/:search_value", BorrowedBooksController.searchAvailableBooksByGroup);

router.post("/", BorrowedBooksController.postBorrowedBooks);
router.post("/fine/", BorrowedBooksController.payFine);

router.put("/return-book/:borrow_id", BorrowedBooksController.returnBook);

router.delete("/:borrow_id", BorrowedBooksController.deleteBorrowedBook);

module.exports = router;
