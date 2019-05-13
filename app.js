const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const promiseRouter = require('express-promise-router');

const registerRoutes = require('./routes/index');
const error = require('./middlewares/error');

const app = express();
const router = promiseRouter();

app.set('trust proxy', true);

app.use(logger('dev'));
app.use(express.json());
// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Register our REST API.
registerRoutes(router);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
