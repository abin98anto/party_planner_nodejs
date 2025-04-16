"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProviderController_1 = require("../controllers/ProviderController");
const providerRouter = express_1.default.Router();
providerRouter.get("/", ProviderController_1.getProviders);
providerRouter.post("/add", ProviderController_1.addProvider);
providerRouter.put("/update", ProviderController_1.updateProvider);
exports.default = providerRouter;
