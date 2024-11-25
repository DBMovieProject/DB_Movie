import React from 'react'
import axios from 'axios';

const MovieApi = () => {
  const getAllMovies = async () => {
    try {
        const response = await axios.get('http://localhost:3001/MovieRoutes/getAllMovies'); // Make sure your backend API URL is correct
        return response.data
    } catch (error) {
        console.error('Error fetching movies:', error);
        return `error ${error}, ${false}`
    }
    };


    const getAllMoviesByPopularity = async () => {
        try {
            const response = await axios.get('http://localhost:3001/MovieRoutes/getAllMoviesByPopularity'); // Make sure your backend API URL is correct
            return response.data
        } catch (error) {
            console.error('Error fetching movies:', error);
            return `error ${error}, ${false}`
        }
        };

    const getAllGenres = async () => {
        try {
            const response = await axios.get('http://localhost:3001/MovieRoutes/getAllGenres'); // Adjust the API endpoint if needed
            return response.data
        } catch (error) {
            console.error('Error fetching genres:', error);
            return `error ${error}, ${false}`
        }
        };
    
    const getMoviesByGenre = async (genreID) => {
        try {
            const response = await axios.get(`http://localhost:3001/MovieRoutes/getMoviesByGenre/${genreID}`); // Adjust the API endpoint if needed
            return response.data
        } catch (error) {
            console.error('Error fetching genres:', error);
            return `error ${error}, ${false}`
        }
        };
    
    const searchMovie = async (title) => {
        try {
            const response = await axios.get(`http://localhost:3001/MovieRoutes/searchMovies?title=${title}`); // Adjust the API endpoint if needed
            return response.data
        } catch (error) {
            console.error('Error fetching genres:', error);
            return `error ${error}, ${false}`
        }
    }

    const getAllDirectors = async () => {
        try {
            const response = await axios.get('http://localhost:3001/MovieRoutes/getAllDirectors'); // Adjust the API endpoint if needed
            return response.data
        } catch (error) {
            console.error('Error fetching genres:', error);
            return `error ${error}, ${false}`
        }
        };

    const getMoviesByDirector = async (directorID) => {
        try {
            const response = await axios.get(`http://localhost:3001/MovieRoutes/getMoviesByDirector/${directorID}`); // Adjust the API endpoint if needed
            return response.data
        } catch (error) {
            console.error('Error fetching genres:', error);
            return `error ${error}, ${false}`
        }
        };

    const getUserReviews = async (userID) => {
        try {
            const response = await axios.get(`http://localhost:3001/auth/getUserReviews/${userID}`); // Adjust the API endpoint if needed
            return response.data
        } catch (error) {
            console.error('Error fetching genres:', error);
            return `error ${error}, ${false}`
        }
        };
  return {
    getAllMovies,
    getAllMoviesByPopularity,
    getAllGenres,
    getMoviesByGenre,
    searchMovie,
    getAllDirectors,
    getMoviesByDirector,
    getUserReviews
}
}

export default MovieApi