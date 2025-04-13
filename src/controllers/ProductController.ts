import { Request, Response } from "express";
import IProduct from "../types/IProduct";
import ProductModal from "../models/ProductModel";
import ProviderModal from "../models/ProviderModel";

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

export const getProductsUserSide = async (req: Request, res: Response) => {
  try {
    const {
      search,
      minPrice,
      maxPrice,
      category,
      location,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const query: any = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (category) {
      query.categoryId = category;
    }

    if (location) {
      const providers = await ProviderModal.find({ location });
      const providerIds = providers.map((p) => p._id);
      query.providerId = { $in: providerIds };
    }

    if (startDate || endDate) {
      query.datesAvailable = {};
      if (startDate) query.datesAvailable.$gte = new Date(startDate as string);
      if (endDate) query.datesAvailable.$lte = new Date(endDate as string);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const totalCount = await ProductModal.countDocuments(query);
    const totalPages = Math.ceil(totalCount / Number(limit));

    const data = await ProductModal.find(query)
      .populate("categoryId")
      .populate("providerId")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data,
      totalCount,
      totalPages,
      currentPage: Number(page),
    });
  } catch (error) {
    console.log("error fetching products", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching products" });
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

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productDetails = await ProductModal.findById(productId);
    res.status(200).json({ success: true, data: productDetails });
  } catch (error) {
    console.log("error fetching product details", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching product details" });
  }
};
