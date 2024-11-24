const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail } = require('../models/User');

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('this is the data being sent', req.body)
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    
    const newUser = await createUser(username, email, password);
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
    const orderedCart = await getCartItems(user.user_id)
    console.log('User is, ',user, orderedCart)
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.status(201).json({ 'signedin': true,  'username': user.name, 'cart': orderedCart, 'user_id': user.user_id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup, login };