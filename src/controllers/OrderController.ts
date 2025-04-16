import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

export const addOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();
    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    console.log("error adding order", error);
    res.status(500).json({ success: false, message: "error adding order" });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    console.log("error updating order", error);
    res.status(500).json({ success: false, message: "error updating order" });
  }
};

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = await OrderModel.find({ userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log("error fetching user orders", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching user orders" });
  }
};

// export const getAllOrders = async (_req: Request, res: Response) => {
//   try {
//     const orders = await OrderModel.find();
//     res.status(200).json({ success: true, data: orders });
//   } catch (error) {
//     console.log("error fetching all orders", error);
//     res.status(500).json({ success: false, message: "error fetching orders" });
//   }
// };

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string | undefined;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    if (status && ["PENDING", "CANCELLED", "COMPLETED"].includes(status)) {
      filter.status = status;
    }

    // Get total count for pagination
    const totalOrders = await OrderModel.countDocuments(filter);

    // Get paginated orders
    const orders = await OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Calculate total pages
    const totalPages = Math.ceil(totalOrders / limit);

    res.status(200).json({
      success: true,
      data: orders,
      currentPage: page,
      totalPages,
      totalOrders,
    });
  } catch (error) {
    console.log("error fetching all orders", error);
    res.status(500).json({ success: false, message: "error fetching orders" });
  }
};

export const getOrderDetails = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const order = await OrderModel.findById(orderId);
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log("error fetching order details", error);
    res
      .status(500)
      .json({ success: false, message: "error fetching order details" });
  }
};
