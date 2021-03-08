const userController = require("./user.controller");
const router = require("express").Router();
const auth = require("../../utils/auth");

router.post("/sign-up", auth.signupFields, auth.signup);
router.post("/sign-in", auth.signinFields, auth.signin);
router.post("/")
router.get("/me", auth.isAuthenicated, userController.me)

module.exports = router;