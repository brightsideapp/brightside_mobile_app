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
         pool.query('select * from resource a \
         join (select resourceId, group_concat(concat(weekday, " ", start, "-", end)) as hours from hours group by resourceId) b \
         on a.resourceId=b.resourceId \
         join (select resourceId, group_concat(keywordType) as keywords from resourceKeyword a join keywordType b on a.keywordTypeId=b.keywordTypeId group by resourceId order by a.resourceId) c \
         on a.resourceId=c.resourceId \
         join (select a.resourceId, group_concat(perk) as perks from resourcePerk a join perk b on a.perkId=b.perkId group by a.resourceId order by a.resourceId) d\
         on a.resourceId=d.resourceId \
         join (select resourceId, group_concat(type) as type from resourceType a join type b on a.typeId=b.typeId group by resourceId order by resourceId) e \
         on a.resourceId=e.resourceID \
         order by a.resourceId;', (error, response, fields) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

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
            left join resourcePerk d on d.resourceId = a.resourceId \
            left join perk e on e.perkId = d.perkId \
            where c.type='${key}';`, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

const getSchedule = orgId => {
    return new Promise((resolve, reject) => {
        pool.query(`select b.weekday,b.start,b.end \
            from resource a left join hours b \
            on b.resourceId = a.resourceId \
            where a.resourceId = '${orgId}'`, (error, response) => {
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

// check user in database
const getUser = (user, pass) => {
    return new Promise((resolve, reject) => {
        pool.query(`select * from users where user='${user}' and password='${pass}'`, (error, response) => {
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
    getSchedule,
    getUser,
    searchData,
}
