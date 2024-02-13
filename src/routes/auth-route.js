const express = require("express");

const authController = require("../controllers/auth-controller");
const validate = require("../middlewares/validator/auth-validate");

const router = express.Router();

router.post("/register", validate.register, authController.register);
router.post("/login",validate.login, authController.login);

module.exports = router;
