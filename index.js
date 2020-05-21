const express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.listen(8080);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/assets/:fileName', (req, res) => {
    res.sendFile(__dirname + `/assets/${req.params.fileName}`);
});

app.use('/', require('./controller/customer.js'));