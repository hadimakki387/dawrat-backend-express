import mongoose from "mongoose";
import app from "./src/app";
import { config } from "./src/config/config";
import { logger } from "./src/modules/logger";

import dotenv from "dotenv"

const env = dotenv.config()


let server:any;
mongoose.connect(env.parsed?.['MONGO_URL'] !== undefined ? env.parsed?.['MONGO_URL']:config.mongoose.url).then(() => {
  logger.info("Connected to MongoDB");
  server = app.listen(process.env["PORT"] || config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
