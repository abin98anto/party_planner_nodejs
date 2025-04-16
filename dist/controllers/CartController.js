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
exports.getCart = exports.deleteCart = exports.removeFromCart = exports.addToCart = void 0;
const CartModel_1 = __importDefault(require("../models/CartModel"));
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const products = req.body;
        let userCart = yield CartModel_1.default.findOne({ userId });
        if (!userCart) {
            userCart = new CartModel_1.default({ userId, products: [products] });
        }
        else {
            userCart.products.push(products);
        }
        const updatedCart = yield userCart.save();
        res.status(200).json({ success: true, data: updatedCart });
    }
    catch (error) {
        console.log("error adding item to cart", error);
        res.status(500).json({ success: false, message: "error in add to cart" });
    }
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { productId } = req.body;
        const cart = yield CartModel_1.default.findOne({ userId });
        if (!cart) {
            res.status(404).json({ success: false, message: "Cart not found" });
            return;
        }
        cart.products.pull({ productId });
        yield cart.save();
        res.status(200).json({ message: "Product removed from cart", cart });
    }
    catch (error) {
        console.log("error removing product from cart", error);
        res
            .status(500)
            .json({ success: false, message: "error in removing item from cart" });
    }
});
exports.removeFromCart = removeFromCart;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cartId } = req.params;
        yield CartModel_1.default.findByIdAndDelete(cartId);
        res.status(204).json({ success: true });
    }
    catch (error) {
        console.log("error deleting cart", error);
        res.status(500).json({ success: false, message: "error deleting cart" });
    }
});
exports.deleteCart = deleteCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield CartModel_1.default.findOne({ userId })
            .populate({
            path: "products.productId",
            populate: {
                path: "providerId",
                populate: {
                    path: "locations",
                },
            },
        })
            .populate({
            path: "products.locationId",
            model: "Location",
        });
        res.status(200).json({ success: true, data });
    }
    catch (error) {
        console.log("error fetching user's cart", error);
        res.status(500).json({ success: false, message: "error fetching cart" });
    }
});
exports.getCart = getCart;
