const router = require("express").Router();
const auth = require("../../utils/auth");

const cipherController = require("./cipher.controller");
const guessController = require("../guess/guess.controller");

// middleware to attach cipher to the request object
router.use("/:id", cipherController.attachCipherToRequest);

router.get("/:id", cipherController.getCipherById);
router.get("/", cipherController.getCiphers);
router.post("/", auth.isAuthenicated, cipherController.addCipher);

router.get("/:id/guess", guessController.getGuesses);
router.post(
  "/:id/guess",
  auth.isAuthenicated,
  guessController.isAuthorOfCipher,
  guessController.isCipherSolved,
  guessController.guessExists,
  guessController.addGuess
);
router.patch(
  "/:id/guess/:guessId",
  auth.isAuthenicated,
  guessController.isCipherSolved,
  guessController.updateGuess
);

module.exports = router;
