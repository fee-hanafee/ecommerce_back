const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const jwtService = require("../services/jwt-service");
const userService = require("../services/user-service");

const authenticate = catchError(async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer"))
    createError("Invalid unauthenticate", 400);

  const token = authorization.split(" ")[1];

  const decode = jwtService.vertify(token);

  const user = await userService.findUserById(decode.userId);

  if (!user) createError("user was not found", 401);

  delete user.password;

  req.user = user;

  next();
});

module.exports = authenticate;
