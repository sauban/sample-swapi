var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const promiseRouter = require('express-promise-router');

var registerRoutes = require('./routes/index');

var app = express();
const router = promiseRouter();

app.use(logger('dev'));
app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', appRouter);

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
