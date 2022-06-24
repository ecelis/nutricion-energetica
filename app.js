var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var ingredientRouter = require('./routes/ingredient');
var recipeRouter = require('./routes/recipe');
var usersRouter = require('./routes/users');
var app = express();
if(process.env.NODE_ENV !== 'production') { app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 })); }
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/ingredient', ingredientRouter);
app.use('/recipe', recipeRouter);
app.use('/users', usersRouter);

module.exports = app;
