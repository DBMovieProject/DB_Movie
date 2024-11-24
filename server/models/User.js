// User model using JWT for token-based authentication
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashedpassword', hashedPassword)
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  console.log('This is the result', result)
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  console.log('USer email is, ',email)
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };