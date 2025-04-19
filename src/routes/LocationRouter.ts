import express from "express";
import {
  addLocation,
  getLocations,
  updateLocation,
} from "../controllers/LocationController";
import { AuthMiddleware, Authorize } from "../middlewares/authMiddleware";

const locationRouter = express.Router();

locationRouter.get("/", getLocations);

locationRouter.use(AuthMiddleware, Authorize("admin"));
locationRouter.post("/add", addLocation);
locationRouter.put("/update", updateLocation);

export default locationRouter;
