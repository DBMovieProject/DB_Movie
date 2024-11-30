import  { React, useState, useEffect } from 'react'
import MovieApi from '../ApiCalls/MovieApi';
import './Moviecard.css'
import { useNavigate } from 'react-router-dom';
const Moviecard = (props) => {
    console.log('here are the props', props)
    const navigate = useNavigate(); //Initialize the hook
    const [ review, setReview ] = useState({ 
                                             movieID: '',
                                             userID: '',
                                             rating: '',
                                             reviewText: ''  
                                            });

    const { addUserReviews, removeMovie } =  MovieApi()




      const handleRemoveMovie = async (movieId) => {
        try {
          // Call the backend to remove the movie
          await removeMovie(movieId);
          
          // Update the UI state by trigerring useeffect refreshing 
          props.setRefresh((prev) => !prev); // Toggle `refresh` to trigger useEffec
        } catch (error) {
          console.error('Error removing movie:', error);
        }
      };
    
    


  return (
    <div className='FlyerCard'>
        <div className='FlyerCard-img-container'>
            <img src={`https://image.tmdb.org/t/p/w500/${props.event.poster_path}`} className= "event-flyer" alt="" />
        </div>
        <div className= 'FlyerCard-content-container'>
            <h1 className='eventName'>{props.event.title}</h1>
            <p> releasedate: 
                <span className='description-content'>{
                new Date(props.event.releasedate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    })}</span></p>
            <p> Popularity: <span>{props.event.popularity}</span></p>

            <p > Genre: <span>{Array.isArray(props.event.genres)? props.event.genres.map( (genre, index) => (
                <p className='genre-text' key={index} > {genre} </p>
            )): <p className='genre-text'> {props.event.genres}  </p>}</span></p>

            <div className='YourCart-Content-Quantity'>
                {
                    props.adminLoggedin !==true?
                    <div>
                        <button id='contact' onClick={ () => { navigate(`/addUserReview/${props.event.movieid}`) } }>Add</button>

                    </div>:

                    <div>
                        <button id='contact' onClick={ () => handleRemoveMovie(props.event.movieid) }>Remove</button>

                    </div>
                }
                

            </div>
        </div>

        
    </div>
  
  )
}

export default Moviecard