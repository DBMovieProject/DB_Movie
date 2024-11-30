import React from 'react'
import './Reviewlist.scss'
import ReviewlistCard from '../ReviewlistCard/ReviewlistCard'
const Reviewlist = (props) => {
  return (
    <div className='YourCart'>
        <div className='YourCart-Container'>
            <div className='header-container'>
                <h1>Your Reviewlist</h1>
            </div>

            <div className='YourCart-Content-Container'>
                {props.reviewlist.length > 0? props.reviewlist.map( (review, index) => (
                     < ReviewlistCard key={index}  review = { review } user_id = { props.user_id } />)
                ):null
                   
                }
                
            </div>


        </div>
    </div>
  )
}

export default Reviewlist