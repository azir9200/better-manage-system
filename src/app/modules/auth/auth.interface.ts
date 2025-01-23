// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserRole } from "../user/user.constant";

export type TUserLogin = {
  email: string;
  password: string;
};

export type TRegisterUser = {
  name: string;
  email: string;
  mobileNumber: string;
  password: string;
  role: keyof typeof UserRole;
};