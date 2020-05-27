/*jshint esversion: 8 */
var mongoClient = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectId;
var constant = require('./constant.js');
var crypto = require('crypto');

var conn = new mongoClient(constant.connectionString);

async function IsUniqueCateID(conn, id) {
    try {
        var query = { _id: new objectId(id) };
        var result = await conn.db(constant.dbName).collection('categories').findOne(query);
        return result == null;
    } catch (err) {
        return false;
    }
}

module.exports.AdminLogin = async function (user, pass) {
    try {
        await conn.connect({ connectWithNoPrimary: true });
        var hashed = crypto.createHash('md5').update(pass).digest('hex');
        var query = { user: user, pass: hashed };
        var result = await conn.db(constant.dbName).collection('admins').findOne(query);
        return result;
    } catch (err) {
        console.log(err.stack);
    }
};

module.exports.GetCategoryList = async function () {
    try {
        await conn.connect({ connectWithNoPrimary: true });
        var result = await conn.db(constant.dbName).collection('categories').find().toArray();
        return result;
    } catch (err) {
        return null;
    }
};

module.exports.UpdateCategory = async function (id, name) {
    try {
        await conn.connect({ connectWithNoPrimary: true });
        var isUnique = await IsUniqueCateID(conn, id);
        if (isUnique || id === '') {
            var query = { name: name };
            var addResult = await conn.db(constant.dbName).collection('categories').insertOne(query);
            return addResult.insertedCount;
        } else {
            var filter = { _id: new objectId(id)};
            var newData = { $set: { name: name } };
            var updateResult = await conn.db(constant.dbName).collection('categories').updateOne(filter, newData);
            return updateResult.result.nModified;
        }
    } catch (err) {
        console.log(err);
        return -1;
    }
};