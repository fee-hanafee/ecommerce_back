const express = require("express");
const userController = require("../controllers/user-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/cart", userController.createCart);
router.post("/order", upload.single("image"), userController.createOrder);

router.patch("/cart", userController.updateItemCart);
router.patch("/profile", userController.updateProfile);
router.patch("/order", userController.updateOrder);
router.patch("/orderItem", userController.updateOrderItem);

router.get("/cart", userController.getCart);
router.get("/order", userController.getOrder);
router.get("/profile", userController.getMe);
router.delete("/cart/:id", userController.deleteItemCart);
router.delete("/order", userController.deleteOrder);
router.delete("/orderItem", userController.deleteOrderItem);

module.exports = router;
