const pool = require('../db');


// Formating Genrejson to add genres to genre table
const convertGenretoSQLFormating = async ( genresJson) => {
    const GenreData = genresJson.genres.map(genre => ({
        GenreID: genre.id,
        GenreName: genre.name
    }))
    return GenreData
}

const insertGenres = async ( genreData) => {
    try {
        console.log('This is the genreData', genreData)
        console.log('Code reached here')
        await pool.query('BEGIN')
        for (const genre of genreData) {
            await pool.query(
                `INSERT INTO GENRE (GenreID, GenreName) 
                 VALUES ($1,$2)
                 ON CONFLICT (GenreID) DO NOTHING;`,
                [genre.GenreID, genre.GenreName]
            )
        }
        
        await pool.query('COMMIT')
        return true
    }catch (error) {
        await pool.query('ROLLBACK')
        console.error('Error Inserting genres', error);
        return false;
    }
}

// Adding all the Now_playing movies to the database and making sure formatted correctly 
const convertMovieResultToSQLFormat = async (movies) => {
    
}

const insertMovies = async (movies) => {
    try {
        for (const movie of movies) {
            // Insert movie into Movie table
            await pool.query(
              `INSERT INTO Movie (MovieID, Title, ReleaseDate, Popularity) 
               VALUES ($1, $2, $3, $4)
               ON CONFLICT (MovieID) DO NOTHING;`,
              [movie.id, movie.title, movie.release_date, movie.popularity]
            );
        

        //Insert genres into MovieGenre table (assuming multiple genres per movie)
        for (const genreId of movie.genre_ids) {
            await pool.query(
              `INSERT INTO MovieGenre (MovieID, GenreID) 
               VALUES ($1, $2)
               ON CONFLICT DO NOTHING;`,
              [movie.id, genreId]
            );
          }
        }
        console.log('Movies inserted successfully');  
    }catch (error) {
        console.error('Error inserting movies:', error);
    }
};

const insertMoviePoster = async (movies) => {
    try {
        for (const movie of movies) {
            // Insert movie into Movie table
            await pool.query(
              `UPDATE Movie
               SET poster_path = $1 
               WHERE MovieID = $2`,
              [movie.poster_path, movie.id]
            );
            console.log(`Updated MovieID ${movie.id} with poster_path ${movie.poster_path}`);

        }
        return true
        
    }catch (error) {
            console.error('Error inserting movies:', error);
            return false
    }finally {
        pool.end();
    }
}

//DIRECTS API FUNCTION CALLS TDMB

const getDirectorsAndInsert = async(movies) => {
    try {
        for (const movie of movies) {
            const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=09c08000293305885173e0bfbbaf5a47`);
            if (!creditsResponse.ok) throw new Error(`HTTP error! status: ${creditsResponse.status}`);

            const creditsData = await creditsResponse.json();

            // Step 3: Insert directors into the 'directors' table
            for (const director of creditsData.crew.filter(person => person.job === 'Director')) {
                const { id, name } = director;

                // Insert into 'directors' table if the director doesn't exist
                await pool.query(`
                    INSERT INTO director (DirectorID, Name)
                    VALUES ($1, $2)
                    ON CONFLICT (DirectorID) DO NOTHING;
                `, [id, name]);

                // Step 4: Link the director to the movie in the 'movie' table
                await pool.query(`
                    UPDATE movie
                    SET DirectorID = $2
                    WHERE MovieID = $1 AND DirectorID IS NULL;
                `, [movie.id, id]);
            }
        }
        console.log('Directors and movies inserted succesfully')
        return true;
    }catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}
//ACTORS API FUNCTIONS CALLS TDMB

const associateActorsWithMovies = async(movieId, actors) => {
    try {

        // check if the actor exists and insert the actor if not
        for ( const actor of actors) {
            const { id, name } = actor;

            // Insert into 'directors' table if the director doesn't exist
            await pool.query(`
                INSERT INTO actor (ActorID, Name)
                VALUES ($1, $2)
                ON CONFLICT (ActorID) DO NOTHING;
            `, [id, name]);

            // Step 4: Link the director to the movie in the 'movie' table
            await pool.query(`
                INSERT INTO MovieActor (MovieID, ActorID)
                VALUES ($1, $2)
                ON CONFLICT (MovieID, ActorID) DO NOTHING;
            `, [movieId, id]);
        } 
        console.log('actors and movieactor table data inserted succesfully')
        return true;
    }catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}

const fetchMovieActors = async (movieid) => {
    
    const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=09c08000293305885173e0bfbbaf5a47`);
    if (!creditsResponse.ok) throw new Error(`HTTP error! status: ${creditsResponse.status}`);
    
    const creditsData = await creditsResponse.json();

    return creditsData.cast; // This gives you the list of actors.
};

const insertActorsForNowPlayingMovies = async (movies) => {

    try {
        for (const movie of movies) {
            const actors = await fetchMovieActors(movie.id);
            await associateActorsWithMovies(movie.id, actors);
        }
        console.log('actors and movieActor table data inserted succesfully')
        return true;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
};







module.exports = { convertGenretoSQLFormating, 
                   insertGenres, 
                   convertMovieResultToSQLFormat, 
                   insertMovies, 
                   getDirectorsAndInsert, 
                   insertActorsForNowPlayingMovies, 
                   insertMoviePoster, 
                   }