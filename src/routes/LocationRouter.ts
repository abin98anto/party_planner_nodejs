import express from "express";
import {
  addLocation,
  getLocations,
  updateLocation,
} from "../controllers/LocationController";

const locationRouter = express.Router();

locationRouter.get("/", getLocations);
locationRouter.post("/add", addLocation);
locationRouter.put("/update", updateLocation);

export default locationRouter;
