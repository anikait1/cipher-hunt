const router = require("express").Router();

const Cipher = require("./cipher.model");
const User = require("../user/user.model");

const cipherController = require("./cipher.controller");
const guessController = require("../guess/guess.controller");

router.post("/", cipherController.addCipher);
router.get("/", cipherController.getCiphers);

router.use("/:id", async (req, res, next) => {
  try {
    const isCipher = await Cipher.exists({ _id: req.params.id });

    if (isCipher) {
      next();
    } else {
      res.status(404).json({ err: "Cipher Not Found" });
    }
  } catch (err) {
    res.status(422).json({ err: "Invalid Cipher id" });
  }
});

router.use("/:id", async (req, res, next) => {
  try {
    // validate user (jwt or session)
    const isUser = await Cipher.exists({ _id: req.user.id });

    if (isUser) {
      next();
    } else {
      res.status(404).json({ err: "User Not Found" });
    }
  } catch (err) {
    res.status(422).json({ err: "Invalid User Id" });
  }
});

router.get("/:id", (req, res) => {
  res.send("something");
});

router.get("/:id/guesses", (_, res) => {
  res.send("got you");
});
router.post("/:id/guesses");

module.exports = router;
