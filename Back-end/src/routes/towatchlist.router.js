import express from 'express';
import towatchlistController from '../controllers/towatchlistmovies.controller.js';

const router = express.Router();

router.get('/user/:uid/', towatchlistController.getToWatchListMovies)
router.post('/user/:uid/movie/:mid', towatchlistController.addMovieToToWatchList)
router.delete('/user/:uid/movie/:mid', towatchlistController.deleteMovieToToWatchList)

export default router