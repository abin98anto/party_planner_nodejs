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
exports.deleteAddress = exports.updateAddress = exports.getUserAddress = exports.addAddress = void 0;
const AddressModel_1 = __importDefault(require("../models/AddressModel"));
const addAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressData = req.body;
        const newAddress = new AddressModel_1.default(addressData);
        yield newAddress.save();
        res.status(201).json({ success: true, data: newAddress });
    }
    catch (error) {
        console.log("error adding address", error);
        res.status(500).json({ success: false, message: "error in add address" });
    }
});
exports.addAddress = addAddress;
const getUserAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield AddressModel_1.default.find({ userId, isDeleted: false });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log("error fetching user's addresses", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching user's addresses" });
    }
});
exports.getUserAddress = getUserAddress;
const updateAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const addressData = req.body;
        const updatedData = yield AddressModel_1.default.findByIdAndUpdate(addressData._id, addressData);
        res.status(200).json({ success: true, data: updatedData });
    }
    catch (error) {
        console.log("error updating address", error);
        res.status(500).json({ success: false, message: "error updating address" });
    }
});
exports.updateAddress = updateAddress;
const deleteAddress = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { addressId } = req.params;
        yield AddressModel_1.default.findByIdAndDelete(addressId);
        res.status(204).json({ success: true });
    }
    catch (error) {
        console.log("error deleting address", error);
        res.status(500).json({ success: false, message: "error deleting address" });
    }
});
exports.deleteAddress = deleteAddress;
