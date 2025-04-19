import express from "express";
import {
  addProvider,
  getProviders,
  updateProvider,
} from "../controllers/ProviderController";
import { AuthMiddleware, Authorize } from "../middlewares/authMiddleware";

const providerRouter = express.Router();

providerRouter.get("/", getProviders);

providerRouter.use(AuthMiddleware, Authorize("admin"));
providerRouter.post("/add", addProvider);
providerRouter.put("/update", updateProvider);

export default providerRouter;
