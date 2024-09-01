import catchAsync from "../utils/catchAsync";
import { UserRole } from "../modules/user/user.constant";
import AppError from "../errors/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...authRoles: (keyof typeof UserRole)[]) => {
  return catchAsync(async (req, res) => {
    //   token checking
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You do not have the necessary permissions to access this resource.",
      );
    }
    //   verification
    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You do not have the necessary permissions to access this resource.",
            "Unauthorized Access"
          );
        }
        const role = (decoded as JwtPayload).role;
        if (authRoles && !authRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You do not have the necessary permissions to access this resource.",
            "Unauthorized Access"
          );
        }
         
      }
    );
  });
};
