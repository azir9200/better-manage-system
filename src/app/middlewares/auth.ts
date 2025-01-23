import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import catchAsync from "../utils/catchAsync";
import { UserRole } from "../modules/user/user.constant";
import AppError from "../errors/appError";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../modules/auth/auth.utils";

export const auth = (...requiredRoles: (keyof typeof UserRole)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.header("Authorization");

    if (!accessToken) {
      throw new AppError(401, "You have no access to this route");
    }

    const verifiedToken = jwt.verify(
      accessToken as string,
      config.jwt_access_secret as string
    );

    const { role, email } = verifiedToken as JwtPayload;
    console.log(verifyToken, "very");
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, "User not found");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You have no access to this route");
    }
    req.user = verifiedToken as JwtPayload;
    next();
    return user;
  });
};
