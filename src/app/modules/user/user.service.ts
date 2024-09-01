import httpStatus from "http-status";
import { TUser } from "./user.interface";
import { userModel } from "./user.model";
import AppError from "../../errors/appError";

const createUserIntoDB = async (payload: TUser) => {
  const { email } = payload;
  const isUserExists = await userModel.findOne({ email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "This User already exists!",
      "create user with another email"
    );
  }
  const result = await userModel.create(payload);
  return result;
};

export const userServices = {
  createUserIntoDB,
};
