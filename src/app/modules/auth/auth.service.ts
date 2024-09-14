import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { userModel } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import bcrypt from "bcrypt";

const loginUser = async (payload: TUserLogin) => {
  // checking if the user is exist
  const user = await userModel
    .findOne({
      email: payload.email,
    })
    .select("+password");

  if (!user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "This user does not exist!",
      "Unauthorized access request!"
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );
  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS,
      "You do not have the necessary permissions to access this resource.",
      "Unauthorized Access"
    );
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
  // checking token is valid
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
