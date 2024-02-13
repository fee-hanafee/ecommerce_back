const Jwt = require("jsonwebtoken");

const SECRETKEY = process.env.JWT_SECRET;
const EXPIRE = process.env.JWT_EXPIRE;

exports.sign = (payload) => Jwt.sign(payload, SECRETKEY, { expiresIn: EXPIRE });

exports.vertify = (token) => Jwt.verify(token,SECRETKEY)
