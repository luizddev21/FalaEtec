import express from 'express';
import path from 'node:path';
import db from '../config/db.js';
import { middleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:filename', middleware.auth, async (req, res) => {
    try {
        const { filename } = req.params;
        const user = req.user;

        // Aceita somente nomes de imagens validos.
        if (!/^[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp)$/i.test(filename)) {
            return res.sendStatus(400);
        }

        if (!user.sub) {
            return res.sendStatus(401);
        }

        if (!['aluno', 'gestor'].includes(user.type)) {
            return res.sendStatus(403);
        }

        const url = `/uploads/${filename}`;

        let sql = `
            SELECT interacao_id
            FROM interacao
            WHERE url_img = ?
            AND tipo = 'solicitacao'
        `;

        const params = [url];

        // Alunos podem acessar somente seus anexos.
        if (user.type === 'aluno') {
            sql += ' AND aluno_id = ?';
            params.push(user.sub);
        }

        sql += ' LIMIT 1';

        const result = await db.query(sql, params);

        if (result.length === 0) {
            return res.sendStatus(404);
        }

        const uploadDir = path.resolve(
            process.env.UPLOAD_DIR || 'uploads'
        );

        res.setHeader('Cache-Control', 'private, no-store');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");

        return res.sendFile(filename, {
            root: uploadDir,
            dotfiles: 'deny'
        });

    } catch (error) {
        console.error('Erro ao acessar anexo:', error);
        return res.sendStatus(500);
    }
});

export default router;
