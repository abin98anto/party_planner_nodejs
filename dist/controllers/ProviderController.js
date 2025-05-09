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
exports.updateProvider = exports.getProviders = exports.addProvider = void 0;
const ProviderModel_1 = __importDefault(require("../models/ProviderModel"));
const addProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerData = req.body;
        const newProvider = new ProviderModel_1.default(providerData);
        yield newProvider.save();
        res.status(201).json({ success: true, data: newProvider });
    }
    catch (error) {
        console.log("error in add provider", error);
        res.status(500).json({ success: false, message: "error in add provider" });
    }
});
exports.addProvider = addProvider;
const getProviders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
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
        const [providers, totalCount] = yield Promise.all([
            ProviderModel_1.default.find(searchFilter)
                .populate("locations")
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            ProviderModel_1.default.countDocuments(searchFilter),
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
    }
    catch (error) {
        console.log("error fetching all providers", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching all providers" });
    }
});
exports.getProviders = getProviders;
const updateProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const providerData = req.body;
        const updatedData = yield ProviderModel_1.default.findByIdAndUpdate(providerData._id, providerData);
        res.status(200).json({ success: true, data: updatedData });
    }
    catch (error) {
        console.log("error updating provider", error);
        res
            .status(500)
            .json({ success: false, message: "error updating provider" });
    }
});
exports.updateProvider = updateProvider;
