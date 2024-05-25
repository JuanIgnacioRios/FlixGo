import express from 'express';
import movielistController from '../controllers/sessions.controller.js';

const router = express.Router();

router.post('/register', sessionsController.register)
router.post('/login', sessionsController.login)

export default router