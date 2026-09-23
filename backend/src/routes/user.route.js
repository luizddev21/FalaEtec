import express from 'express';
import { controller } from '../controllers/user.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';

// Rotas responsáveis pelo CRUD dos usuários

const router = express.Router();

// Cadastro de novos usuários.
router.post('/create', controller.create);

// Pegar informações do usuário
router.get('/profile', middleware.auth, controller.get);
router.get('/all-profile', middleware.admin, controller.getAll);
router.get('/teacher-all-names', middleware.auth, controller.teacherGetAllName);

// Mudar senha de um usuário
router.post('/change-password', middleware.admin, controller.changePassword);

// Apaga usuário
router.post('/delete', middleware.admin, controller.delete);

export default router;