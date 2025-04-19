import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
} from "../controllers/CategoryController";
import { AuthMiddleware, Authorize } from "../middlewares/authMiddleware";

const categoryRouter = express.Router();

categoryRouter.get("/", getCategories);

categoryRouter.use(AuthMiddleware, Authorize("admin"));
categoryRouter.post("/add", addCategory);
categoryRouter.put("/update", updateCategory);

export default categoryRouter;
