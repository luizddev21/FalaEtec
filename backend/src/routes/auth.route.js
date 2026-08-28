import express from 'express';
import { register, login, refresh, logout } from '../controllers/auth.controller.js';

// Criação do objeto Router responsável pelas rotas de usuários.
const router = express.Router();

// Rota responsável pelo cadastro de novos usuários.
router.post('/register', register);

// Rota responsável pelo login dos usuários
router.post('/login', login);

router.post('/refresh', refresh);

router.post('/logout', logout);

// Disponibiliza o roteador para utilização em outras partes da aplicação.
export default router;