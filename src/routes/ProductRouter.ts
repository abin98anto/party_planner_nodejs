import express from "express";
import {
  addProduct,
  getProductDetails,
  getProducts,
  updateProduct,
} from "../controllers/ProductController";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/add", addProduct);
productRouter.put("/update", updateProduct);
productRouter.get("/:productId", getProductDetails);

export default productRouter;
