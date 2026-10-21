// Endpoints de resposta a uma interação; somente perfis administrativos passam.
import express from 'express';
import { controller } from '../controllers/answer.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', middleware.admin, controller.create);
router.post('/delete', middleware.admin, controller.delete);

export default router;
