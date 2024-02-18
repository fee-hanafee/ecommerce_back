const prisma = require("../model/prisma");

exports.createBrand = (data) => prisma.brand.create({ data });




exports.createProduct = (product) =>
  prisma.product.create({
    data: { ...product, brandId: +product.brandId },
  });

exports.createImage = (product) =>
  prisma.image.create({
    data: { image: product.image, productId: +product.productId },
  });

exports.updateBrand = (data) =>
  prisma.brand.update({ data: { name: data.name }, where: { id: +data.id } });

exports.createType = (type) => prisma.type.create({ data: { type } });

exports.updateProduct = (data, id) =>
  prisma.product.update({
    data: { ...data },
    where: { id: +id },
  });

exports.getAllOrder = () =>
  prisma.order.findMany({ include: { orderItem: true } });

  exports.getAllCustomer = () => prisma.user.findMany()
exports.deleteProduct = (id) => prisma.product.delete({ where: { id } });
exports.deleteImage = (id) => prisma.image.deleteMany({ where: { id } });

exports.updateOrder = (data, id) =>
  prisma.order.update({ data, where: { id } });
exports.updateOrderItem = (data, id) =>
  prisma.orderItem.update({ data, where: { id } });
