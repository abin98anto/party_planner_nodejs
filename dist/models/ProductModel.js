"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    name: String,
    description: String,
    categoryId: { type: String, ref: "Category" },
    providerId: { type: String, ref: "Provider" },
    images: [String],
    price: Number,
    datesAvailable: [Date],
    isActive: Boolean,
}, {
    timestamps: true,
});
const ProductModal = mongoose_1.default.model("Product", ProductSchema);
exports.default = ProductModal;
