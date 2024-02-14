const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post("/order", userController.createOrder);
router.patch("/order", userController.updateProfile);
router.get("/order", userController.getOrder);
router.get("/profile", userController.getMe);
router.delete("/order", userController.deleteOrder);

module.exports = router;
