const express = require('express');
const cookie_parser = require('cookie-parser');

const routes = require('./src/routes');
const app = express();

app.set('views', '/app/src/views/');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());
app.use('/', routes);

app.listen(3000, () => console.log('Server running on port 3000...'));
