const express = require('express');
const router = express.Router();
const { getAllMoviesandsend,
        getAllMoviesandsendbyPopularity,
        searchMoviesByTitleHandler, 
        getActorsByMovieHandler, 
        getMoviesByActorHandler, 
        getAllMovieActorsHandler,
        getAllGenresHandler,
        getMoviesByGenreHandler,
        getAllDirectorsHandler,
        getMoviesByDirectorHandler,
        addReviewHandler} = require('../controllers/movieController')

router.get('/getAllMovies', getAllMoviesandsend);

router.get('/getAllMoviesByPopularity', getAllMoviesandsendbyPopularity);

router.get('/searchMovies', searchMoviesByTitleHandler);

router.get('/getActorsByMovie/:movieID', getActorsByMovieHandler);

router.get('/getMoviesByActor/:actorID', getMoviesByActorHandler);

router.get('/getAllMovieActors', getAllMovieActorsHandler);

//Genres

router.get('/getAllGenres', getAllGenresHandler);

router.get('/getMoviesByGenre/:genreID', getMoviesByGenreHandler);

//Directors routes

router.get('/getAllDirectors', getAllDirectorsHandler);

router.get('/getMoviesByDirector/:directorID', getMoviesByDirectorHandler);


//Review routes
router.post('/addReview', addReviewHandler);


module.exports = router; 