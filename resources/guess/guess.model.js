const mongoose = require("mongoose");

const GuessSchema = mongoose.Schema(
  {
    cipherID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cipher",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, maxLength: 140 },
    correct: { type: Boolean, required: true },
    attempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guess", GuessSchema);
