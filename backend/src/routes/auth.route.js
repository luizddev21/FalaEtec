// Endpoints de sessão; os caminhos são montados com prefixo /auth em app.js.
import express from 'express';
import { controller } from '../controllers/auth.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';
import { rateLimit } from 'express-rate-limit';

// Rotas cujas requisições tratam de tokens e
// Autenticação de usuário

// Criação do objeto Router responsável pelas rotas de usuários.
const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    message: {
        error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
    }
});

// Rota responsável pelo login dos usuários
router.post('/login', loginLimiter, controller.login);

// Renova os cookies de sessão e encerra sessões, respectivamente.
router.post('/refresh', controller.refresh);

router.post('/logout', controller.logout);

// Verificações usadas pelas rotas protegidas do frontend para decidir o acesso.
router.get('/check-auth', middleware.auth, controller.checkAuth);

router.get('/check-admin', middleware.admin, controller.checkAdmin);

// Disponibiliza o roteador para utilização em outras partes da aplicação.
export default router;
