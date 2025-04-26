"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRouter = express_1.default.Router();
userRouter.post("/login", UserController_1.login);
userRouter.post("/signup", UserController_1.signup);
userRouter.post("/logout", authMiddleware_1.AuthMiddleware, UserController_1.logout);
userRouter.post("/refresh-token", UserController_1.refreshAccessToken);
exports.default = userRouter;
