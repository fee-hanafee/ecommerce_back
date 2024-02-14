const express = require("express");
const productController = require("../controllers/product-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

// create
router.post("/product/brand", productController.createBrand);
router.post("/product", productController.createProduct);

router.post(
  "/image",
  upload.single("image"),
  productController.createProductImage
);

// update
router.patch("/product/brand", productController.updateBrand);
router.patch("/product", productController.updataProduct);
// router.patch("/image")

module.exports = router;
