import React from 'react'
import './Moviecard.css'
const Moviecard = (props) => {
    console.log('here are the props', props)
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
        </div>
    </div>
  
  )
}

export default Moviecard