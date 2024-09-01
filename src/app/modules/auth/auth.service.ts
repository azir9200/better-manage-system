import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { userModel } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";

const loginUser = async (payload: TUserLogin) => {
  // checking if the user is exist
  const user = await userModel.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { user } = decoded;
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};

export const authServices = {
  loginUser,
  refreshToken,
};
