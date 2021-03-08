const argon2 = require("argon2");
const User = require("../resources/user/user.model");

exports.signupFields = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ err: "Missing fields" });
  }

  next();
};

exports.signinFields = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ err: "Missing fields" });
  }

  next();
};

exports.signup = async (req, res) => {
  try {
    const isUser = await User.exists({ email: req.body.email });

    if (isUser) {
      return res.status(409).json({ err: "User already exists" });
    }

    const hashedPassword = await argon2.hash(req.body.password);
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    await user.save();
    req.session.user = { id: user._id, name: user.name };
    return res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(200).json({ err: "Email not found" });
    }

    const passwordVerified = await argon2.verify(
      user.password,
      req.body.password
    );

    if (!passwordVerified) {
      return res.status(200).json({ err: "Password is incorrect" });
    }

    req.session.user = { id: user._id, name: user.name };
    console.log(req.session);
    return res.status(200).json();
  } catch (err) {
    res.status(500).json({ err: "Server error" });
  }
};

exports.isAuthenicated = async (req, res, next) => {
  if (!req.session.user?.id) {
    return res.status(401).json({err: "Unauthorized"});
  }

  next();
};
