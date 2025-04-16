"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AddressController_1 = require("../controllers/AddressController");
const addressRouter = express_1.default.Router();
addressRouter.post("/add", AddressController_1.addAddress);
addressRouter.put("/update", AddressController_1.updateAddress);
addressRouter.get("/:userId", AddressController_1.getUserAddress);
addressRouter.delete("/:addressId", AddressController_1.deleteAddress);
exports.default = addressRouter;
