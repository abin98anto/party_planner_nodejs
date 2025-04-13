import { Request, Response } from "express";
import IProvider from "../types/IProvider";
import ProviderModal from "../models/ProviderModel";

export const addProvider = async (req: Request, res: Response) => {
  try {
    const providerData: IProvider = req.body;
    const newProvider = new ProviderModal(providerData);
    await newProvider.save();
    res.status(201).json({ success: true, data: newProvider });
  } catch (error) {
    console.log("error in add provider", error);
    res.status(500).json({ success: false, message: "error in add provider" });
  }
};

export const getProviders = async (req: Request, res: Response) => {
  try {
    const data = await ProviderModal.find({ isDeleted: false }).populate(
      "locations"
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error fetching all providers", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching all providers" });
  }
};

export const updateProvider = async (req: Request, res: Response) => {
  try {
    const providerData: Partial<IProvider> = req.body;
    const updatedData = await ProviderModal.findByIdAndUpdate(
      providerData._id,
      providerData
    );
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.log("error updating provider", error);
    res
      .status(500)
      .json({ success: false, message: "error updating provider" });
  }
};
