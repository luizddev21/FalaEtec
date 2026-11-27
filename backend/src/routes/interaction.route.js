import express from 'express';
import { controller } from '../controllers/interaction.controller.js';
import { middleware } from '../middlewares/auth.middleware.js';
import multer from 'multer';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';

const router = express.Router();

const formats = {
    'image/png': '.png',
    'image/jpeg': '.jpg',
    'image/webp': '.webp'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_DIR || 'uploads/');
    },

    filename: (req, file, cb) => {
        const extension = formats[file.mimetype];

        cb(null, `${crypto.randomUUID()}${extension}`);
    }
});

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 1,
        fields: 30
    },

    fileFilter: (req, file, cb) => {
        if (!Object.hasOwn(formats, file.mimetype)) {
            return cb(new Error('Formato de imagem invalido'));
        }

        cb(null, true);
    }
});

function alunoOnly(req, res, next) {
    if (req.user.type !== 'aluno') {
        return res.sendStatus(403);
    }

    next();
}

async function validateImage(req, res, next) {
    if (!req.file) {
        return next();
    }

    try {
        const content = await fs.readFile(req.file.path);
        const ext = path.extname(req.file.filename);

        const png = content.subarray(0, 8).equals(
            Buffer.from('89504e470d0a1a0a', 'hex')
        );

        const jpg = content.subarray(0, 3).equals(
            Buffer.from('ffd8ff', 'hex')
        );

        const webp =
            content.toString('ascii', 0, 4) === 'RIFF' &&
            content.toString('ascii', 8, 12) === 'WEBP';

        const valid =
            (ext === '.png' && png) ||
            (ext === '.jpg' && jpg) ||
            (ext === '.webp' && webp);

        if (!valid || req.body.type !== 'solicitacao') {
            await fs.unlink(req.file.path);

            return res.status(400).json({
                error: 'Anexo invalido'
            });
        }

        next();

    } catch (error) {
        await fs.unlink(req.file.path).catch(() => {});
        next(error);
    }
}

router.post(
    '/create',
    middleware.auth,
    alunoOnly,
    upload.single('img'),
    validateImage,
    controller.create
);

router.post(
    '/get-all',
    middleware.auth,
    controller.getAll
);

router.post(
    '/change-status',
    middleware.super,
    controller.changeStatus
);

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(
            err.code === 'LIMIT_FILE_SIZE' ? 413 : 400
        ).json({
            error: 'Anexo excede os limites permitidos'
        });
    }

    if (err.message === 'Formato de imagem invalido') {
        return res.status(400).json({
            error: err.message
        });
    }

    next(err);
});

export default router;
