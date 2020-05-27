/*jshint esversion: 6 */
var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('home.ejs');
});

router.use('/account/', require('./account.js'));

module.exports = router;