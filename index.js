// import
const express = require('express');

// init our vars
const app = express();

// routes
app.get('/', (req, res) => res.send('This is the index page'));


// start our application server
app.listen(3000, () => console.log('Server running on port 3000...'));
