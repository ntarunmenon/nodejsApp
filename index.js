const Joi = require('joi');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected'))
.catch(err => console.log(err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

