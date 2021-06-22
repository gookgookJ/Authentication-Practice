require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

// 라우팅
const AuthenticationRouter = require("./routes/authentication");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  })
);

app.use(cookieParser);

app.use("/", AuthenticationRouter);

const HTTP_PORT = process.env.HTTP_PORT || 4000;

let server;
server = app.listen(HTTP_PORT, () => {
  console.log(`${HTTP_PORT}번 포트로 서버가 동작 중입니다.`);
});
module.exports = server;
