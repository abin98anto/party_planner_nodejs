import { Request, Response } from "express";
import IProduct from "../types/IProduct";
import ProductModal from "../models/ProductModel";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const productData: IProduct = req.body;
    const newProduct = new ProductModal(productData);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("error adding product", error);
    res.status(500).json({ success: false, message: "error adding product" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await ProductModal.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error fetching all products", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching all products" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData: Partial<IProduct> = req.body;
    const updatedData = await ProductModal.findByIdAndUpdate(
      productData._id,
      productData
    );
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.log("error updating product", error);
    res.status(500).json({ success: false, message: "error updating product" });
  }
};
