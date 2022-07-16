var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
var ingredientRouter = require('./routes/ingredient');
var mealTypeRouter = require('./routes/mealtype');
var menuRouter = require('./routes/menu');
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
app.use('/category', categoryRouter);
app.use('/ingredient', ingredientRouter);
app.use('/mealtype', mealTypeRouter);
app.use('/menu', menuRouter);
app.use('/recipe', recipeRouter);
app.use('/users', usersRouter);

module.exports = app;
