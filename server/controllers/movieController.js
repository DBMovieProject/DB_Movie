const {getAllMovies,
        getAllMoviesByPopularity,
        searchMoviesByTitle,
        getActorsByMovie,
        getMoviesByActor,
        getAllMovieActors,
        getAllGenres,
        getMoviesByGenre,
        getAllDirectors,
        getMoviesByDirector,
        addReview} = require('../models/movies')

const getAllMoviesandsend = async(req,res) => {
    try {
        const allMovies = await  getAllMoviesByPopularity()
        res.status(200).json(allMovies)
    }catch (error) {
        console.error(error)
        res.status(500).json({messsage: `Server error, false `});
    }

}

const getAllMoviesandsendbyPopularity = async(req,res) => {
    try {
        const allMovies = await  getAllMoviesByPopularity()
        res.status(200).json(allMovies)
    }catch (error) {
        console.error(error)
        res.status(500).json({messsage: `Server error, false `});
    }

}

const searchMoviesByTitleHandler = async (req, res) => {
    try {
      const { title } = req.query; // Assuming title is sent as a query parameter
      if (!title) {
        return res.status(400).json({ message: 'Title is required' });
      }
  
      const movies = await searchMoviesByTitle(title);
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error in searchMoviesByTitleHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while searching movies' });
    }
  };

  const getActorsByMovieHandler = async (req, res) => {
    try {
      const { movieID } = req.params; // Assuming movieID is passed as a route parameter
      if (!movieID) {
        return res.status(400).json({ message: 'movieID is required' });
      }
  
      const actors = await getActorsByMovie(movieID);
      if (actors.length === 0) {
        return res.status(404).json({ message: 'No actors found for this movie' });
      }
  
      res.status(200).json(actors);
    } catch (error) {
      console.error('Error in getActorsByMovieHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while fetching actors' });
    }
  };

  const getMoviesByActorHandler = async (req, res) => {
    try {
      const { actorID } = req.params; // Assuming actorID is passed as a route parameter
      if (!actorID) {
        return res.status(400).json({ message: 'actorID is required' });
      }
  
      const movies = await getMoviesByActor(actorID);
      if (movies.length === 0) {
        return res.status(404).json({ message: 'No movies found for this actor' });
      }
  
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error in getMoviesByActorHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while fetching movies' });
    }
  };

  const getAllMovieActorsHandler = async (req, res) => {
    try {
      const movieActors = await getAllMovieActors();
      if (movieActors.length === 0) {
        return res.status(404).json({ message: 'No movies or actors found' });
      }
  
      res.status(200).json(movieActors);
    } catch (error) {
      console.error('Error in getAllMovieActorsHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while fetching movies and actors' });
    }
  };

  //GENRE 

  const getAllGenresHandler = async (req, res) => {
    try {
      const genres = await getAllGenres();
      if (genres.length === 0) {
        return res.status(404).json({ message: 'No genres found' });
      }
  
      res.status(200).json(genres); // Respond with the genres
    } catch (error) {
      console.error('Error in getAllGenresHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while fetching genres' });
    }
  };

  const getMoviesByGenreHandler = async (req, res) => {
    try {
      const { genreID } = req.params; // Assuming genreID is passed as a route parameter
      if (!genreID) {
        return res.status(400).json({ message: 'genreID is required' });
      }
  
      const movies = await getMoviesByGenre(genreID);
      if (movies.length === 0) {
        return res.status(404).json({ message: 'No movies found for this genre' });
      }
  
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error in getMoviesByGenreHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while fetching movies by genre' });
    }
  };


  const getAllDirectorsHandler = async (req, res) => {
    try {
      const directors = await getAllDirectors();
      if (directors.length === 0) {
        return res.status(404).json({ message: 'No directors found' });
      }
  
      res.status(200).json(directors); // Respond with the directors
    } catch (error) {
      console.error('Error in getAllDirectorsHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while fetching directors' });
    }
  };

const getMoviesByDirectorHandler = async (req, res) => {
    try {
      const { directorID } = req.params; // Assuming directorID is passed as a route parameter
      if (!directorID) {
        return res.status(400).json({ message: 'directorID is required' });
      }
  
      const movies = await getMoviesByDirector(directorID);
      if (movies.length === 0) {
        return res.status(404).json({ message: 'No movies found for this director' });
      }
  
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error in getMoviesByDirectorHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while fetching movies by director' });
    }
  };

  //Review
  const addReviewHandler = async (req, res) => {
    try {
      const { movieID, userID, rating, reviewText } = req.body;
  
      // Validate if all required fields are provided
      if (!movieID || !userID || !rating || !reviewText) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Call the addReview function to insert the new review
      const newReviewID = await addReview(movieID, userID, rating, reviewText);
  
      // Respond with the newly added review ID
      res.status(201).json({
        message: 'Review added successfully',
        reviewID: newReviewID
      });
    } catch (error) {
      console.error('Error in addReviewHandler:', error.message);
      res.status(500).json({ message: 'Server error occurred while adding review' });
    }
  };

module.exports =  { getAllMoviesandsend,
                    getAllMoviesandsendbyPopularity,
                    searchMoviesByTitleHandler,
                    getActorsByMovieHandler, 
                    getMoviesByActorHandler, 
                    getAllMovieActorsHandler, 
                    getAllGenresHandler, 
                    getMoviesByGenreHandler,
                    getAllDirectorsHandler,
                    getMoviesByDirectorHandler,
                    addReviewHandler
                }