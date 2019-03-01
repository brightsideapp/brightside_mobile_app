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
// const getData = () => {
//     return new Promise((resolve, reject) => {
//         pool.query('select a.*, b.perks, c.resource_type from resource a \
//         join perks b on a.perk_id = b.perk_id \
//         join resource_type c on a.res_type_id = c.type_id;', (error, response, fields) => {
//             if (error) reject(error);
//             else resolve(response);
//         })
//     })
// }

// search for keyword ie. advocacy, legal, money, etc
const searchData = keyword => {
    return new Promise((resolve, reject) => {
        pool.query(`select a.*, b.perks, c.resource_type from resource a \
        join perks b on a.perk_id = b.perk_id \
        join resource_type c on a.res_type_id = c.type_id where a.keywords like '%${keyword}%';`, (error, response, fields) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// get resource by categories
const getByCategory = key => {
    return new Promise((resolve, reject) => {
        pool.query(`select a.resourceId,a.organization,a.location,a.description,\
            a.website,a.phoneNumber,a.tollFree,e.perk from \
            resource a inner join resourceType b on b.resourceId = a.resourceId \
            inner join type c on b.typeId = c.typeId \
            inner join resourcePerk d on d.resourceId = a.resourceId \
            inner join perk e on e.perkId = d.perkId \
            where c.type='${key}';`, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// get all categories
const getAllCategory = () => {
    return new Promise((resolve, reject) => {
        pool.query(`select type from type;`, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

module.exports = {
    getData,
    searchData,
    getByCategory,
    getAllCategory,
}