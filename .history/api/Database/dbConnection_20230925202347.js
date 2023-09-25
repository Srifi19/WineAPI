const mysql = require('mysql2');
const mainData = require('./mainData');

const pool = mysql.createPool({
    host: mainData.HOST,
    user: mainData.USERNAME,
    password: mainData.PASSWORD,
    database: mainData.DATABASE

})

module.exports = pool.promise();
