var express = require("express");
var router = express.Router();
const { uploadCoverPhoto } = require("../uploadFile/uploadFile");

const EmailController = require("../app/controllers/EmailController");
const { reader_auth, emp_auth, admin_auth } = require("../auth/auth");

// reader role

router.get("/validation-token", EmailController.sendTokenToEmail);

module.exports = router;
