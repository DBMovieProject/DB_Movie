import { React, useState } from 'react'
import './AdminLogin.css'
import { NavLink, Link, useNavigate} from "react-router-dom"
import SendLoginData from '../ApiCalls/SendLoginData'
import MovieApi from '../ApiCalls/MovieApi'

const AdminLogin = (props) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { postSigninData } =SendLoginData();
    

    const { getUserReviews } = MovieApi()
    const sendUserData = async () => {
        try {
            const data = await postSigninData({ 'email': email,  'password':password })
            console.log(data, props.setAdminLoggedin)
            props.setUsername(data.username)
            if (data.isAdmin) {
                props.setAdminLoggedin(true)
            }
            props.setUserid(data.user_id)
            // const response = await getUserReviews(data.user_id)
            // console.log(`response is,`, response)
            // props.setReviewlist(response)

        } catch (error) {
            console.error('Error sending data to the backend', error)
        }
    };
        

    const handleEmail = (event) => {
        console.log(event.target.value, email)
        setEmail(event.target.value)
    }

    const handleUserName = (event) => {
        console.log(event.target.value, username)
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        console.log(event.target.value, password)
        setPassword(event.target.value)
    }

    const handleSignup = (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
      
        // Check if all fields are filled
        if (!email || !password) {
          alert('Please fill in all fields');
          return;
        }else {
            sendUserData({ 'username':username, 'password':password, 'email':email})
        }
      
        // Proceed with the signup process if all fields are filled
        console.log('Form submitted');
      };

  return (
    <div className= 'Admin login'>
        <div className='login-content-container'>
            <div className='login-header-container'>
                <h1>Login</h1>
            </div>

            <div className='login-content'>

                <div className='login-username-container'>
                    <p id='username' >Email</p>
                    <div className='Hero-SearchBar-Container '>
                        <input className="search-input" type="email" placeholder='Enter your email' value={email} onChange={ (event) => {handleEmail(event)} } required />
                    </div>
                </div>

                
                <div className='login-password-container'>
                    <p id='password' >Password</p>
                    <div className='Hero-SearchBar-Container '>
                        <input className="search-input" type="password" placeholder='Enter password' value={password} onChange={ (event) => {handlePassword(event)} } required />
                    </div>
                </div>

                <div className='login-button-container'>
                    <button id='login-button' onClick={ handleSignup }><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/reviewlist'> Login </Link></button>
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default AdminLogin