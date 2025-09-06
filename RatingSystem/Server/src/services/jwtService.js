const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret";
const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

exports.sign = (payload) => {
  return jwt.sign(payload, secret, { expiresIn });
};

exports.verify = (token) => {
  return jwt.verify(token, secret);
};
