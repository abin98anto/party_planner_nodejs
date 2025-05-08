import { Request, Response } from "express";
import ICategory from "../types/ICategory";
import CategoryModel from "../models/CategoryModel";

export const addCategory = async (req: Request, res: Response) => {
  try {
    const categoryData: ICategory = req.body;
    const categoryExists = await CategoryModel.findOne({
      name: categoryData.name,
    });
    if (categoryExists) {
      res.status(409).json({ message: "Name is taken." });
      return;
    }

    const newCategory = new CategoryModel(categoryData);
    await newCategory.save();
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    console.log("error in add category", error);
    res.status(500).json({ success: false, message: "error in add category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const searchQuery = (req.query.search as string) || "";
    const skip = (page - 1) * limit;
    const query: any = { isDeleted: false };
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }
    const totalCount = await CategoryModel.countDocuments(query);

    const data = await CategoryModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.log("error fetching categories", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching categories" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryData: Partial<ICategory> = req.body;
    const updatedData = await CategoryModel.findByIdAndUpdate(
      categoryData._id,
      categoryData
    );
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.log("error updating category", error);
    res
      .status(500)
      .json({ success: false, message: "error updating category" });
  }
};
