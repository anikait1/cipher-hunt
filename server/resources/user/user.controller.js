const User = require("./user.model");

exports.me = async (req, res) => {
  try {
    console.log(req.session);
    const user = await User.findById(req.session.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};
