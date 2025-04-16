import express from "express";
import {
  addProvider,
  getProviders,
  updateProvider,
} from "../controllers/ProviderController";

const providerRouter = express.Router();

providerRouter.get("/", getProviders);
providerRouter.post("/add", addProvider);
providerRouter.put("/update", updateProvider);

export default providerRouter;
