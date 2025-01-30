/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'mongoose';
import { UserRole } from './user.constant';

export type TUser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  // phone: string;
  role: 'admin' | 'user';
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(id: string): Promise<TUser>;
}

export type TUserRole = keyof typeof UserRole;