const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail, getUserReviews } = require('../models/User');

const signup = async (req, res) => {
  const { username, email, password, role = false } = req.body;
  console.log('this is the data being sent', req.body)
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    console.log(`The user already exist`, existingUser, role)
    const newUser = await createUser(username, email, password, role);
    console.log('new user',newUser)
    res.status(201).json({ 'signedup' :true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isAdmin = user.role === 'admin'; // Assuming 'role' field holds 'admin' or 'user'

    res.status(200).json({
      signedIn: true,
      username: user.username,
      user_id: user.userid,
      isAdmin, // Include admin status in the response
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const getUserReviewsHandler = async (req, res) => {
  try {
    const { userID } = req.params; // Assuming userID is passed as a route parameter
    if (!userID) {
      return res.status(400).json({ message: 'userID is required' });
    }

    const reviews = await getUserReviews(userID);
    if (reviews.length === 0) {
      return res.status(200).json({ message: 'No reviews found for this user', reviews: [] });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error in getUserReviewsHandler:', error.message);
    res.status(500).json({ message: 'Server error occurred while fetching user reviews' });
  }
};

module.exports = { signup, 
                    login,
                    getUserReviewsHandler };