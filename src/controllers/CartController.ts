import { Request, Response } from "express";
import CartModel from "../models/CartModel";
import { ISelectedProducts } from "../types/ICart";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const products: ISelectedProducts = req.body;

    let userCart = await CartModel.findOne({ userId });

    if (!userCart) {
      userCart = new CartModel({ userId, products: [products] });
    } else {
      userCart.products.push(products);
    }

    const updatedCart = await userCart.save();
    res.status(200).json({ success: true, data: updatedCart });
  } catch (error) {
    console.log("error adding item to cart", error);
    res.status(500).json({ success: false, message: "error in add to cart" });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { productId } = req.body;

    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      res.status(404).json({ success: false, message: "Cart not found" });
      return;
    }

    cart.products.pull({ productId });

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.log("error removing product from cart", error);
    res
      .status(500)
      .json({ success: false, message: "error in removing item from cart" });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;
    await CartModel.findByIdAndDelete(cartId);
    res.status(204).json({ success: true });
  } catch (error) {
    console.log("error deleting cart", error);
    res.status(500).json({ success: false, message: "error deleting cart" });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const data = await CartModel.findOne({ userId }).populate({
      path: "products.productId",
      populate: {
        path: "providerId",
        populate: {
          path: "locations",
        },
      },
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error fetching user's cart", error);
    res.status(500).json({ success: false, message: "error fetching cart" });
  }
};
