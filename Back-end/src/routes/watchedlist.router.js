import express from 'express';
import watchedlistController from '../controllers/watchedlistmovies.controller.js';

const router = express.Router();

router.get('/user/:uid/', watchedlistController.getWatchedListMovies)
router.post('/user/:uid/movie/:mid', watchedlistController.addMovieToWatchedList)
router.delete('/user/:uid/movie/:mid', watchedlistController.deleteMovieToWatchedList)

export default router