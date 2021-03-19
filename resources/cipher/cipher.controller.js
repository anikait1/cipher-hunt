const Cipher = require("./cipher.model");
const encryptionUtils = require("../../utils/textEncryption");

// implement pagination
exports.getCiphers = async (_req, res) => {
  try {
    const ciphers = await Cipher.find({})
      .select({
        encryptedText: 1,
        solved: 1,
        hints: 1,
        userName: 1,
      })
      .lean()
      .exec();

    return res.status(200).json(ciphers);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getCipherById = async (req, res) => {
  try {
    return res.status(200).json(req.cipher);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.attachCipherToRequest = async (req, res, next) => {
  try {
    const cipher = await Cipher.findById(req.params.id)
      .select({
        userId: 1,
        encryptedText: 1,
        solved: 1,
        hints: 1,
        userName: 1,
        text: 1,
      })
      .lean()
      .exec();

    if (!cipher) {
      return res.status(404).json({ err: "Cipher Not Found" });
    }

    req.cipher = cipher;
    next();
  } catch (err) {
    res.status(422).json(err);
  }
};

exports.addCipher = async (req, res) => {
  try {
    const cipherRequest = req.body.cipher;
    const [encryptedText, hints] = encryptionUtils.encryptText(
      cipherRequest.text
    );

    const cipher = new Cipher({
      ...cipherRequest,
      userId: req.session.user.id,
      userName: req.session.user.name,
      encryptedText,
      hints,
      solved: false,
    });

    await cipher.save();
    return res.status(201).json({ id: cipher._id });
  } catch (err) {
    return res.json({ err });
  }
};

exports.getUserCiphers = async (req, res) => {
  try {
    const ciphers = await Cipher.find({ userId: req.id });
    return res.status(200).json(ciphers);
  } catch (err) {
    res.status(500).json(err);
  }
};
