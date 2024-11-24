// Entry point
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const ApiRoutes = require('./routes/apiRoutes');
const pool = require("./db") 
// const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes');
// const searchRoutes = require('./routes/searchRoutes');

//Middlewares
app.use(express.json());
app.use(morgan('tiny'));  // Logs every HTTP request
app.use(cors());

//Routes
app.use('/auth', authRoutes);
app.use('/ApiRoutes', ApiRoutes)
// app.use('/getAllMovies', movieRoutes);
// app.use('/cart', cartRoutes);
// app.use('/search', searchRoutes);

// const PORT = 5432;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
console.log('hello world');
module.exports = app;