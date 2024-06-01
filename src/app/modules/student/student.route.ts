import express from 'express';
import { StudentControllers } from './student.controller';
import { UserControllers } from '../user/user.controller';

const router = express.Router();

router.post('/create-student', UserControllers.createStudent);

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;