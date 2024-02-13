const express = require("express");
const authenticate = require("../middlewares/authenticate");
const productController = require("../controllers/product-controller");

const router = express.Router();

router.post("/product/brand", authenticate, productController.createBrand);
router.post("/product", authenticate, productController.createProduct);
module.exports = router;
