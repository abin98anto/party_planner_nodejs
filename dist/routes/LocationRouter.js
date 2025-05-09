"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LocationController_1 = require("../controllers/LocationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const locationRouter = express_1.default.Router();
locationRouter.get("/", LocationController_1.getLocations);
locationRouter.use(authMiddleware_1.AuthMiddleware, (0, authMiddleware_1.Authorize)("admin"));
locationRouter.post("/add", LocationController_1.addLocation);
locationRouter.put("/update", LocationController_1.updateLocation);
exports.default = locationRouter;
