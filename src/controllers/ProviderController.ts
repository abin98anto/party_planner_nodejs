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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";
    const skip = (page - 1) * limit;

    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { company: { $regex: search, $options: "i" } },
          ],
          isDeleted: false,
        }
      : { isDeleted: false };

    const [providers, totalCount] = await Promise.all([
      ProviderModal.find(searchFilter)
        .populate("locations")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      ProviderModal.countDocuments(searchFilter),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      data: providers,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    });
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
