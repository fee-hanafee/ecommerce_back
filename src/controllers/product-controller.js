const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const productService = require("../services/product-service");
const userService = require("../services/user-service");
const jwtService = require("../services/jwt-service");

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
