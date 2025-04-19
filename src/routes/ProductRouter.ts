import express from "express";
import {
  addProduct,
  getProductDetails,
  getProducts,
  getProductsUserSide,
  updateProduct,
} from "../controllers/ProductController";
import { AuthMiddleware, Authorize } from "../middlewares/authMiddleware";

const productRouter = express.Router();

productRouter.get("/all-products", getProductsUserSide);
productRouter.get("/:productId", getProductDetails);

productRouter.use(AuthMiddleware, Authorize("admin"));
productRouter.get("/", getProducts);
productRouter.post("/add", addProduct);
productRouter.put("/update", updateProduct);

export default productRouter;
