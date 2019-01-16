var express = require('express');
var mysql = require("mysql");
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');

var app = express();

global.db = mysql.createConnection({
    host: "localhost",
    database: "marketplace",
    user: "node_js",
    password: "nodepass"
});

app.use(cookieParser());
app.use(session({ resave: true ,secret: '123456' , saveUninitialized: true}));


app.use(function(req, res, next) {
    if (!req.session.cart_items){
        req.session.cart_items = [1];
    }
    next();
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
app.use('/cart', cartRouter);




module.exports = app;

