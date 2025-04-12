import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
} from "../controllers/CategoryController";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);
categoryRouter.post("/add", addCategory);
categoryRouter.put("/update", updateCategory);

export default categoryRouter;