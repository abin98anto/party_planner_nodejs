"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const productRouter = express_1.default.Router();
productRouter.get("/all-products", ProductController_1.getProductsUserSide);
productRouter.get("/:productId", ProductController_1.getProductDetails);
productRouter.use(authMiddleware_1.AuthMiddleware, (0, authMiddleware_1.Authorize)("admin"));
productRouter.get("/", ProductController_1.getProducts);
productRouter.post("/add", ProductController_1.addProduct);
productRouter.put("/update", ProductController_1.updateProduct);
exports.default = productRouter;
