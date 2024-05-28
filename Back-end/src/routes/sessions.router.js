import express from 'express';
import sessionsController from '../controllers/sessions.controller.js';
import { authToken } from '../../utils.js';

const router = express.Router();

router.post('/register', sessionsController.register)
router.post('/login', sessionsController.login)
router.get('/current', authToken, sessionsController.current)

export default router