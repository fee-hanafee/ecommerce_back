const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const productService = require("../services/product-service");
const uploadService = require("../services/upload-service");

function checkAdmin(role) {
  if (role != "ADMIN") createError("unauthorized", 400);
}

exports.createBrand = catchError(async (req, res, next) => {
  checkAdmin(req.user.role);

  const respon = await productService.createBrand(req.body);
  res.status(201).json(respon);
});

exports.createProduct = catchError(async (req, res, next) => {
  checkAdmin(req.user.role);

  const product = await productService.createProduct(req.body);

  res.status(201).json({ product });
});

exports.createProductImage = catchError(async (req, res, next) => {
  checkAdmin(req.user.role);

  const data = { productId: req.body.productId };

  data.image = await uploadService.upload(req.file.path);
  console.log(data);
  const product = await productService.createImage(data);

  res.status(201).json({ product });
});

exports.updateBrand = catchError(async (req, res, next) => {
  checkAdmin(req.user.role);

  const brand = await productService.updateBrand(req.body);

  res.status(200).json({ brand });
});

exports.updataProduct = catchError(async (req, res, next) => {
  checkAdmin(req.user.role);
  const id = req.body.id;
  delete req.body.id;
  const product = await productService.updateProduct(req.body,id)
  res.status(200).json({ product, id });
});

exports.updateImage = catchError(async (req,res,next)=> {
  checkAdmin(req.user.role)
  
})