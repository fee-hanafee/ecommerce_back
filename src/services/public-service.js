const prisma = require("../model/prisma");

exports.getProduct = () =>
  prisma.product.findMany({
    where: { isDeleted: false },
    include: {
      image: true,
      brand: true,
      type: true,
    },
  });
