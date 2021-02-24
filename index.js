const express = require("express");
const mongoose = require("mongoose");
const { auth, requiresAuth } = require("express-openid-connect");
require("dotenv").config({ path: "./.local.env" });

const app = express();
app.use(express.json());
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
  })
);

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

const posts = [
  { text: "this is a random piece of text", isSolved: false },
  { text: "more text to parse", isSolved: false },
  { text: "another piece of text", isSolved: false },
  { text: "will encrypt data and more", isSolved: false },
];

app.get("/profile", requiresAuth(), (req, res) => {
  res.json(req.oidc.user); 
})

app.use("/ciphers", cipherRouter);

app.listen(8000, () => {
  console.log("Server is up");
});
