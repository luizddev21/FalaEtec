import express from 'express';
import { nameOfTeachers } from '../controllers/teacher.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/name-of-teachers', auth, nameOfTeachers);

export default router;