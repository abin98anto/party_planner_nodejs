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
    res.status(200).json({ success: true, data: newCategory });
  } catch (error) {
    console.log("error in add category", error);
    res.status(500).json({ success: false, message: "error in add category" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const data = await CategoryModel.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error fetching all categories", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching all categories" });
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
