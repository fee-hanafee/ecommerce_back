module.exports = function createError(msg, code) {
  const error = new Error(msg);
  error.statusCode = code;
  throw error;
};
