"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./src/app"));
const config_1 = require("./src/config/config");
const logger_1 = require("./src/modules/logger");
const dotenv_1 = __importDefault(require("dotenv"));
const env = dotenv_1.default.config();
let server;
mongoose_1.default.connect(((_a = env.parsed) === null || _a === void 0 ? void 0 : _a['MONGO_URL']) !== undefined ? (_b = env.parsed) === null || _b === void 0 ? void 0 : _b['MONGO_URL'] : config_1.config.mongoose.url).then(() => {
    logger_1.logger.info("Connected to MongoDB");
    server = app_1.default.listen(process.env["PORT"] || config_1.config.port, () => {
        logger_1.logger.info(`Listening to port ${config_1.config.port}`);
    });
});
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger_1.logger.info("Server closed");
            process.exit(1);
        });
    }
    else {
        process.exit(1);
    }
};
const unexpectedErrorHandler = (error) => {
    logger_1.logger.error(error);
    exitHandler();
};
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
process.on("SIGTERM", () => {
    logger_1.logger.info("SIGTERM received");
    if (server) {
        server.close();
    }
});
//# sourceMappingURL=index.js.map