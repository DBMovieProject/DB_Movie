import React from 'react'
import { NavLink, Link, useNavigate} from "react-router-dom"
import DanielLogo from '../assets/Logo/DanielLogo.png'
import './Navbar.css'
import { useState, } from 'react'

const Navbar = (props) => {
    const navigate = useNavigate();
    const [IsSticky, setIsSticky] = useState(false)
    console.log(props.username)
  return (
    <div className={IsSticky? 'navbar-sticky' :'navbar' }>
        <img className='Logo' src ={DanielLogo} alt = "Daniel Oluwarotimi Logo" onClick={() => navigate('/')}  />
       
        

        {!props.loggedin?
        <div>
          <button id='Contact'><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Recommended'>Recommended</Link></button>
          <button id='Contact'><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/login'>Log in</Link></button>
          <button id='Contact'><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/signup'>Sign up</Link></button>
          

        </div> :
        <div className='nav-loggedin'>
        <ul className= "nav-links">
            <li><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/Reviewlist'>Reviewlist</Link></li>

        
        </ul>
        <div id='username-nav'> <p>Username: { props.username } </p> </div>
        </div>
        }
        
    </div>
  )
}

export default Navbar