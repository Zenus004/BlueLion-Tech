const mongoose = require("mongoose");
const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/db");
const bootstrapSuperAdmin = require("./services/SuperAdmin");
const logger = require("./utils/logger");

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Promise Rejection", { reason: String(reason), promise: String(promise) });
  process.exit(1);
});

// Handle uncaught exceptions globally
process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", { message: err.message, stack: err.stack });
  process.exit(1);
});

const startServer = async () => {
  try {
    await connectDatabase();
    logger.info("Database connected successfully");

    const bootstrapResult = await bootstrapSuperAdmin();
    if (bootstrapResult.created) {
      logger.info("Default super admin created: username=superadmin");
    }

    const server = app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
    });

    const shutdown = (signal) => {
      logger.info(`${signal} received. Closing server gracefully...`);
      server.close(async () => {
        await mongoose.connection.close();
        logger.info("Database connection closed. Process exiting.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    logger.error("Failed to start server", { message: error.message, stack: error.stack });
    process.exit(1);
  }
};

startServer();
