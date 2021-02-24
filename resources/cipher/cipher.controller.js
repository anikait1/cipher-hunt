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
      })
      .lean()
      .exec();

    res.status(200).json(ciphers);
  } catch (err) {
    res.json(err);
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
      encryptedText,
      hints,
      solved: false,
    });

    await cipher.save();
    res.status(201).json({ _id: cipher._id });
  } catch (err) {
    res.json({ err });
  }
};
