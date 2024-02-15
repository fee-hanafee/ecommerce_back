const prisma = require("../model/prisma");

exports.findUserByEmailOrMobile = (emailOrMobile) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrMobile }, { mobile: emailOrMobile }],
    },
  });

exports.createUser = (data) => prisma.user.create({ data });

exports.findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
  });

exports.updateUserById = (data, id) =>
  prisma.user.update({ data, where: { id } });

exports.createOrder = (data) => prisma.order.create({ data });
exports.createOrderItem = (data) => prisma.orderItem.create({ data });

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
