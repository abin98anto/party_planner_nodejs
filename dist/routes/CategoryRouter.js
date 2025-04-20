"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const categoryRouter = express_1.default.Router();
categoryRouter.get("/", CategoryController_1.getCategories);
categoryRouter.use(authMiddleware_1.AuthMiddleware, (0, authMiddleware_1.Authorize)("admin"));
categoryRouter.post("/add", CategoryController_1.addCategory);
categoryRouter.put("/update", CategoryController_1.updateCategory);
exports.default = categoryRouter;
