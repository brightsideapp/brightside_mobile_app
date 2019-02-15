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
const getData = () => {
    return new Promise((resolve, reject) => {
        pool.query('select * from resource;', (error, response, fields) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// search for keyword ie. advocacy, legal, money, etc
const searchData = keyword => {
    return new Promise((resolve, reject) => {
        pool.query(`select * from resource where keywords like '%${keyword}%';`, (error, response, fields) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// get resource by categories
const getByCategory = key => {
    let categs = {
        legal: 'Legal and Advocacy',
        health: 'Health, Counselling',
        hub: 'Community Hub',
    }

    return new Promise((resolve, reject) => {
        pool.query(`select * from resource where res_type='${categs[key]}';`, (error, response, fields) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

module.exports = {
    getData,
    searchData,
    getByCategory,
}