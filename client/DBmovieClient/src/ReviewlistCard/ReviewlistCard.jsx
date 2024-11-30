import React from 'react'
import './ReviewlistCard.css'

const ReviewlistCard = (props) => {
    console.log("OK THIS IS THE PROP", props.review)
  return (

    <div className='YourCard'>
        <div className='YourCart-image-with-header-container'>
            <div className='YourCart-Content-Header'>
                <h1> {props.review.title}</h1>
            </div>
            <div className='FlyerCard-img-container '>
                <img src={ `https://image.tmdb.org/t/p/w500/${props.review.poster_path}`}  className= 'clothing-image' />
            </div>

        </div>
        
        <div className='YourCart-Content-Price'>
            <p> Rating: {props.review.rating } </p>
        

        </div>

        <div className='YourCart-Content-Price'>
            <p> Comment: {props.review.reviewtext } </p>
        

        </div>
        
        
    </div>
  )
}

export default ReviewlistCard