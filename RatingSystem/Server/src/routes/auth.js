const router = require("express").Router();
const authController = require("../controllers/authController");
const { registerValidator, loginValidator } = require("../utils/validators");

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.post("/logout", authController.logout);

module.exports = router;
