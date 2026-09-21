import express from 'express';
import { interaction } from '../controllers/interaction.controller.js'; '../controllers/interaction.controller.js';
import { auth } from '../middlewares/auth.middleware.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
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

router.post('/createInteraction', auth, upload.single("image"), interaction.createInteraction);

export default router;