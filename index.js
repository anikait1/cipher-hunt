const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.local.env" });

const app = express();
app.use(express.json());

const cipherRouter = require("./resources/cipher/cipher.route");

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

app.use("/ciphers", cipherRouter);

app.listen(8000, () => {
  console.log("Server is up");
});
