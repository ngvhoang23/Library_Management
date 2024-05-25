const authRouter = require("./auth");
const userRouter = require("./users");
const bookRouter = require("./books");
const borrowedBookRouter = require("./borrowedBooks");
const notificationRouter = require("./notifications");
const emailRouter = require("./email");

function route(app) {
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/books", bookRouter);
  app.use("/borrowed-books", borrowedBookRouter);
  app.use("/email", emailRouter);
  app.use("/notifications", notificationRouter);
}

module.exports = route;
