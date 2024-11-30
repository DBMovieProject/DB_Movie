// User model using JWT for token-based authentication
const pool = require('../db');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, password, role = false) => {
    console.log('HElLOOOO WORLD', role)
    console.log('This is the input:', { name, email, password, role });
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Hashed password:', hashedPassword);

        // Insert the new user into the database, including the role
        const result = await pool.query(
            'INSERT INTO Users (Username, Email, Password, Role) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, hashedPassword, role? 'admin':'user']
        );

        console.log('Database result:', result.rows[0]);
        return result.rows[0]; // Return the inserted user data

    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Propagate error for further handling
    }
};


const findUserByEmail = async (email) => {
    console.log('User email is:', email);
    try {
      const result = await pool.query('SELECT * FROM Users WHERE Email = $1', [email]);
      console.log('Result is:', result.rows);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error; // Ensure the error propagates
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
      console.log('User review is', result)
      return result.rows; // Return the list of reviews
    } catch (error) {
      console.error('Error fetching user reviews:', error.message);
      throw error;
    }
  }

module.exports = { createUser, 
                    findUserByEmail,
                    getUserReviews };