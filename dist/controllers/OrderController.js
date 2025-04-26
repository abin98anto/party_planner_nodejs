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
exports.getOrderDetails = exports.getAllOrders = exports.getUserOrders = exports.updateOrder = exports.addOrder = void 0;
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const addOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const newOrder = new OrderModel_1.default(orderData);
        const savedOrder = yield newOrder.save();
        res.status(201).json({ success: true, data: savedOrder });
    }
    catch (error) {
        console.log("error adding order", error);
        res.status(500).json({ success: false, message: "error adding order" });
    }
});
exports.addOrder = addOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const updatedOrder = yield OrderModel_1.default.findByIdAndUpdate(orderId, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, data: updatedOrder });
    }
    catch (error) {
        console.log("error updating order", error);
        res.status(500).json({ success: false, message: "error updating order" });
    }
});
exports.updateOrder = updateOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield OrderModel_1.default.find({ userId });
        res.status(200).json({ success: true, data: orders });
    }
    catch (error) {
        console.log("error fetching user orders", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching user orders" });
    }
});
exports.getUserOrders = getUserOrders;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const status = req.query.status;
        const skip = (page - 1) * limit;
        const filter = {};
        if (status && ["PENDING", "CANCELLED", "COMPLETED"].includes(status)) {
            filter.status = status;
        }
        const totalOrders = yield OrderModel_1.default.countDocuments(filter);
        const orders = yield OrderModel_1.default.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(totalOrders / limit);
        res.status(200).json({
            success: true,
            data: orders,
            currentPage: page,
            totalPages,
            totalOrders,
        });
    }
    catch (error) {
        console.log("error fetching all orders", error);
        res.status(500).json({ success: false, message: "error fetching orders" });
    }
});
exports.getAllOrders = getAllOrders;
const getOrderDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const order = yield OrderModel_1.default.findById(orderId);
        res.status(200).json({ success: true, data: order });
    }
    catch (error) {
        console.log("error fetching order details", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching order details" });
    }
});
exports.getOrderDetails = getOrderDetails;
