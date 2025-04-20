"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const orderRouter = express_1.default.Router();
orderRouter.use(authMiddleware_1.AuthMiddleware);
orderRouter.get("/:orderId", OrderController_1.getOrderDetails);
orderRouter.get("/:userId", OrderController_1.getUserOrders);
orderRouter.post("/add", OrderController_1.addOrder);
orderRouter.put("/update/:orderId", OrderController_1.updateOrder);
orderRouter.use((0, authMiddleware_1.Authorize)("admin"));
orderRouter.get("/", OrderController_1.getAllOrders);
exports.default = orderRouter;
