"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductDetails = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.getProductsUserSide = exports.addProduct = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const ProviderModel_1 = __importDefault(require("../models/ProviderModel"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const productExists = yield ProductModel_1.default.findOne({
            name: productData.name,
        });
        if (productExists) {
            res
                .status(409)
                .json({ success: false, message: "Product already exists" });
            return;
        }
        const newProduct = new ProductModel_1.default(productData);
        yield newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Error adding product" });
    }
});
exports.addProduct = addProduct;
const getProductsUserSide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, minPrice, maxPrice, category, location, date, page = 1, limit = 10, } = req.query;
        const query = { isActive: true };
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice)
                query.price.$gte = Number(minPrice);
            if (maxPrice)
                query.price.$lte = Number(maxPrice);
        }
        if (category) {
            query.categoryId = category;
        }
        if (location) {
            const providers = yield ProviderModel_1.default.find({
                locations: { $in: [location] },
            });
            if (providers.length > 0) {
                const providerIds = providers.map((p) => p._id);
                query.providerId = { $in: providerIds };
            }
            else {
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
            const selectedDate = new Date(date);
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
        const totalCount = yield ProductModel_1.default.countDocuments(query);
        const totalPages = Math.ceil(totalCount / Number(limit));
        const data = yield ProductModel_1.default.find(query)
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
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res
            .status(500)
            .json({ success: false, message: "Error fetching products" });
    }
});
exports.getProductsUserSide = getProductsUserSide;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 6;
        const search = req.query.search;
        if (page < 1 || limit < 1) {
            res
                .status(400)
                .json({ success: false, message: "Invalid page or limit" });
        }
        const query = {};
        if (search && search.trim()) {
            query.name = { $regex: search.trim(), $options: "i" };
        }
        const totalCount = yield ProductModel_1.default.countDocuments(query);
        const skip = (page - 1) * limit;
        const data = yield ProductModel_1.default.find(query)
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
    }
    catch (error) {
        console.error("Error fetching all products:", error);
        res
            .status(500)
            .json({ success: false, message: "Error fetching all products" });
    }
});
exports.getProducts = getProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const updatedData = yield ProductModel_1.default.findByIdAndUpdate(productData._id, productData, { new: true });
        if (!updatedData) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({ success: true, data: updatedData });
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ success: false, message: "Error updating product" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedData = yield ProductModel_1.default.findByIdAndDelete(productId);
        if (!deletedData) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
});
exports.deleteProduct = deleteProduct;
const getProductDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productDetails = yield ProductModel_1.default.findById(productId)
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
    }
    catch (error) {
        console.error("Error fetching product details:", error);
        res
            .status(500)
            .json({ success: false, message: "Error fetching product details" });
    }
});
exports.getProductDetails = getProductDetails;
