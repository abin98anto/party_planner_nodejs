"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProviderSchema = new mongoose_1.default.Schema({
    name: String,
    company: String,
    contact: Number,
    locations: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Location" }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
const ProviderModal = mongoose_1.default.model("Provider", ProviderSchema);
exports.default = ProviderModal;
