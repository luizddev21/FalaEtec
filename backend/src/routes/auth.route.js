import express from 'express';
import { register, login, refresh, logout, checkAuth } from '../controllers/auth.controller.js';
import auth from '../middlewares/auth.middleware.js';

// Criação do objeto Router responsável pelas rotas de usuários.
const router = express.Router();

// Rota responsável pelo cadastro de novos usuários.
router.post('/register', register);

// Rota responsável pelo login dos usuários
router.post('/login', login);

router.post('/refresh', refresh);

router.post('/logout', logout);

router.get('/check-auth', auth, checkAuth);

// Disponibiliza o roteador para utilização em outras partes da aplicação.
export default router;