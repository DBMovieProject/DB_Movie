import React from 'react'

const Addreview = () => {
  return (
    <div className= 'login'>
        <div className='login-content-container'>
            <div className='login-header-container'>
                <h1>Enter Review</h1>
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

export default Addreview