import { Request, Response } from "express";
import ILocation from "../types/ILocation";
import LocationModel from "../models/LocationModel";

export const addLocation = async (req: Request, res: Response) => {
  try {
    const locationData: ILocation = req.body;
    const locationExists = await LocationModel.findOne({
      name: locationData.name,
      isDeleted: false,
    });
    if (locationExists) {
      res
        .status(409)
        .json({ success: false, message: "Location already exists" });
      return;
    }

    const newLocation = new LocationModel(locationData);
    await newLocation.save();
    res.status(201).json({ success: true, data: newLocation });
  } catch (error) {
    console.error("Error in add location:", error);
    res.status(500).json({ success: false, message: "Error adding location" });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 6, search = "" } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    const query: any = { isDeleted: false };
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const totalCount = await LocationModel.countDocuments(query);
    const data = await LocationModel.find(query)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum);

    const pagination = {
      totalCount,
      totalPages: Math.ceil(totalCount / limitNum),
      currentPage: pageNum,
      limit: limitNum,
    };

    res.status(200).json({ success: true, data, pagination });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching locations" });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const locationData: Partial<ILocation> = req.body;
    const updatedData = await LocationModel.findByIdAndUpdate(
      locationData._id,
      locationData,
      { new: true }
    );
    if (!updatedData) {
      res.status(404).json({ success: false, message: "Location not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error updating location:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating location" });
  }
};
