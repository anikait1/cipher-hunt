const router = require("express").Router();
const auth = require("../../utils/auth");

const cipherController = require("./cipher.controller");
const guessController = require("../guess/guess.controller");

// requests dealing with a particular cipher requires to continuously check data from
// cipher(compare result of guess), therefore we attach the cipher to the request object
router.use("/:id", cipherController.attachCipherToRequest);

router.get("/:id", cipherController.getCipherById);
router.get("/", cipherController.getCiphers);
router.post("/", auth.isAuthenicated, cipherController.addCipher);

router.get("/:id/guess", guessController.getGuesses);

// posting a guess for a specified cipher, requires the guess to go through a series of
// check, this middleware pipeline is used to configure those checks
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
