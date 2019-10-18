const express = require('express');
const routes = require('./src/routes');

const app = express();

app.set('views', '/app/src/views/');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(3000, () => console.log('Server running on port 3000...'));
