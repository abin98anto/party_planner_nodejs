import { Request, Response } from "express";
import IAddress from "../types/IAddress";
import AddressModel from "../models/AddressModel";

export const addAddress = async (req: Request, res: Response) => {
  try {
    const addressData: IAddress = req.body;
    const newAddress = new AddressModel(addressData);
    await newAddress.save();
    res.status(201).json({ success: true, data: newAddress });
  } catch (error) {
    console.log("error adding address", error);
    res.status(500).json({ success: false, message: "error in add address" });
  }
};

export const getUserAddress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await AddressModel.find({ userId, isDeleted: false });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error fetching user's addresses", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching user's addresses" });
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const addressData: Partial<IAddress> = req.body;
    const updatedData = await AddressModel.findByIdAndUpdate(
      addressData._id,
      addressData
    );
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.log("error updating address", error);
    res.status(500).json({ success: false, message: "error updating address" });
  }
};

export const deleteAddress = async (req: Request, res: Response) => {
  try {
    const { addressId } = req.params;
    await AddressModel.findByIdAndDelete(addressId);
    res.status(204).json({ success: true });
  } catch (error) {
    console.log("error deleting address", error);
    res.status(500).json({ success: false, message: "error deleting address" });
  }
};
