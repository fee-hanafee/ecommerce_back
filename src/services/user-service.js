const prisma = require("../model/prisma");

exports.findUserByEmailOrMobile = (emailOrMobile) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    },
  });

exports.createCart = (data) => prisma.cart.create({ data });

exports.deleteItemCart = (id) => prisma.cart.delete({ where: { id } });

exports.updateCart = (id) =>
  prisma.cart.update({
    data: { amount: { increment: 1 } },
    where: { id },
  });

exports.updateItemCart = (id, data) =>
  prisma.cart.update({
    data,
    where: { id },
  });

exports.findProductByuserId = (userId) =>
  prisma.cart.findMany({ where: { userId }, include: { product: true } });

exports.createUser = (data) => prisma.user.create({ data });

exports.getCart = (userId) =>
  prisma.cart.findMany({
    where: { userId },
    include: { product: { include: { image: true } } },
  });

exports.findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
  });

exports.updateUserById = (data, id) =>
  prisma.user.update({ data, where: { id } });

exports.createOrder = (data) => prisma.order.create({ data });
exports.createOrderItem = (data) => prisma.orderItem.createMany({ data });

exports.deleteOrder = (id) => prisma.order.delete({ where: { id } });

exports.deleteOrderItem = (id) =>
  prisma.orderItem.deleteMany({ where: { orderId: id } });

exports.deleteOneOrderItem = (id) =>
  prisma.orderItem.deleteMany({ where: { id } });

exports.findOrder = (id) =>
  prisma.order.findMany({
    where: { userId: id },
    include: { orderItem: true },
  });

exports.updateOrder = (data, id) =>
  prisma.order.update({ data, where: { id } });

exports.updateOrderItem = (data, id) =>
  prisma.orderItem.update({ data, where: { id } });

exports.updateStatusCart = (userId) =>
  prisma.cart.deleteMany({where: { userId } });
