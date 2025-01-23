import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createAdminIntoDB(req.body);
  console.log('user controller', result);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully!',
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await UserServices.updateUser(userId, req.body);

  res.status(200).json({
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const { email, role } = req.user;

  const result = await UserServices.getUserFromDB(email, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  updateUser,
  getUser,
};