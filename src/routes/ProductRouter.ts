import express from "express";
import {
  addProduct,
  getProductDetails,
  getProducts,
  getProductsUserSide,
  updateProduct,
} from "../controllers/ProductController";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/add", addProduct);
productRouter.put("/update", updateProduct);
productRouter.get("/all-products", getProductsUserSide);
productRouter.get("/:productId", getProductDetails);

export default productRouter;
