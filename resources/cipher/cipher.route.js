const express = require("express");
const cipherController = require("./cipher.controller");

const router = express.Router();

router.post("/", cipherController.addCipher);
router.get("/", cipherController.getCiphers);

module.exports = router;