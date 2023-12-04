"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.saveToken = exports.generateToken = void 0;
const moment_1 = __importDefault(require("moment"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_model_1 = __importDefault(require("./token.model"));
const errors_1 = require("../errors");
const http_status_1 = __importDefault(require("http-status"));
const generateToken = (userId, expires, type, secret) => {
    const payload = {
        user: userId,
        createdAt: (0, moment_1.default)().unix(),
        expires: expires.unix(),
        type,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.generateToken = generateToken;
const saveToken = (token, userId, expires, type, blacklisted = false) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = yield token_model_1.default.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenData;
});
exports.saveToken = saveToken;
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.verify(token, 'helloWorld');
    if (typeof payload.sub !== 'string') {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, 'bad user');
    }
    const tokenDoc = yield token_model_1.default.findOne({
        token,
        type,
        user: payload.sub,
        blacklisted: false,
    });
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=token.service.js.map