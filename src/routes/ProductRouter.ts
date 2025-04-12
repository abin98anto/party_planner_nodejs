import express from "express";
import {
  addProduct,
  getProducts,
  updateProduct,
} from "../controllers/ProductController";

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.post("/add", addProduct);
productRouter.put("/update", updateProduct);

export default productRouter;
