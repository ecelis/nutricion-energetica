var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var ingredientRouter = require('./routes/ingredient');
var recipeRouter = require('./routes/recipe');

var app = express();
//app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/ingredient', ingredientRouter);
app.use('/recipe', recipeRouter);

module.exports = app;
