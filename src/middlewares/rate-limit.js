const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 1000,
  message: { message: "too many request in a given period" },
});
