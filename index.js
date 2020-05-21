var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'nhan4599', resave: true, saveUninitialized: true }));
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.set('view engine', 'ejs');

app.get('/assets/:fileName', (req, res) => {
    res.sendFile(__dirname + `/assets/${req.params.fileName}`);
});

app.use('/', require('./controller/customer.js'));