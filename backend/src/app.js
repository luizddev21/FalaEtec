// Ponto de entrada HTTP do backend: prepara cookies, CORS e JSON antes de
// encaminhar cada prefixo de URL ao roteador responsável pelo recurso.
import 'dotenv/config';

import cookieParser from "cookie-parser";

import express from 'express';
import cors from 'cors';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import interactionRoute from './routes/interaction.route.js';
import turmaRoute from './routes/turma.route.js';
import answerRoute from './routes/answer.route.js';
import cursoRoute from './routes/curso.route.js';
import uploadRoute from './routes/upload.route.js';

const app = express();

app.disable('x-powered-by');

app.set('trust proxy', 1);

// Os tokens de sessão chegam em cookies; CORS permite que o frontend local
// (Vite) faça chamadas autenticadas para esta API em outra porta.
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

// Arquivos anexados às solicitações são gravados em uploads/ e publicados
// sob a URL /uploads para que a interface consiga exibir as imagens.
app.use('/uploads', uploadRoute);

// Cada roteador agrupa endpoints por domínio; as regras de acesso ficam nos
// próprios arquivos de rota, antes de os controladores serem executados.
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/interaction', interactionRoute);
app.use('/turma', turmaRoute);
app.use('/curso', cursoRoute);
app.use('/answer', answerRoute);

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/health', (req, res) => {
	res.json({
		status: 'online',
		application: 'FalaEtec'
	});
});

export default app;
