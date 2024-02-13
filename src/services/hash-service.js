const bcrypt = require("bcryptjs");

exports.hash = (input) => bcrypt.hash(input, 12);

exports.compere = (plaintText, hashValue) =>
  bcrypt.compare(plaintText, hashValue);
