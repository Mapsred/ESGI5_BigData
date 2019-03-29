const express = require('express');
const homeRouter = require('./../routes/home');
const areaRouter = require('./../routes/area');
const pvpRouter = require('./../routes/pvp');
const pveRouter = require('./../routes/pve');
const economyRouter = require('./../routes/economy');
const raceRouter = require('./../routes/race');
const patchRouter = require('./../routes/patch');
const wordsRouter = require('./../routes/words');

const app = express();

app.set('view engine', 'pug');

app.use(express.static('./public'));

app.use('/', homeRouter);
app.use('/', areaRouter);
app.use('/', pvpRouter);
app.use('/', pveRouter);
app.use('/', economyRouter);
app.use('/', raceRouter);
app.use('/', patchRouter);
app.use('/', wordsRouter);

app.listen(3000, () => console.log('Listening on port 3000'));
