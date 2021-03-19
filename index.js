const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config({ path: "./.local.env" });

const app = express();
app.use(cors());
app.use(
  session({
    name: "qid",
    secret: process.env.COOKIE_SECRET,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // set in prod
    },
    saveUninitialized: false
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error")
);
mongoose.connection.once("open", () => {
  console.log("DB is up");
});

mongoose.set('debug', { shell: true })

const cipherRouter = require("./resources/cipher/cipher.route");
const userRouter = require("./resources/user/user.route");

app.use("/ciphers", cipherRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is up");
});
