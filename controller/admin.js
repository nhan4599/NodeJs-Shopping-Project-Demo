/*jshint esversion: 8 */
var express = require('express');
var constant = require('../constant.js');
var db = require('../database.js');

var CheckAdmin = (req, res, next) => {
    if (!req.session.admin && req.originalUrl != '/admin/login')
        res.redirect('/admin/login');
    else
        next();
};

var err = '';

var router = express.Router();

router.use(CheckAdmin);

router.get('/', (req, res) => {
    res.redirect('/admin/home');
});

router.get('/home', (req, res) => {
    res.render('admin/home.ejs');
});

router.get('/login', (req, res) => {
    res.render('admin/login.ejs');
});

router.post('/login', async (req, res) => {
    var user = req.body.username;
    var pass = req.body.password;
    var adminData = await db.AdminLogin(user, pass);
    if (adminData === false) {
        res.render('admin/login.ejs', { err: 'Unexpected Error!' });
    } else {
        if (adminData == null) {
            res.render('admin/login.ejs', { err: 'admin username and/or password is incorrect' });
        } else {
            req.session.admin = adminData;
            res.redirect('/admin/');
        }
    }
});

router.post('/logout', (req, res) => {
    req.session.admin = null;
    res.redirect('/admin/login');
});

router.get('/category', async (req, res) => {
    var list = await db.GetCategoryList();
    res.render('admin/category', { list: list, err: err });
});

router.post('/category', async (req, res) => {
    var id = req.body.cateId;
    var name = req.body.cateName;
    var result = await db.UpdateCategory(id, name);
    if (result == -1)
        err = 'Unexpected error!';
    res.redirect('/admin/category');
});

module.exports = router;