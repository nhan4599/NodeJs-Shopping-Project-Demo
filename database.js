/*jshint esversion: 8 */
var mongoClient = require('mongodb').MongoClient;
var constant = require('./constant.js');
var crypto = require('crypto');

var conn = new mongoClient(constant.connectionString);

module.exports.AdminLogin = async function(user, pass) {
    try {
        await conn.connect({connectWithNoPrimary: true});
        var hashed = crypto.createHash('md5').update(pass).digest('hex');
        var query = {user: user, pass: hashed};
        var result = await conn.db(constant.dbName).collection('admins').findOne(query);
        return result;
    }catch (err) {
        console.log(err.stack);
    }
};

module.exports.GetCategoryList = async function() {
    try {
        await conn.connect({connectWithNoPrimary: true});
        var result = await conn.db(constant.dbName).collection('categories').find().toArray();
        return result;
    }catch (err) {
        return null;
    }
};