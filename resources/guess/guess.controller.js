const Guess = require("./guess.model");
const Cipher = require("../cipher/cipher.model");

exports.addGuess = async (req, res) => {
  const guess = new Guess({
    ...req.body.guess,
    userId: req.session.user.id,
    userName: req.session.user.name,
    cipherId: req.params.id,
    correct:
      req.cipher.text.localeCompare(req.body.guess.text, undefined, {
        sensitivity: "base",
      }) === 0
        ? true
        : false,
  });

  if (guess.correct) {
    await Cipher.findByIdAndUpdate(req.params.id, {
      solved: true,
    }).exec();
  }

  await guess.save();
  return res.status(200).json(guess);
};

exports.guessExists = async (req, res, next) => {
  try {
    const isGuess = await Guess.exists({
      userId: req.session.user.id,
      cipherId: req.params.id,
    });

    if (isGuess) {
      return res.status(409).json({ message: "Guess already exists" });
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

exports.isCipherSolved = (req, res, next) => {
  if (req.cipher.solved) {
    return res.status(200).json({ message: "Cipher is solved" });
  }

  next();
};

exports.isAuthorOfCipher = (req, res, next) => {
  if (req.cipher.userId.toString() === req.session.user.id) {
    return res
      .status(200)
      .json({ message: "Author of the cipher cannot guess" });
  }

  next();
};

exports.updateGuess = async (req, res) => {
  try {
    const guess = await Guess.findById(req.params.guessId);

    if (!guess) {
      return res.status(404).json({ message: "Guess not found" });
    }

    if (guess.userId.toString() !== req.session.user.id) {
      return res
        .status(403)
        .json({ message: "You can only edit guesses made by you" });
    }

    const isGuessCorrect =
      req.cipher.text.localeCompare(req.body.guess.text, undefined, {
        sensitivity: "base",
      }) === 0
        ? true
        : false;

    guess.text = req.body.guess.text;
    guess.attempts += 1;
    guess.correct = isGuessCorrect;

    if (isGuessCorrect) {
      await Cipher.findByIdAndUpdate(req.params.id, {
        solved: true,
      }).exec();
    }

    await guess.save();
    return res.status(200).json({ guess });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getGuesses = async (req, res) => {
  try {
    const cipherId = req.params.id;
    const guesses = await Guess.find({ cipherId: cipherId })
      .select({
        text: 1,
        correct: 1,
        attempts: 1,
        userName: 1,
      })
      .lean()
      .exec();

    return res.status(200).json(guesses);
  } catch (err) {
    res.status(500);
  }
};
