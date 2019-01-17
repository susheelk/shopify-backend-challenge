const express = require('express');
const mysql = require("mysql");
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const app = express();

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
        req.session.cart_items = [];
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

