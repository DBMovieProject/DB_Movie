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
            <div className='YourCart-image-container'>
                <img src={ `https://image.tmdb.org/t/p/w500/${props.review.poster_path}`}  className= 'clothing-image' />
            </div>

        </div>
        
        <div className='YourCart-Content-Price'>
            <p> rating: {props.review.rating } </p>
        

        </div>

        <div className='YourCart-Content-Price'>
            <p> comment: {props.review.reviewtext } </p>
        

        </div>
        {/* <div className='YourCart-Content-Quantity'>
            <p id='quantity'> { props.reviewlist.quantity }</p>

            <div>
                <button id='Contact' onClick={ () => { handleAddProduct(props.cloth.items_id) } }>Add</button>

            </div>
            <div>
                <button id='Contact' onClick={ () => {handleRemoveProduct(props.cloth.items_id) }}>Remove</button>

            </div>

        </div>
        <div className='YourCart-Content-Total'>
            <p> Total cost { props.cloth.total_cost } </p> 
        </div> */}
    </div>
  )
}

export default ReviewlistCard