const express = require("express");
const productController = require("../controllers/product-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/product/brand", productController.createBrand);
router.post("/product", productController.createProduct);

router.post(
  "/image",
  upload.single("image"),
  productController.createProductImage
);

module.exports = router;
