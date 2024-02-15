const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const userService = require("../services/user-service");

exports.createOrder = catchError(async (req, res, next) => {
  const data = {};
  data.productId = req.body.productId;
  data.amount = req.body.amount;
  delete req.body.amount;
  delete req.body.productId;

  req.body.userId = req.user.id;

  const order = await userService.createOrder(req.body);

  data.orderId = order.id;

  console.log(data);
  const orderItem = await userService.createOrderItem(data);

  console.log(orderItem);

  res.status(201).json({ order, orderItem });
});
exports.updateProfile = catchError(async (req, res, next) => {});

exports.deleteOrder = catchError(async (req, res, next) => {
  await userService.deleteOrderItem(req.body.id);
  console.log(req.body.id);
  await userService.deleteOrder(req.body.id);

  res.status(201).json({ message: "delete success" });
});

exports.deleteOrderItem = catchError(async (req, res, next) => {
  await userService.deleteOneOrderItem(req.body.id);

  res.status(201).json({ message: "delete success" });
});

exports.getMe = catchError(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});

exports.getOrder = catchError(async (req, res, next) => {
  const order = await userService.findOrder(req.user.id);

  console.log(req.user.id);
  res.status(200).json({ order });
});

exports.updateOrder = catchError(async (req, res, next) => {
  if (req.user.id != req.body.id) createError("unauthorized", 400);

  const id = req.body.id;
  delete req.body.id;
  const respon = await userService.updateOrder(req.body, id);

  res.status(200).json({ respon });
});

exports.updateOrderItem = catchError(async (req, res, next) => {
  const existOrder = await userService.findOrder(req.user.id);
  if (!existOrder) createError("unauthorized", 400);

  const id = req.body.id;
  delete req.body.id;
  const update = await userService.updateOrderItem(req.body, id);

  res.json({ update });
});
