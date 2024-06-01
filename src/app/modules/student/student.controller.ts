import {   NextFunction, Request,  RequestHandler, Response,  } from 'express';
import { StudentServices } from './student.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';




const getAllStudents  = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
      })   
  });

const getSingleStudent  = catchAsync(async (req, res) => {
  
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is Created successfully by Azir',
    data: result,
    })

});

const deleteStudent =catchAsync(  async (req, res) =>{
 const {studentId} = req.params;
const result = await StudentServices.deleteStudentFromDB(studentId);

sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Student is deleted successfully !',
  data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
//route-control-service-model-interface