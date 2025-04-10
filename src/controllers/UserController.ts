import { Request, Response } from "express";

import UserModel from "../models/UserModel";
import IUser from "../types/IUser";
import hashPassword from "../utils/HashPassword";

const signup = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;

    const userExists = await UserModel.findOne({ email: userData.email });
    if (userExists) {
      return res.status(409).json({ message: "Email is taken." });
    }

    const hashedPassword = hashPassword(userData.password);
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    await newUser.save();
  } catch (error) {
    console.log("error in user signup", error);
    res.status(500).json();
  }
};
