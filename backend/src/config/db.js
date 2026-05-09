const mongoose = require("mongoose");
const env = require("./env");

const connectDatabase = async () => {
  const connection = await mongoose.connect(env.mongoUri);
  return connection;
};

module.exports = connectDatabase;
