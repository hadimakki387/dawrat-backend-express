"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateQueryUsersRole = exports.validateCreateUserRole = void 0;
const http_status_1 = __importDefault(require("http-status"));
const validateRolePermission = (role, requestedRole) => {
    if (role === "upper_admin") {
        return true;
    }
    if (role === "admin" && requestedRole === "user") {
        return true;
    }
    return false;
};
const validateCreateUserRole = (req, res, next) => {
    if (validateRolePermission(req.user.role, req.body.role)) {
        return next();
    }
    res.status(http_status_1.default.FORBIDDEN).send("Permission denied");
};
exports.validateCreateUserRole = validateCreateUserRole;
const validateQueryUsersRole = (req, res, next) => {
    if (!req.query['role'])
        req.query['role'] = 'user';
    if (validateRolePermission(req.user.role, req.query['role'])) {
        return next();
    }
    res.status(http_status_1.default.FORBIDDEN).send("Permission denied");
};
exports.validateQueryUsersRole = validateQueryUsersRole;
//# sourceMappingURL=user.middleware.js.map