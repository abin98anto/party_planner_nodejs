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
exports.Authorize = exports.AuthMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.cookies["accessToken"];
        if (!accessToken) {
            res.status(401).json({ message: "access token not found." });
            return;
        }
        const decoded = (0, jwt_1.verifyAccessToken)(accessToken);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded._id)) {
            res.status(401).json({ message: "invalid jwt payload" });
            return;
        }
        const userData = yield UserModel_1.default.findById(decoded._id);
        if (!userData) {
            res.status(401).json({ message: "user not found." });
            return;
        }
        if (!userData.isActive) {
            res.status(401).json({ message: "user is blocked." });
            return;
        }
        req.user = userData;
        next();
    }
    catch (error) {
        console.log("error in auth middleware", error);
        res.status(401).json({ message: "invalid access token" });
    }
});
exports.AuthMiddleware = AuthMiddleware;
const Authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({ message: "invalid access token" });
            return;
        }
        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            res.status(403).json({ message: "access denined." });
            return;
        }
        next();
    };
};
exports.Authorize = Authorize;
