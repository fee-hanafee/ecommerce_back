const express = require("express");
const userController = require("../controllers/user-controller");
const router = express.Router();

router.post("/order", userController.createOrder);
router.patch("/profile", userController.updateProfile);
router.patch("/order", userController.updateOrder);
router.patch("/orderItem",userController.updateOrderItem)

router.get("/order", userController.getOrder);
router.get("/profile", userController.getMe);
router.delete("/order", userController.deleteOrder);
router.delete("/orderItem", userController.deleteOrderItem);

module.exports = router;
