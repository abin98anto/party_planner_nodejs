import { Request, Response } from "express";
import ILocation from "../types/ILocation";
import LocationModel from "../models/LocationModel";

export const addLocation = async (req: Request, res: Response) => {
  try {
    const locationData: ILocation = req.body;
    const locationExists = await LocationModel.findOne({
      name: locationData.name,
    });
    if (locationExists) {
      res.status(409).json({ message: "Location already exists" });
      return;
    }

    const newLocation = new LocationModel(locationData);
    await newLocation.save();
    res.status(201).json({ success: true, data: newLocation });
  } catch (error) {
    console.log("error in add location", error);
    res.status(500).json({ success: false, message: "error in add Location" });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const data = await LocationModel.find({ isDeleted: false });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error fetching all locations", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching all locations" });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const locationData: Partial<ILocation> = req.body;
    const updatedData = await LocationModel.findByIdAndUpdate(
      locationData._id,
      locationData
    );
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.log("error updating location", error);
    res
      .status(500)
      .json({ success: false, message: "error updating location" });
  }
};
