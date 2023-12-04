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
exports.verifyPass = exports.getUserByEmail = exports.createUser = void 0;
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("./user.model"));
const errors_1 = require("../errors");
const user_helperFunctions_1 = require("./user.helperFunctions");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (userBody) => __awaiter(void 0, void 0, void 0, function* () {
    const emailCheck = (0, isEmail_1.default)(userBody.email);
    const emailTaken = yield (0, user_helperFunctions_1.isEmailTaken)(userBody.email);
    if (!emailCheck) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, "Invalid Email");
    }
    if (emailTaken) {
        throw new errors_1.ApiError(http_status_1.default.BAD_REQUEST, "Email is already Taken");
    }
    return user_model_1.default.create(Object.assign(Object.assign({}, userBody), { password: yield bcryptjs_1.default.hash("password1", 8) }));
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({
        email: email,
    });
    return user;
});
exports.getUserByEmail = getUserByEmail;
const verifyPass = (pass, hash) => {
    const isMatch = bcryptjs_1.default.compare(pass, hash);
    return isMatch;
};
exports.verifyPass = verifyPass;
//# sourceMappingURL=user.service.js.map