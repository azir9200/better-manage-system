import httpStatus from "http-status";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/appError";

const createAdminIntoDB = async (payload: TUser) => {
  const { email } = payload;
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "This User already exists!",
      "create user with another email"
    );
  }

  const user = await User.create(payload);
  return user;
};

const updateUser = async (_id: string, payload: TUser) => {
  const admin = await User.findByIdAndUpdate({ _id }, payload);
  return admin;
};

const getUserFromDB = async (email: string, role: string) => {
  let result = null;
  if (role === "admin") {
    result = await User.findOne({ email: email });
  }
  if (role === "user") {
    result = await User.findOne({ email: email });
  }
  return result;
};

export const UserServices = {
  createAdminIntoDB,
  updateUser,
  getUserFromDB,
};
