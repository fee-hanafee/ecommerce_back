const prisma = require("../model/prisma");

exports.createBrand = (data) => prisma.brand.create({ data });

exports.createProduct = (product) =>
  prisma.product.create({
    data: { ...product, brandId: +product.brandId, typeId: +product.typeId },
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

exports.updateImage = (image, id) =>
  prisma.image.updateMany({ where: { productId: id }, data: { image } });

exports.getAllOrder = () =>
  prisma.order.findMany({ include: { orderItem: true } });

exports.getAllCustomer = () => prisma.user.findMany();
exports.deleteProduct = (id) =>
  prisma.product.update({ where: { id }, data: { isDeleted: true } });
exports.deleteImage = (productId) =>
  prisma.image.deleteMany({ where: { productId } });

exports.updateOrder = (data, id) =>
  prisma.order.update({ data, where: { id } });
exports.updateOrderItem = (data, id) =>
  prisma.orderItem.update({ data, where: { id } });

exports.deleteOrder = (id) => prisma.order.delete({ where: { id } });

exports.deleteOrderItem = (orderId) =>
  prisma.orderItem.deleteMany({ where: { orderId } });
