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

const app = express();

// Os tokens de sessão chegam em cookies; CORS permite que o frontend local
// (Vite) faça chamadas autenticadas para esta API em outra porta.
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

// Arquivos anexados às solicitações são gravados em uploads/ e publicados
// sob a URL /uploads para que a interface consiga exibir as imagens.
app.use('/uploads', express.static('uploads'));

// Cada roteador agrupa endpoints por domínio; as regras de acesso ficam nos
// próprios arquivos de rota, antes de os controladores serem executados.
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/interaction', interactionRoute);
app.use('/turma', turmaRoute);
app.use('/curso', cursoRoute);
app.use('/answer', answerRoute);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
