import { React, useState }  from 'react'
import { useParams, Link, useNavigate} from 'react-router-dom';
import MovieApi from '../ApiCalls/MovieApi';
import './Addreview.scss'

const Addreview = (props) => {
    const { movieid } = useParams();
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const navigate = useNavigate(); //Initialize the hook
    const [ review, setReview ] = useState({ 
        movieID: movieid,
        userID: props.user_id,
        rating: '',
        reviewText: ''  
       });

    const { addUserReviews } =  MovieApi()

    const handleAddReview = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
        ...prevReview,
        [name]: value,  // Dynamically update the corresponding field
        }));
        addUserReviews(review)
    
      };
    console.log(props)
    console.log(`This is the movieID ${movieid}, this is the userID ${props.user_id} `)
  return (
    <div className= 'login'>
        <div className='review-content-container'>
            <div className='review-header-container'>
                <h1>Enter Review</h1>
            </div>

            <div className='login-content'>

                <div className='login-username-container'>
                    <p id='username' >Rating</p>
                    <div className='Review-SearchBar-Container'>
                        <input 
                               className="search-input" 
                               type="number"
                               name="rating"
                               placeholder='Enter your rating for the movie (1-5)' 
                               value={review.rating} 
                               onChange={(e) => {
                                    const value = parseInt(e.target.value, 10); // Convert to number
                                    if (value >= 1 && value <= 5) {
                                        setReview((prevReview) => ({
                                            ...prevReview,
                                            rating: value,
                                        }));
                                    } else if (e.target.value === "") {
                                        setReview((prevReview) => ({
                                            ...prevReview,
                                            rating: "",
                                        })); // Allow empty input
                                    }
                                }} 
                               min="1"
                               max="5"
                               required 
                        />
                    </div>
                </div>

                
                <div className='login-password-container'>
                    <p id='password' >Comment</p>
                    <div className='Review-Comment-Container'>
                        <textarea 
                               className="comment-textarea"
 
                               type="text" 
                               name="reviewText"
                               placeholder='Enter a comment' 
                               value={review.reviewText} 
                               onChange={(e) => {
                                        const {value } = e.target;
                                        setReview((prevReview) => ({
                                            ...prevReview,
                                            reviewText: value,
                                        }));    
                                }} 
                               required
                        ></textarea>

                    </div>
                </div>

                <div className='login-button-container'>
                    <button id='login-button' onClick={ () => { addUserReviews(review); } }><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/reviewlist'> Add Review </Link></button>
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default Addreview