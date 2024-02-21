const prisma = require("../model/prisma");

exports.getProduct = () =>
  prisma.product.findMany({
    include: {
      image: true,
      brand:true,
      type:true
    },
    
  });
