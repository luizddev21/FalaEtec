import 'dotenv/config';

import cookieParser from "cookie-parser";

import express from 'express';
import cors from 'cors';

import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';
import interactionRoute from './routes/interaction.route.js';

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/interaction', interactionRoute);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;