"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const orderRouter = express_1.default.Router();
orderRouter.post("/add", OrderController_1.addOrder);
orderRouter.put("/update/:orderId", OrderController_1.updateOrder);
orderRouter.get("/", OrderController_1.getAllOrders);
orderRouter.get("/:userId", OrderController_1.getUserOrders);
orderRouter.get("/:orderId", OrderController_1.getOrderDetails);
exports.default = orderRouter;
