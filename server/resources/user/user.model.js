const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, maxLength: 40, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
