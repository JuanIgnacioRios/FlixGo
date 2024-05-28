import express from 'express';
import usersController from '../controllers/users.controllers.js';
import { authToken } from '../../utils.js';

const router = express.Router();

router.put('/changepassword/:uid', authToken, usersController.changepassword)
router.put('/changeemail/:uid', authToken, usersController.changeemail)

export default router