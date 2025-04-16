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
exports.updateLocation = exports.getLocations = exports.addLocation = void 0;
const LocationModel_1 = __importDefault(require("../models/LocationModel"));
const addLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locationData = req.body;
        const locationExists = yield LocationModel_1.default.findOne({
            name: locationData.name,
        });
        if (locationExists) {
            res.status(409).json({ message: "Location already exists" });
            return;
        }
        const newLocation = new LocationModel_1.default(locationData);
        yield newLocation.save();
        res.status(201).json({ success: true, data: newLocation });
    }
    catch (error) {
        console.log("error in add location", error);
        res.status(500).json({ success: false, message: "error in add Location" });
    }
});
exports.addLocation = addLocation;
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield LocationModel_1.default.find({ isDeleted: false });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log("error fetching all locations", error);
        res
            .status(500)
            .json({ success: false, message: "error fetching all locations" });
    }
});
exports.getLocations = getLocations;
const updateLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locationData = req.body;
        const updatedData = yield LocationModel_1.default.findByIdAndUpdate(locationData._id, locationData);
        res.status(200).json({ success: true, data: updatedData });
    }
    catch (error) {
        console.log("error updating location", error);
        res
            .status(500)
            .json({ success: false, message: "error updating location" });
    }
});
exports.updateLocation = updateLocation;
