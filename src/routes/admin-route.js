const express = require("express");
const productController = require("../controllers/product-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

// create
router.post("/product/brand", productController.createBrand);
router.post("/product", productController.createProduct);
router.post("/type", productController.createType);
router.post(
  "/image",
  upload.single("image"),
  productController.createProductImage
);
router.get("/order", productController.getAllOrder);
router.get("/customer",productController.getCustomer)
router.delete("/product/:id", productController.deleteProduct);
// update
router.patch("/order", productController.updateOrder);
router.patch("/orderItem", productController.updateOrderItem);
router.patch("/product/brand", productController.updateBrand);
router.patch("/product", productController.updataProduct);
router.patch("/product/image",upload.single("image"),productController.updateImage)
// router.patch("/image")
router.delete("/order/:id",productController.deleteOrder)

module.exports = router;
