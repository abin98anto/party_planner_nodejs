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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const HashPassword_1 = __importDefault(require("../utils/HashPassword"));
const constants_1 = __importDefault(require("../utils/constants"));
const jwt_1 = require("../utils/jwt");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const userExists = yield UserModel_1.default.findOne({ email: userData.email });
        if (userExists) {
            res.status(409).json({ message: "Email is taken." });
            return;
        }
        const hashedPassword = yield (0, HashPassword_1.default)(userData.password);
        const newUser = new UserModel_1.default(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
        yield newUser.save();
        res.status(200).json({ success: true, data: newUser });
    }
    catch (error) {
        console.log("error in user signup", error);
        res.status(500).json({ success: false, message: constants_1.default.SERVER_ERR });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body.userData;
        const user = yield UserModel_1.default.findOne({ email: userData.email });
        if (!user ||
            !(yield bcrypt_1.default.compare(userData.password, user.password)) ||
            userData.role !== user.role) {
            res.status(409).json({ message: constants_1.default.USER_NOT_FOUND });
            return;
        }
        const accessToken = (0, jwt_1.generateAccessToken)({
            _id: user._id.toString(),
            email: user.email,
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)({
            _id: user._id.toString(),
            email: user.email,
        });
        const plainUser = JSON.parse(JSON.stringify(user));
        const { password: pass } = plainUser, otherData = __rest(plainUser, ["password"]);
        res
            .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 30 * 1000,
        })
            .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
            .status(200)
            .json({ success: true, data: otherData });
    }
    catch (error) {
        console.log("error in user login", error);
        res.status(500).json({ message: constants_1.default.SERVER_ERR });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res
            .clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
            .clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
            .status(200)
            .json({ message: "logout successful" });
        return;
    }
    catch (error) {
        console.log("logout failed", error);
        res.status(400).json({ success: false, message: "logout failed" });
        return;
    }
});
exports.logout = logout;
