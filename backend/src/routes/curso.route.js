// Endpoints de consulta e manutenção de cursos, organizados sob /curso.
import express from 'express';
import { controller } from '../controllers/curso.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/get-all', middleware.admin, controller.getAll);

router.post('/delete', middleware.super, controller.delete);

router.post('/create', middleware.super, controller.create);

router.post('/update', middleware.super, controller.update);

export default router;
