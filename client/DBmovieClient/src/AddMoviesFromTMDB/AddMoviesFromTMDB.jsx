import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddMoviesFromTMDB.css'; // Optional CSS for styling

const API_KEY = '09c08000293305885173e0bfbbaf5a47';
const BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing';

const AddMoviesFromTMDB = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}?page=${page}&api_key=${API_KEY}`);
      setMovies((prev) => [...prev, ...response.data.results]); // Append new movies
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  const handleAddMovie = async (movie) => {
    try {
      const response = await axios.post('http://localhost:3001/MovieRoutes/add', { movie }); // Backend route
      if (response.data.exists) {
        alert('Movie already exists in the database.');
      } else {
        alert('Movie successfully added!');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('An error occurred while adding the movie.');
    }
  };

  return (
    <div className="add-movies-container">
      <h1>Now Playing Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <button onClick={() => handleAddMovie(movie)}>Add</button>
          </div>
        ))}
      </div>
      <button onClick={() => setPage((prev) => prev + 1)} disabled={loading}>
        {loading ? 'Loading...' : 'View More'}
      </button>
    </div>
  );
};

export default AddMoviesFromTMDB;
