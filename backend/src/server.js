const mongoose = require("mongoose");
const app = require("./app");
const env = require("./config/env");
const connectDatabase = require("./config/db");
const bootstrapSuperAdmin = require("./services/SuperAdmin");

const startServer = async () => {
  try {
    await connectDatabase();
    const bootstrapResult = await bootstrapSuperAdmin();
    if (bootstrapResult.created) {
      console.log("Default super admin created: username=superadmin");
    }

    const server = app.listen(env.port, () => {
      console.log(
        `Server running on port ${env.port} in ${env.nodeEnv} mode`
      );
    });

    const shutdown = (signal) => {
      console.log(`${signal} received. Closing server gracefully...`);
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
