var express = require('express');
var mysql = require("mysql");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

var app = express();

global.db = mysql.createConnection({
    host: "localhost",
    database: "marketplace",
    user: "node_js",
    password: "nodepass"
});

global.dbEscape = function(str){
    return mysql.escape(str);
};


db.connect();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

module.exports = app;

