import { Request, Response } from "express";
import IProduct from "../types/IProduct";
import ProductModel from "../models/ProductModel";
import ProviderModel from "../models/ProviderModel";

export const addProduct = async (req: Request, res: Response) => {
  try {
    const productData: IProduct = req.body;
    const productExists = await ProductModel.findOne({
      name: productData.name,
    });
    if (productExists) {
      res
        .status(409)
        .json({ success: false, message: "Product already exists" });
      return;
    }

    const newProduct = new ProductModel(productData);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ success: false, message: "Error adding product" });
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
      date,
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
      const providers = await ProviderModel.find({
        locations: { $in: [location] },
      });

      if (providers.length > 0) {
        const providerIds = providers.map((p) => p._id);
        query.providerId = { $in: providerIds };
      } else {
        res.status(200).json({
          success: true,
          data: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: Number(page),
        });
        return;
      }
    }

    if (date) {
      const selectedDate = new Date(date as string);
      selectedDate.setHours(0, 0, 0, 0);

      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      query.datesAvailable = {
        $elemMatch: {
          $gte: selectedDate,
          $lt: nextDay,
        },
      };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const totalCount = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalCount / Number(limit));

    const data = await ProductModel.find(query)
      .populate("categoryId")
      .populate({
        path: "providerId",
        populate: {
          path: "locations",
          model: "Location",
        },
      })
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
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching products" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 6;
    const search = req.query.search as string | undefined;

    if (page < 1 || limit < 1) {
      res
        .status(400)
        .json({ success: false, message: "Invalid page or limit" });
    }

    const query: any = {};
    if (search && search.trim()) {
      query.name = { $regex: search.trim(), $options: "i" };
    }

    const totalCount = await ProductModel.countDocuments(query);
    const skip = (page - 1) * limit;
    const data = await ProductModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();
    const totalPages = Math.ceil(totalCount / limit) || 1;

    res.status(200).json({
      success: true,
      data,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error("Error fetching all products:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching all products" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productData: Partial<IProduct> = req.body;
    const updatedData = await ProductModel.findByIdAndUpdate(
      productData._id,
      productData,
      { new: true }
    );
    if (!updatedData) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const deletedData = await ProductModel.findByIdAndDelete(productId);
    if (!deletedData) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productDetails = await ProductModel.findById(productId)
      .populate("categoryId")
      .populate({
        path: "providerId",
        populate: {
          path: "locations",
          model: "Location",
        },
      });
    if (!productDetails) {
      res.status(404).json({ success: false, message: "Product not found" });
      return;
    }
    res.status(200).json({ success: true, data: productDetails });
  } catch (error) {
    console.error("Error fetching product details:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching product details" });
  }
};
