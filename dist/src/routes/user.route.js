"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../modules/user");
const router = express_1.default.Router();
router.post('/', user_1.userController.createUser);
router.get('/', user_1.userController.getUSer);
exports.default = router;
//# sourceMappingURL=user.route.js.map