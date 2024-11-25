// User model using JWT for token-based authentication
const pool = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, password) => {
    console.log('Thiw is the password,', password, name, email)
  try{
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('hashedpassword', hashedPassword)
    const result = await pool.query(
        'INSERT INTO Users (Username, Email, Password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
    );
    console.log('This is the result', result)
    return result.rows[0];

  }catch (error) {
    console.error(error)
  }
  
};

const findUserByEmail = async (email) => {
  console.log('USer email is, ',email)
  try {
    const result = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);
    console.log('result is', result.rows)
    return result.rows[0];
  }catch (error) {
    console.error(error)
  }
  
};

async function getUserReviews(userID) {
    try {
      const query = `
        SELECT Review.ReviewID, Movie.Title, Movie.poster_path ,Review.Rating, Review.ReviewText
        FROM Review
        INNER JOIN Movie ON Review.MovieID = Movie.MovieID
        WHERE Review.UserID = $1
      `;
      const values = [userID];
      const result = await pool.query(query, values); // Execute the query
      return result.rows; // Return the list of reviews
    } catch (error) {
      console.error('Error fetching user reviews:', error.message);
      throw error;
    }
  }

module.exports = { createUser, 
                    findUserByEmail,
                    getUserReviews };