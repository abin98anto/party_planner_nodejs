"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedProductSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.SelectedProductSchema = new mongoose_1.default.Schema({
    productId: {
        type: String,
        ref: "Product",
        required: true,
    },
    selectedDates: { type: [Date], required: true },
    locationId: { type: String, ref: "Location", required: true },
});
const CartSchema = new mongoose_1.default.Schema({
    userId: { type: String, ref: "User", required: true },
    products: { type: [exports.SelectedProductSchema], default: [] },
}, { timestamps: true });
const CartModel = mongoose_1.default.model("Cart", CartSchema);
exports.default = CartModel;
