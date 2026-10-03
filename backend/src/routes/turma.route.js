import express from 'express';
import { controller } from '../controllers/turma.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/get-all', middleware.admin, controller.getAll);

export default router;