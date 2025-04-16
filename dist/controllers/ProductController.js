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
exports.getProductDetails = exports.updateProduct = exports.getProducts = exports.getProductsUserSide = exports.addProduct = void 0;
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const ProviderModel_1 = __importDefault(require("../models/ProviderModel"));
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const newProduct = new ProductModel_1.default(productData);
        yield newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    }
    catch (error) {
        console.log("error adding product", error);
        res.status(500).json({ success: false, message: "error adding product" });
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
                console.log("Found providers with location", location, ":", providerIds);
            }
            else {
                console.log("No providers found with location:", location);
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
            const dateString = date;
            query.$expr = {
                $in: [
                    {
                        $substr: [
                            {
                                $dateToString: { date: "$datesAvailable", format: "%Y-%m-%d" },
                            },
                            0,
                            10,
                        ],
                    },
                    [dateString],
                ],
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
        console.log("error fetching products", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching products" });
    }
});
exports.getProductsUserSide = getProductsUserSide;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield ProductModel_1.default.find();
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log("error fetching all products", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching all products" });
    }
});
exports.getProducts = getProducts;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const updatedData = yield ProductModel_1.default.findByIdAndUpdate(productData._id, productData);
        res.status(200).json({ success: true, data: updatedData });
    }
    catch (error) {
        console.log("error updating product", error);
        res.status(500).json({ success: false, message: "error updating product" });
    }
});
exports.updateProduct = updateProduct;
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
        res.status(200).json({ success: true, data: productDetails });
    }
    catch (error) {
        console.log("error fetching product details", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching product details" });
    }
});
exports.getProductDetails = getProductDetails;
