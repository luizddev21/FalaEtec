import express from 'express';
import { controller } from '../controllers/user.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';


// Rotas responsáveis pelo CRUD dos usuários

const router = express.Router();

// Pegar informações do usuário
router.get('/profile', middleware.auth, controller.get);
router.get('/all-profile', middleware.super, controller.getAll);
router.get('/teacher-all-names', middleware.auth, controller.teacherGetAllName);

// Cadastro de novos usuários.
router.post('/create', middleware.super, controller.create);

// Mudar senha de um usuário
router.post('/change-password', middleware.super, controller.changePassword);

// Alterar informações do usuário
router.post('/update', middleware.super, controller.update);

// Apaga usuário
router.post('/delete', middleware.super, controller.delete);

export default router;