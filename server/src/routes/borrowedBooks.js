var express = require("express");
var router = express.Router();

const { uploadCoverPhoto } = require("../uploadFile/uploadFile");

const BorrowedBooksController = require("../app/controllers/BorrowedBooksController");
const { reader_auth, emp_auth, admin_auth } = require("../auth/auth");

router.get("/", BorrowedBooksController.getBorrowedBooks);
router.get("/borrowers", BorrowedBooksController.getBorrowersWithin4Days);
router.get("/available-books/:book_detail_id", BorrowedBooksController.getAvailableBooksByGroup);

router.post("/", BorrowedBooksController.postBorrowedBooks);

module.exports = router;
