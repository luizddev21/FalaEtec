import express from 'express';
import { newFeedback } from '../controllers/interaction.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/new-feedback', auth, newFeedback);

export default router;