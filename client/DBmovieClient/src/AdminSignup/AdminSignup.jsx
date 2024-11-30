import { React, useState, useEffect } from 'react'
import './AdminSignup.scss'
import { NavLink, Link, useNavigate} from "react-router-dom"
import SendSignupData from '../ApiCalls/SendSignupData'
const AdminSignup = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { postSignupData } = SendSignupData()
    const sendUserData = async () => {
        try {
            const data = await postSignupData({ 'email': email, 'username': username, 'password':password, role: 'admin' })
            console.log(data)
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
        if (!email || !username || !password) {
          alert('Please fill in all fields');
          return;
        }else {
            sendUserData({ 'username':username, 'password':password, 'email':email, 'role': 'admin'})
        }
      
        // Proceed with the signup process if all fields are filled
        console.log('Form submitted');
      };

  return (
    <div className= 'signup'>
        <div className='signup-content-container'>
            <div className='signup-header-container'>
                <h1>Admin Sign up</h1>
            </div>

            <div className='signup-content'>

                <div className='signup-username-container'>
                    <p id='username' >Email</p>
                    <div className='Hero-SearchBar-Container '>
                        <input className="search-input" type="email" placeholder='Enter your email' value={email} onChange={ (event) => {handleEmail(event)} } required />
                    </div>
                </div>

                <div className='signup-username-container'>
                    <p id='username' >Username</p>
                    <div className='Hero-SearchBar-Container '>
                        <input className="search-input" type="text" placeholder='Enter username' value={username} onChange={ (event) => {handleUserName(event)} } required />
                    </div>
                </div>
                
                
                <div className='signup-password-container'>
                    <p id='password' >Password</p>
                    <div className='Hero-SearchBar-Container '>
                        <input className="search-input" type="password" placeholder='Enter password' value={password} onChange={ (event) => {handlePassword(event)} } required />
                    </div>
                </div>

                <div className='signup-button-container'>
                    <button id='signup-button' onClick={ handleSignup }><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>Sign up</Link></button>
                </div>
                
            </div>

        </div>
    </div>
  )
}

export default AdminSignup