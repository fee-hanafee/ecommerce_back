const prisma = require("../model/prisma");

exports.createBrand = (data) => prisma.brand.create({ data });

exports.createProduct = (product) =>
  prisma.product.create({
    data: { ...product, brandId: +product.brandId },
  });
