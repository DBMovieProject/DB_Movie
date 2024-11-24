const express = require('express');
const router = express.Router();
const {getMovieGenres, getMovieNowPlaying, getMovieDirectorsAndInsert, getMovieActorsAndInsert, getMovieNowPlayingPoster} = require('../controllers/apiController')


// Protected routes (Used to get movie data from TDMB)
router.get('/getMovieGenre', getMovieGenres);

router.get('/getMovieNowplaying', getMovieNowPlaying);

router.get('/getMovieDirectors', getMovieDirectorsAndInsert);

router.get('/getMovieActors', getMovieActorsAndInsert);

router.get('/getMoviePosters', getMovieNowPlayingPoster);

module.exports =  router;