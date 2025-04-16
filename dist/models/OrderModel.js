"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CartModel_1 = require("./CartModel");
const OrderSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        ref: "User",
        required: true,
    },
    productIds: {
        type: [CartModel_1.SelectedProductSchema],
        required: true,
    },
    providerIds: {
        type: [String],
        ref: "Provider",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "CANCELLED", "COMPLETED"],
        default: "PENDING",
    },
}, {
    timestamps: true,
});
const OrderModel = mongoose_1.default.model("Order", OrderSchema);
exports.default = OrderModel;
