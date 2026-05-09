const dotenv = require("dotenv");

dotenv.config();

const requiredVariables = [
  "PORT",
  "MONGODB_URI",
  "CLIENT_URL",
  "NODE_ENV",
  "JWT_USER_SECRET",
  "JWT_ADMIN_SECRET",
];

requiredVariables.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  clientUrl: process.env.CLIENT_URL,
  jwtUserSecret: process.env.JWT_USER_SECRET,
  jwtAdminSecret: process.env.JWT_ADMIN_SECRET,
  jwtUserExpiresIn: process.env.JWT_USER_EXPIRES_IN || "7d",
  jwtAdminExpiresIn: process.env.JWT_ADMIN_EXPIRES_IN || "7d",
};

module.exports = env;
