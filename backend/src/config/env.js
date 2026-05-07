const dotenv = require("dotenv");

dotenv.config();

const requiredVariables = ["PORT", "MONGODB_URI", "CLIENT_URL", "NODE_ENV"];

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
};

module.exports = env;
