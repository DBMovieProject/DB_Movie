
const pool = require('../db');

// Function to get all movies
async function getAllMovies() {
    try {
      const query = `
      SELECT 
    m.movieid, 
    m.title, 
    m.releasedate, 
    m.directorid, 
    m.popularity, 
    m.poster_path, 
    ARRAY_AGG(g.genrename) AS genres
    FROM 
        Movie m
    LEFT JOIN 
        MovieGenre mg
    ON 
        m.movieid = mg.movieid
    LEFT JOIN 
        Genre g
    ON 
        mg.genreid = g.genreid
    GROUP BY 
        m.movieid, m.title, m.releasedate, m.directorid, m.popularity, m.poster_path
    `; // SQL query to get all movies
      const result = await pool.query(query); // Execute the query
      console.log(result.rows)
      return result.rows; // Return the rows (movies) from the result
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error; // Propagate the error for further handling
    }
  }

async function getAllMoviesByPopularity() {
    try {
        const query = `
        SELECT 
            m.movieid, 
            m.title, 
            m.releasedate, 
            m.directorid, 
            m.popularity, 
            m.poster_path, 
            ARRAY_AGG(g.genrename) AS genres
        FROM 
            Movie m
        LEFT JOIN 
            MovieGenre mg
        ON 
            m.movieid = mg.movieid
        LEFT JOIN 
            Genre g
        ON 
            mg.genreid = g.genreid
        GROUP BY 
            m.movieid, m.title, m.releasedate, m.directorid, m.popularity, m.poster_path
        ORDER BY 
            m.popularity DESC;
    `; // SQL query to get all movies
        const result = await pool.query(query); // Execute the query
        console.log(result.rows)
        return result.rows; // Return the rows (movies) from the result
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error; // Propagate the error for further handling
    }
}

async function searchMoviesByTitle(title) {
    try {
      const query = `
        SELECT 
            Movie.MovieID, 
            Movie.title, 
            Movie.ReleaseDate, 
            Movie.poster_path, 
            Movie.popularity, 
            Movie.directorid, 
            STRING_AGG(Genre.GenreName, ', ') AS Genres
        FROM 
            Movie
        JOIN 
            MovieGenre ON Movie.MovieID = MovieGenre.MovieID
        JOIN 
            Genre ON MovieGenre.GenreID = Genre.GenreID
        WHERE 
            Movie.title ILIKE $1
        GROUP BY 
            Movie.MovieID, 
            Movie.title, 
            Movie.ReleaseDate, 
            Movie.poster_path, 
            Movie.popularity, 
            Movie.directorid;
      `;
      const values = [`%${title}%`]; // Case-insensitive partial matching
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error searching movies by title:', error.message);
      throw error;
    }
  }

  async function getActorsByMovie(movieID) {
    try {
      const query = `
        SELECT Actor.ActorID, Actor.name
        FROM Actor
        INNER JOIN MovieActor ON Actor.ActorID = MovieActor.ActorID
        WHERE MovieActor.MovieID = $1
      `;
      const values = [movieID];
      const result = await pool.query(query, values);
      return result.rows; // Return the actors
    } catch (error) {
      console.error('Error fetching actors by movie:', error.message);
      throw error;
    }
  }

  async function getMoviesByActor(actorID) {
    try {
      const query = `
        SELECT Movie.MovieID, Movie.title, Movie.ReleaseDate
        FROM Movie
        INNER JOIN MovieActor ON Movie.MovieID = MovieActor.MovieID
        WHERE MovieActor.ActorID = $1
      `;
      const values = [actorID];
      const result = await pool.query(query, values);
      return result.rows; // Return the list of movies
    } catch (error) {
      console.error('Error fetching movies by actor:', error.message);
      throw error;
    }
  }
  

async function getAllMovieActors() {
  try {
    const query = `
      SELECT 
        Movie.MovieID AS movie_id, 
        Movie.Title AS movie_title, 
        Actor.ActorID AS actor_id, 
        Actor.name AS actor_name
      FROM Movie
      INNER JOIN MovieActor ON Movie.MovieID = MovieActor.MovieID
      INNER JOIN Actor ON Actor.ActorID = MovieActor.ActorID;
    `;
    const result = await pool.query(query);
    return result.rows; // Return the rows containing movie and actor details
  } catch (error) {
    console.error('Error fetching all movie actors:', error.message);
    throw error;
  }
}

//Genre
async function getAllGenres() {
    try {
      const query = 'SELECT GenreID, GenreName FROM Genre';
      const result = await pool.query(query); // Execute the query
      return result.rows; // Return the list of genres
    } catch (error) {
      console.error('Error fetching genres:', error.message);
      throw error;
    }
  }

  async function getMoviesByGenre(genreID) {
    try {
      const query = `
        SELECT 
            Movie.MovieID, 
            Movie.title, 
            Movie.ReleaseDate, 
            Movie.poster_path, 
            Movie.popularity, 
            Movie.directorid,
            Genre.GenreName as genres
        FROM 
            Movie
        INNER JOIN 
            MovieGenre ON Movie.MovieID = MovieGenre.MovieID
        INNER JOIN 
            Genre ON MovieGenre.GenreID = Genre.GenreID
        WHERE 
            MovieGenre.GenreID = $1;
      `;
      const values = [genreID]; // Use parameterized query to prevent SQL injection
      const result = await pool.query(query, values);
      return result.rows; // Return the movies that match the genre
    } catch (error) {
      console.error('Error fetching movies by genre:', error.message);
      throw error;
    }
  }
  
  async function getAllDirectors() {
    try {
      const query = 'SELECT DirectorID, Name FROM Director';
      const result = await pool.query(query); // Execute the query
      return result.rows; // Return the list of directors
    } catch (error) {
      console.error('Error fetching directors:', error.message);
      throw error;
    }
  }


  async function getMoviesByDirector(directorID) {
    try {
      const query = `
        SELECT 
            Movie.MovieID, 
            Movie.Title, 
            Movie.ReleaseDate, 
            Movie.Popularity, 
            Movie.poster_path, 
            STRING_AGG(Genre.GenreName, ', ') AS Genres
        FROM 
            Movie
        LEFT JOIN 
            MovieGenre ON Movie.MovieID = MovieGenre.MovieID
        LEFT JOIN 
            Genre ON MovieGenre.GenreID = Genre.GenreID
        WHERE 
            Movie.DirectorID = $1
        GROUP BY 
            Movie.MovieID, 
            Movie.Title, 
            Movie.ReleaseDate, 
            Movie.Popularity, 
            Movie.poster_path;
      `;
      const values = [directorID];
      const result = await pool.query(query, values); // Execute the query
      return result.rows; // Return the list of movies
    } catch (error) {
      console.error('Error fetching movies by director:', error.message);
      throw error;
    }
  }

  async function addReview(movieID, userID, rating, reviewText) {
    try {
      // Check if the rating is between 1 and 5
      if (rating < 1 || rating > 5) {
        throw new Error('Rating must be between 1 and 5');
      }
  
      // SQL query to insert the review
      const query = `
        INSERT INTO Review (MovieID, UserID, Rating, ReviewText)
        VALUES ($1, $2, $3, $4) RETURNING ReviewID;
      `;
      
      // Values for the query
      const values = [movieID, userID, rating, reviewText];
  
      // Execute the query and retrieve the ReviewID
      const result = await pool.query(query, values);
  
      // Return the newly created ReviewID
      return result.rows[0].ReviewID;
    } catch (error) {
      console.error('Error adding review:', error.message);
      throw error;
    }
  }
  

module.exports = { getAllMovies,
                   getAllMoviesByPopularity,
                   searchMoviesByTitle,
                   getActorsByMovie, 
                   getMoviesByActor, 
                   getAllMovieActors, 
                   getAllGenres, 
                   getMoviesByGenre,
                   getAllDirectors,
                   getMoviesByDirector,
                   addReview
                }
