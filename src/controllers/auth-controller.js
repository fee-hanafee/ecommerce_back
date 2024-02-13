const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existUser = await userService.findUserByEmailOrMobile(
    req.body.email || req.body.mobile
  );

  if (existUser) createError("EMAIL_MOBILE_IN_USE", 400);

  req.body.password = await hashService.hash(req.body.password);

  const newUser = await userService.createUser(req.body);

  delete newUser.password;

  res.status(201).json({ newUser });
});

exports.login = catchError(async (req, res, next) => {
  const existUser = await userService.findUserByEmailOrMobile(
    req.body.emailOrMobile
  );
  console.log(existUser);
  if (!existUser) createError("invalid user", 400);

  const isMatch = await hashService.compere(
    req.body.password,
    existUser.password
  );

  if (!isMatch) createError("invalid user", 400);
  const payload = { userId: existUser.id };

  const accessToken = jwtService.sign(payload);

  delete existUser.password;

  res.status(200).json({ accessToken, user: existUser });
});

exports.me = catchError(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});
