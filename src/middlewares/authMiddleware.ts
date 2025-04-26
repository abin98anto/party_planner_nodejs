import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt";
import JwtData from "../utils/misc/JwtData";
import UserModel from "../models/UserModel";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) {
      res.status(401).json({ message: "access token not found." });
      return;
    }

    const decoded: JwtData | null = verifyAccessToken(accessToken);
    if (!decoded?._id) {
      res.status(401).json({ message: "invalid jwt payload" });
      return;
    }

    const userData = await UserModel.findById(decoded._id);
    if (!userData) {
      res.status(401).json({ message: "user not found." });
      return;
    }

    if (!userData.isActive) {
      res.status(401).json({ message: "user is blocked." });
      return;
    }

    req.user = userData;
    next();
  } catch (error) {
    console.log("error in auth middleware", error);
    res.status(401).json({ message: "invalid access token" });
  }
};

export const Authorize = (allowedRoles: "user" | "admin") => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: "invalid access token" });
      return;
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      res.status(403).json({ message: "access denined." });
      return;
    }
    next();
  };
};
