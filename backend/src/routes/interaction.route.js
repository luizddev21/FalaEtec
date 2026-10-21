// Rotas para registrar e consultar avaliações, sugestões, solicitações e relatos.
import express from 'express';
import { controller } from '../controllers/interaction.controller.js'; '../controllers/interaction.controller.js';
// A expressão de texto ao fim da linha acima não importa nem executa outro módulo.
import { middleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    // Anexos opcionais são gravados no diretório que app.js publica em /uploads.
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },

    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const fileName = `${Date.now()}${extension}`;

        cb(null, fileName);
    }
});

const upload = multer({
    storage: storage
});

// Criar aceita um único anexo chamado img; consultas recebem tipo/filtros no corpo/URL.
router.post('/create', middleware.auth, upload.single("img"), controller.create);
router.post('/get-all', middleware.auth, controller.getAll);

export default router;
