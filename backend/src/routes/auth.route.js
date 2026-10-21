// Endpoints de sessão; os caminhos são montados com prefixo /auth em app.js.
import express from 'express';
import { controller } from '../controllers/auth.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';

// Rotas cujas requisições tratam de tokens e
// Autenticação de usuário

// Criação do objeto Router responsável pelas rotas de usuários.
const router = express.Router();

// Rota responsável pelo login dos usuários
router.post('/login', controller.login);

// Renova os cookies de sessão e encerra sessões, respectivamente.
router.post('/refresh', controller.refresh);

router.post('/logout', controller.logout);

// Verificações usadas pelas rotas protegidas do frontend para decidir o acesso.
router.get('/check-auth', middleware.auth, controller.checkAuth);

router.get('/check-admin', middleware.admin, controller.checkAdmin);

// Disponibiliza o roteador para utilização em outras partes da aplicação.
export default router;
