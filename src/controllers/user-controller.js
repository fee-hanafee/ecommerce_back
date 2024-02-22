const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const userService = require("../services/user-service");
const uploadService = require("../services/upload-service");

function checkUSer (role) {
  if (role != "USER") createError("unauthorized", 403);
}
exports.createCart = catchError(async (req, res, next) => {
  checkUSer(req.user.role)
  const cart = await userService.findProductByuserId(req.user.id);

  const productIdCart = cart.map((el) => {
    return el.productId;
  });

  if (productIdCart.includes(req.body.productId)) {
    let ID 
    cart.map((el) => {
      if (el.productId == req.body.productId) {
        ID = el.id;
      }
    });
    const item = await userService.updateCart(ID);
    return res.status(201).json({ item });
  }

  const data = {};
  data.userId = req.user.id;
  data.productId = req.body.productId;
  const item = await userService.createCart(data);

  res.status(201).json({ item });
});

exports.createOrder = catchError(async (req, res, next) => {
  checkUSer(req.user.role)
  const data = {};

  const item = await userService.findProductByuserId(req.user.id);

  const totalPrice = item.reduce((acc, el) => {
    acc += +el.product.price * el.amount;
    return acc;
  }, 0);

  data.totalPrice = totalPrice;
  data.userId = req.user.id;
  data.adress = req.body.adress;
  data.image = await uploadService.upload(req.file.path);

  console.log(req.file);
  console.log(req.body);
  const order = await userService.createOrder(data);

  const dataItem = item.map((el) => ({
    orderId: order.id,
    amount: el.amount,
    productId: el.productId,
  }));

  const orderItem = await userService.createOrderItem(dataItem);

  const updateStatus = await userService.updateStatusCart(data.userId);
  res.status(201).json({ orderItem });
});

exports.getCart = catchError(async (req, res, next) => {
  checkUSer(req.user.role)
  const item = await userService.getCart(req.user.id);

  res.status(200).json({ item });
});

exports.updateItemCart = catchError(async (req, res, next) => {
  checkUSer(req.user.role)
  const id = req.body.id;
  delete req.body.id;

  console.log(id);
  console.log(req.body);
  const item = await userService.updateItemCart(id, req.body);

  res.status(200).json({ item });
});

exports.deleteItemCart = catchError(async (req, res, next) => {
  await userService.deleteItemCart(+req.params.id);

  res.status(200).json({ message: "delete success" });
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
  const check = await userService.findOrder(req.user.id);
  console.log(req.body);
  const arr = check.map((el) => el.id);

  if (!arr.includes(req.body.id)) createError("unauthorized", 400);

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
