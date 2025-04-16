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
exports.updateCategory = exports.getCategories = exports.addCategory = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        const categoryExists = yield CategoryModel_1.default.findOne({
            name: categoryData.name,
        });
        if (categoryExists) {
            res.status(409).json({ message: "Name is taken." });
            return;
        }
        const newCategory = new CategoryModel_1.default(categoryData);
        yield newCategory.save();
        res.status(201).json({ success: true, data: newCategory });
    }
    catch (error) {
        console.log("error in add category", error);
        res.status(500).json({ success: false, message: "error in add category" });
    }
});
exports.addCategory = addCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield CategoryModel_1.default.find({ isDeleted: false });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log("error fetching all categories", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching all categories" });
    }
});
exports.getCategories = getCategories;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        const updatedData = yield CategoryModel_1.default.findByIdAndUpdate(categoryData._id, categoryData);
        res.status(200).json({ success: true, data: updatedData });
    }
    catch (error) {
        console.log("error updating category", error);
        res
            .status(500)
            .json({ success: false, message: "error updating category" });
    }
});
exports.updateCategory = updateCategory;
