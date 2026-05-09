const jwt = require("jsonwebtoken");
const env = require("../config/env");

const generateUserToken = (payload) => {
  return jwt.sign(payload, env.jwtUserSecret, {
    expiresIn: env.jwtUserExpiresIn,
  });
};

const generateAdminToken = (payload) => {
  return jwt.sign(payload, env.jwtAdminSecret, {
    expiresIn: env.jwtAdminExpiresIn,
  });
};

const verifyUserToken = (token) => jwt.verify(token, env.jwtUserSecret);
const verifyAdminToken = (token) => jwt.verify(token, env.jwtAdminSecret);

module.exports = {
  generateUserToken,
  generateAdminToken,
  verifyUserToken,
  verifyAdminToken,
};
