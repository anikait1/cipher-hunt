const userController = require("./user.controller");
const cipherController = require("../cipher/cipher.controller");
const router = require("express").Router();
const auth = require("../../utils/auth");

router.post("/sign-up", auth.signupFields, auth.signup);
router.post("/sign-in", auth.signinFields, auth.signin);
router.get("/:id/ciphers", cipherController.getUserCiphers);
router.get("/me", auth.isAuthenicated, userController.me)

module.exports = router;