const env = require("../config/env");

const LOG_LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const CURRENT_LEVEL = env.nodeEnv === "production" ? LOG_LEVELS.info : LOG_LEVELS.debug;

function formatMessage(level, message, meta = {}) {
  if (env.nodeEnv === "production") {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta,
    });
  }
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
  return `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}${metaStr}`;
}

const logger = {
  error: (message, meta) => {
    if (CURRENT_LEVEL >= LOG_LEVELS.error) {
      console.error(formatMessage("error", message, meta));
    }
  },
  warn: (message, meta) => {
    if (CURRENT_LEVEL >= LOG_LEVELS.warn) {
      console.warn(formatMessage("warn", message, meta));
    }
  },
  info: (message, meta) => {
    if (CURRENT_LEVEL >= LOG_LEVELS.info) {
      console.info(formatMessage("info", message, meta));
    }
  },
  debug: (message, meta) => {
    if (CURRENT_LEVEL >= LOG_LEVELS.debug) {
      console.debug(formatMessage("debug", message, meta));
    }
  },
};

module.exports = logger;
