import { Date, Types } from 'mongoose';
import { Model } from "mongoose";
import { UserRole } from "./user.constant";

export type TUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  address: string;
  role?: "user" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
};

export interface User extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(email: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof UserRole;
