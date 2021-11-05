const express = require('express');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
const app = express();

// add middleware functions

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json());

// instructs server to make our front-end files accessible; makes all files in 'public' folder static resources
app.use(express.static('public'));

// use and access api & html routes folders
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// listens for PORT when server.js is run
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});