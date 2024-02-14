const express = require("express");

const publicController = require("../controllers/public-controller");

const router = express.Router();

router.post("/order", publicController.createOrder);
router.delete("/order", publicController.deleteOrder);

module.exports = router;
