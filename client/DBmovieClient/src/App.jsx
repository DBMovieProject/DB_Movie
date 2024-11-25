import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Navbar/Navbar';
import Login from './Login/Login';
import Home from './Home/Home';
import Recommended from './Recommended/Recommended';


import { React, useState } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Reviewlist from './Reviewlist/Reviewlist';

function App() {
  const [count, setCount] = useState(0)

  const [loggedin, setLoggedin] = useState(false);
  const [username, setUsername] = useState('')
  const [reviewlist, setReviewlist ] = useState([])
  const [user_id, setUserid] = useState('')


  return (
    <div className='app' style={{ height: '100vh' }}>
      

      <BrowserRouter>

        <Navbar loggedin = {loggedin} username= { username } />
        <Routes>
             <Route path="/" element={< Home />} />
             <Route path="/login" element={<Login  setLoggedin = { setLoggedin } setUsername={setUsername} setUserid = {setUserid} setReviewlist={setReviewlist} />} />
             <Route path="/reviewlist" element={<Reviewlist setReviewlist={setReviewlist} reviewlist = {reviewlist} user_id = {user_id} />} />
             <Route path="/Recommended" element={<Recommended setReviewlist={setReviewlist} reviewlist = {reviewlist} user_id = {user_id} />} />
          {/* // <Route path="/yourcart" element={< Yourcart yourCart= {yourCart} setyourCart = { setyourCart } user_id = {user_id} />} />
          // <Route path="/signup" element={<Signup/>} />
          // <Route path="/login" element={<Login  setLoggedin = { setLoggedin } setUsername={setUsername} setyourCart = {setyourCart} setUserid = {setUserid} />} />
          // <Route path="/women" element={<Women yourCart = { yourCart } setyourCart = {setyourCart} loggedin = {loggedin}  user_id = { user_id }/>} />
          // <Route path="/men" element={< Men yourCart = { yourCart } setyourCart = {setrt}  loggedin = {loggedin} user_id = { user_id }/>} />
          // <Route path="/kids" element={<home/>} /> */}


        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App
