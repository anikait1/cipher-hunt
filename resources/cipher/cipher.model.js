const mongoose = require("mongoose");

const CipherSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, maxLength: 140, required: true },
    encryptedText: { type: String, maxLength: 140, required: true },
    solved: { type: Boolean, required: true },
    hints: [
      {
        original: { type: String, maxLength: 1, minLength: 1, required: true },
        encrypted: { type: String, maxLength: 1, minLength: 1, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cipher", CipherSchema);
