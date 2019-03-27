const express = require('express');
const homeRouter = require('./../routes/home');

const app = express();

app.set('view engine', 'pug');

app.use('/', homeRouter);

app.listen(3000, () => console.log('Listening on port 3000'));
