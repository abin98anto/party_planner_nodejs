"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartController_1 = require("../controllers/CartController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const cartRouter = express_1.default.Router();
cartRouter.use(authMiddleware_1.AuthMiddleware);
cartRouter.post("/add/:userId", CartController_1.addToCart);
cartRouter.put("/remove/:userId", CartController_1.removeFromCart);
cartRouter.delete("/:cartId", CartController_1.deleteCart);
cartRouter.get("/user/:userId", CartController_1.getCart);
exports.default = cartRouter;
