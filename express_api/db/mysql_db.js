const mysql = require('mysql');
const config = require('../cred/secret.json')

// Creates the connection to the database
var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


// Methods of getting data from database
var getData = () => {
    return new Promise((resolve, reject) => {
        pool.query('select * from resource;', (error, response, fields) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

module.exports = {
    getData
}