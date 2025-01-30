/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRegisterUser, TUserLogin } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';
import { UserRole } from '../user/user.constant';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';

const registerUser = async (payload: TRegisterUser) => {
  // checking if the user is exist
  const user = await User.isUserExists(payload?.email);

  if (user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is already exist!');
  }

  payload.role = UserRole.user;

  //create new user
  const newUser = await User.create(payload);

  //create token and sent to the  client
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    // phone: newUser.phone,
    role: newUser.role,
    address: newUser.address,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const loginUser = async (payload: TUserLogin) => {
  try {
    const user = await User.findOne({ email: payload.email }).select(
      '+password',
    );
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    const isPasswordMatched = await bcrypt.compare(
      payload.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Invalid password',
        'Unauthorized Access',
      );
    }
    const jwtPayload = {
      name: user.name,
      email: user.email,
      password: user.password,
      // phone: user.phone,
      role: user.role,
      address: user.address,
    };

    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
    const refreshToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
    return {
      accessToken,
      refreshToken,
    };
  } catch (error: any) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'An error occurred while logging in',
    );
  }
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;

  // checking if the user is exist
  const user = await User.isUserExists(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const jwtPayload = {
    name: user.name,
    email: user.email,
    password: user.password,
    // phone: user.phone,
    role: user.role,
    address: user.address,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const authServices = {
  registerUser,
  loginUser,
  refreshToken,
};