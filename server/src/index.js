const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const http = require("http").Server(app);
require("dotenv").config({ path: "./config.env" });

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const route = require("./routes");

const socketInit = require("./socketIO/socketIO");

const io = require("socket.io")(http, {
  maxHttpBufferSize: 1e10,
  cors: {
    origin: "http://localhost:3000",
  },
});

// socket Init
socketInit(io);

// Route Init
route(app);

http.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
