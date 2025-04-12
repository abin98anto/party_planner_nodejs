import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/UserModel";
import IUser from "../types/IUser";
import hashPassword from "../utils/HashPassword";
import CNST from "../utils/constants";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;
    console.log("the userdaata", userData);

    const userExists = await UserModel.findOne({ email: userData.email });
    if (userExists) {
      res.status(409).json({ message: "Email is taken." });
      return;
    }

    const hashedPassword = hashPassword(userData.password);
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    await newUser.save();
  } catch (error) {
    console.log("error in user signup", error);
    res.status(500).json({ message: CNST.SERVER_ERR });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const userData: Partial<IUser> = req.body;
    const user = await UserModel.findOne({ email: userData.email });
    if (
      !user ||
      !(await bcrypt.compare(userData.password!, user.password as string))
    ) {
      res.status(409).json({ message: CNST.USER_NOT_FOUND });
      return;
    }
  } catch (error) {
    console.log("error in user login", error);
    res.status(500).json({ message: CNST.SERVER_ERR });
  }
};
