import express from 'express';
import favouritelistController from '../controllers/favouritelistmovies.controller.js';

const router = express.Router();

router.get('/user/:uid/', favouritelistController.getFavouriteListMovies)
router.post('/user/:uid/movie/:mid', favouritelistController.addMovieToFavouriteList)
router.delete('/user/:uid/movie/:mid', favouritelistController.deleteMovieToFavouriteList)

export default router