import express from 'express';
import { user } from '../controllers/user.controller.js';
import { auth, checkAdmin } from '../middlewares/auth.middleware.js';

// Rotas responsáveis pelo CRUD dos usuários

const router = express.Router();

// Cadastro de novos usuários.
router.post('/register', auth, user.registerUser);

// Pegar informações do usuário
router.get('/profile', auth, user.getUser);
router.get('/allprofile', checkAdmin, user.getAllUser);

// Mudar senha de um usuário
router.post('/changepassword', checkAdmin, user.changeUserPassword);

// Apaga usuário
router.post('/delete', checkAdmin, user.deleteUser);

export default router;