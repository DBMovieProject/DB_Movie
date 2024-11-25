import React from 'react'
import { useState, useEffect } from 'react';
import MovieApi from '../ApiCalls/MovieApi';
import './Recommended.css'
import Moviecard from '../Moviecard/Moviecard';

const Recommended = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(""); // State to track selected option
    const [selectedDirector, setSelectedDirector] = useState("");
    const [searchTerm, setSearchTerm] = useState('')
    
    
    const {getAllMovies, 
            getAllGenres, 
            getMoviesByGenre, 
            searchMovie,
            getAllDirectors,
            getMoviesByDirector,
            getAllMoviesByPopularity } =  MovieApi()
    useEffect( () => {
        const fethAllmovies = async() => {
            const movies = await getAllMoviesByPopularity()
            console.log(`movies are ${movies}`)
            setMovies(movies)
            //get All 
        }
        const fetchAllgenres = async() => {
            const genres = await getAllGenres()
            console.log(`genres are`, genres)
            setGenres(genres)
        }

        const fetchAlldirectors = async() => {
            const directors = await getAllDirectors()
            console.log(`directors are`, directors)
            setDirectors(directors)
        }

    
        fethAllmovies();
        fetchAllgenres();
        fetchAlldirectors();
    },[]);

    // Handle selection change
    const handleSelect = async (e) => {
        const genreID = e.target.value; // Get selected genre ID
        setSelectedGenre(e.target.value);
        console.log("Selected genre ID:", e);

        try {
            if (genreID) {
              const moviesByGenre = await getMoviesByGenre(genreID); // Fetch movies for the selected genre
              console.log(`Movies for genre ${genreID}:`, moviesByGenre);
              setMovies(moviesByGenre); // Update movies state to display the filtered list
            }
          } catch (error) {
            console.error("Error fetching movies by genre:", error);
            setMovies([]); // Reset movies to empty if an error occurs
          }
    };

    const handleSelectDirector = async (e) => {
        const directorID = e.target.value; // Get selected genre ID
        setSelectedDirector(e.target.value);
        console.log("Selected genre ID:", e);

        try {
            if (directorID) {
              const moviesByGenre = await getMoviesByDirector(directorID); // Fetch movies for the selected genre
              console.log(`Movies for genre ${directorID}:`, moviesByGenre);
              setMovies(moviesByGenre); // Update movies state to display the filtered list
            }
          } catch (error) {
            console.error("Error fetching movies by genre:", error);
            setMovies([]); // Reset movies to empty if an error occurs
          }
    };

    const handleSearch = async (event) => {
        setSearchTerm(event.target.value);
        
        try {
            if (event.target.value) {
              const movie = await searchMovie(event.target.value); // Fetch movies for the selected genre
              console.log(`Movies searched up ${event.target.value}:`, movie);
              setMovies(movie); // Update movies state to display the filtered list
            }
          } catch (error) {
            console.error("Error fetching movies by genre:", error);
            setMovies([]); // Reset movies to empty if an error occurs
          }

        
    
 
      }
  return (
    <main className="event-page">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="event-header-container ">
            <h1 className="text-2xl sm:.event-header-container -3xl lg:text-4xl font-bold text-gray-900">
              Movie Recommendations ordered
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl">
              
            </p>
          </div>
          
          {/* <div className='Hero-Searchbar'>
                <div className='Hero-SearchBar-Container'>
                    <span className="search-icon material-symbols-outlined">search</span>
                    <input className="search-input" type="search" placeholder='Search' value={searchTerm} onChange={ (event) => {handleSearch(event)} } />
                </div>

            </div> */}
            
          {/* Navigation Tabs */}
          {/* <div className="dropdown-container">
            <nav className="dropdown-nav">
                <label htmlFor="genre-dropdown" className="dropdown-label">
                Select a Genre
                </label>
                <select
                id="genre-dropdown"
                className="dropdown-select"
                value={selectedGenre}
                onChange={handleSelect}
                >
                <option value="" disabled></option>
                {genres? genres.map((genre) => (
                   
                    <option key={genre.genreid} value={genre.genreid}>
                    {genre.genrename}
                    </option>
                )):null}
                </select>
                
            </nav>
          </div> */}

          {/* <div className="dropdown-container">
            <nav className="dropdown-nav">
                <label htmlFor="genre-dropdown" className="dropdown-label">
                Select a Director
                </label>
                <select
                id="genre-dropdown"
                className="dropdown-select"
                value={selectedDirector}
                onChange={handleSelectDirector}
                >
                <option value="" disabled></option>
                {directors? directors.map((director) => (
                   
                    <option key={director.directorid} value={director.directorid}>
                    {director.name}
                    </option>
                )):null}
                </select>
                
            </nav>
          </div> */}
  
          {/* Event Cards Grid */}
          <div className="event-content-container">
            {movies?.map((event, index) => (
              <Moviecard key={index} event={event} />
            ))}
          </div>
  
          {/* About Section */}
          {/* <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              About our Events
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              At SACS (Society of Advancement in Computer Science), we offer a diverse range of events to support students' growth in Computer Science, whether they are just starting their programming journey, exploring new fields, or gaining insights into the tech industry. Our events provide a holistic experience, from workshops like CS Declassified, which breaks down core computer science concepts, to Acing Your Internship, where successful interns share their experiences and strategies for landing return offers. We also host networking opportunities like the SACS Interest Meeting, ensuring that students have access to both learning and professional growth. SACS is committed to fostering a supportive environment for all students interested in Computer Science.
            </p>
          </div> */}
        </div>
      </main>
  )
}

export default Recommended