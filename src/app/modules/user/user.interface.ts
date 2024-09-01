import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
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
