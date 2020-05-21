var express = require('express');

var router = express.Router();

router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/');
    }else {
        res.render('login.ejs');
    }
});

router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (username == 'nhan4599' && password == '123') {
        req.session.user = username;
        res.redirect('/');
    }else {
        res.send('username and/or password is incorrect');
    }
});

module.exports = router;