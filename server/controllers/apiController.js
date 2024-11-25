const { convertGenretoSQLFormating, 
        insertGenres, 
        insertMovies, 
        getDirectorsAndInsert, 
        insertActorsForNowPlayingMovies,
        insertMoviePoster} = require('../models/ApiFunctions')

const getMovieGenres = async (req, res) => {
    

    try {
        console.log('HELLOOOO')
        const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=09c08000293305885173e0bfbbaf5a47&language=en-US')
        // console.log( await response.json());
        const movieGenreJson = await response.json();
        console.log(movieGenreJson)
        
        const genreObject = await convertGenretoSQLFormating(movieGenreJson)
        console.log(genreObject)
        // console.log(genreObject)
        const genresInsertedSuccesfully = await insertGenres(genreObject)
        res.status(201).json({'genreInsertedCondition': genresInsertedSuccesfully })

    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}
const getMovieNowPlaying = async (req, res) => {
    

    try {
        console.log('HELLOOOO')
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1&api_key=09c08000293305885173e0bfbbaf5a47')
        // console.log( await response.json());
        const movieGenreJson = await response.json();
        console.log('This is the data ',movieGenreJson)
        
        const moviesInsertedSuccesfully = await insertMovies(movieGenreJson.results)
        res.status(201).json({'moviesInsertedCondition': moviesInsertedSuccesfully})
        // console.log(genreObject)
        // // console.log(genreObject)
        // const genresInsertedSuccesfully = await insertGenres(genreObject)
        // res.status(201).json({'genreInsertedCondition': genresInsertedSuccesfully })

    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}

const getMovieNowPlayingPoster = async (req, res) => {
    

    try {
        console.log('HELLOOOO')
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1&api_key=09c08000293305885173e0bfbbaf5a47')
        // console.log( await response.json());
        const movieGenreJson = await response.json();
        console.log('This is the data ',movieGenreJson)
        
        const moviesInsertedSuccesfully = await insertMoviePoster(movieGenreJson.results)
        res.status(201).json({'moviesInsertedCondition': moviesInsertedSuccesfully})
        // console.log(genreObject)
        // // console.log(genreObject)
        // const genresInsertedSuccesfully = await insertGenres(genreObject)
        // res.status(201).json({'genreInsertedCondition': genresInsertedSuccesfully })

    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
}

const getMovieDirectorsAndInsert = async(req, res ) => {
    try {
        // Step 1: Fetch now playing movies
        const nowPlayingResponse = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=1&api_key=09c08000293305885173e0bfbbaf5a47`);
        if (!nowPlayingResponse.ok) throw new Error(`HTTP error! status: ${nowPlayingResponse.status}`);
        
        const nowPlayingData = await nowPlayingResponse.json();
        const movies = nowPlayingData.results;
        console.log(movies)

        // Step 2: Process each movie
        const directorsInsertedSuccesfully = getDirectorsAndInsert(movies)

        res.status(201).json({ 'directorsInsertedSuccesfully' : directorsInsertedSuccesfully })
    }catch (error) {
        res.status(500).json({messsage: `Server error, false `});
    } 

}

const getMovieActorsAndInsert = async(req, res ) => {
    try {
        // Step 1: Fetch now playing movies
        const nowPlayingResponse = await fetch(`https://api.themoviedb.org/3/movie/now_playing?page=1&api_key=09c08000293305885173e0bfbbaf5a47`);
        if (!nowPlayingResponse.ok) throw new Error(`HTTP error! status: ${nowPlayingResponse.status}`);
        
        const nowPlayingData = await nowPlayingResponse.json();
        const movies = nowPlayingData.results;
        // console.log(movies)

        // Step 2: Process each movie
        const actorsInsertedSuccesfully = insertActorsForNowPlayingMovies(movies)

        // res.status(201).json({ 'actorsInsertedSuccesfully' : actorsInsertedSuccesfully })
    }catch (error) {
        res.status(500).json({messsage: `Server error, false `});
    } 

}

module.exports = {getMovieGenres, 
                getMovieNowPlaying, 
                getMovieDirectorsAndInsert, 
                getMovieActorsAndInsert,
                getMovieNowPlayingPoster}