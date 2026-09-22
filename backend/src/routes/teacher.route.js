import express from 'express';
import { controller } from '../controllers/teacher.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/all-names', middleware.auth, controller.getAllName);

export default router;