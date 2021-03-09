const mongoose = require("mongoose");

const GuessSchema = mongoose.Schema(
  {
    cipherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cipher",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, maxLength: 40, required: true },
    text: { type: String, maxLength: 140, required: true },
    correct: { type: Boolean, required: true },
    attempts: { type: Number, default: 1 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Guess", GuessSchema);
