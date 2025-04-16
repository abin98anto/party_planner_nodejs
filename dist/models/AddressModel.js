"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AddressSchema = new mongoose_1.default.Schema({
    userId: { type: String, ref: "User" },
    venue: String,
    place: String,
    landmark: String,
    city: String,
    district: String,
    state: String,
    pincode: Number,
    phone: Number,
    isDeleted: Boolean,
}, {
    timestamps: true,
});
const AddressModel = mongoose_1.default.model("Address", AddressSchema);
exports.default = AddressModel;
