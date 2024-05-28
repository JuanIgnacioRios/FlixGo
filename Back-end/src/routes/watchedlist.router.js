import express from 'express';
import watchedlistController from '../controllers/sessions.controller.js';

const router = express.Router();

//Watched List
router.get('/', watchedlistController.getwatchedlistmovies)

export default router