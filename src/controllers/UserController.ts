import { Request, Response } from "express";
import bcrypt from "bcrypt";

import UserModel from "../models/UserModel";
import IUser from "../types/IUser";
import hashPassword from "../utils/HashPassword";
import CNST from "../utils/constants";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;

    const userExists = await UserModel.findOne({ email: userData.email });
    if (userExists) {
      res.status(409).json({ message: "Email is taken." });
      return;
    }

    const hashedPassword = await hashPassword(userData.password);
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ success: true, data: newUser });
  } catch (error) {
    console.log("error in user signup", error);
    res.status(500).json({ success: false, message: CNST.SERVER_ERR });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const userData: Partial<IUser> = req.body.userData;
    const user = await UserModel.findOne({ email: userData.email });
    if (
      !user ||
      !(await bcrypt.compare(userData.password!, user.password as string)) ||
      userData.role !== user.role
    ) {
      res.status(409).json({ message: CNST.USER_NOT_FOUND });
      return;
    }

    const accessToken = generateAccessToken({
      _id: user._id.toString(),
      email: user.email as string,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id.toString(),
      email: user.email as string,
    });

    const plainUser = JSON.parse(JSON.stringify(user));
    const { password: pass, ...otherData } = plainUser;
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ success: true, data: otherData });
  } catch (error) {
    console.log("error in user login", error);
    res.status(500).json({ message: CNST.SERVER_ERR });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "logout successful" });
    return;
  } catch (error) {
    console.log("logout failed", error);
    res.status(400).json({ success: false, message: "logout failed" });
    return;
  }
};
