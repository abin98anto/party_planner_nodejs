"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LocationSchema = new mongoose_1.default.Schema({
    name: { type: String, unique: true },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const LocationModel = mongoose_1.default.model("Location", LocationSchema);
exports.default = LocationModel;
