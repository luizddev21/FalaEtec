import express from 'express';
import { profile } from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/profile', auth, profile);

export default router;