"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const toJSON_1 = __importDefault(require("../toJSON/toJSON"));
const tokenSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: String,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
tokenSchema.plugin(toJSON_1.default);
const Token = mongoose_1.default.model('Token', tokenSchema);
exports.default = Token;
//# sourceMappingURL=token.model.js.map