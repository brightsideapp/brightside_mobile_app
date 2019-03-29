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
// Get all the Data available from the database
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
const searchData = clientQuery => {
    let clientKeywords = clientQuery.trim().split(' ');
    let keywordList = [];
    for (let i = 0; i < clientKeywords.length; i++) {
        if (clientKeywords[i] != '')
            keywordList.push(clientKeywords[i])
    }
    let conditionList = [];
    for (let i = 0; i < keywordList.length; i++) {
        let keyword = keywordList[i];
        let subCondition = `(keyword like '%${keyword}%'\
                            or organization like '%${keyword}%'\
                            or perk like '%${keyword}%'\
                            or type like '%${keyword}%')`
        conditionList.push(subCondition);
    }
    let condition = conditionList.join(' and ');
    return new Promise((resolve, reject) => {
        pool.query(`select distinct a.resourceId from resource a \
                    inner join resourceKeyword b on a.resourceId = b.resourceId\
                    inner join keywordTypeKeyword c on b.keywordTypeId = c.keywordTypeId\
                    inner join resourcePerk d on a.resourceId = d.resourceId \
                    inner join perk e on d.perkId = e.perkId \
                    inner join resourceType f on a.resourceId = f.resourceId \
                    inner join type g on f.typeId = g.typeId \
                    where ${condition}`, (error, response, fields) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// get resource by categories
const getByCategory = key => {
    return new Promise((resolve, reject) => {
        pool.query(`select distinct a.resourceId,a.organization,a.location,a.description,\
            a.website,a.phoneNumber,a.tollFree,e.perk from \
            resource a inner join resourceType b on b.resourceId = a.resourceId \
            inner join type c on b.typeId = c.typeId \
            left join resourcePerk d on d.resourceId = a.resourceId \
            left join perk e on e.perkId = d.perkId \
            where c.type='${key}'`, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// Get resources info based on list of given ids
const getResourcesById = orgIdList => {
    return new Promise((resolve, reject) => {
        pool.query(`select distinct a.resourceId,a.organization,a.location,a.description,\
            a.website,a.phoneNumber,a.tollFree,e.perk from \
            resource a inner join resourceType b on b.resourceId = a.resourceId \
            inner join type c on b.typeId = c.typeId \
            left join resourcePerk d on d.resourceId = a.resourceId \
            left join perk e on e.perkId = d.perkId \
            where a.resourceId in (${orgIdList.join()})`, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// Get a resource schedule
const getSchedule = orgId => {
    return new Promise((resolve, reject) => {
        pool.query(`select b.weekday, b.start,b.end \
            from resource a inner join hours b \
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
        pool.query(`select type,imageFile from type;`, (error, response) => {
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

/*------------------- series of methods to Add data to database -------------------------------*/
const addResource = data => {
    return new Promise((resolve, reject) => {
        if (data.location == null && data.tollfree != null && data.website != null) {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', ${data.location}, '${data.description}', '${data.website}', '${data.contact}', '${data.tollfree}');`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
        } else if (data.location != null && data.tollfree == null && data.website != null) {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', '${data.location}', '${data.description}', '${data.website}', '${data.contact}', ${data.tollfree});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
        } else if (data.location != null && data.tollfree != null && data.website == null) {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', '${data.location}', '${data.description}', ${data.website}, '${data.contact}', '${data.tollfree}');`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
        } else if (data.location == null && data.tollfree == null && data.website != null) {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', ${data.location}, '${data.description}', '${data.website}', '${data.contact}', ${data.tollfree});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
        } else if (data.location != null && data.tollfree == null && data.website == null) {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', '${data.location}', '${data.description}', ${data.website}, '${data.contact}', ${data.tollfree});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
        } else if (data.location == null && data.tollfree != null && data.website == null) {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', ${data.location}, '${data.description}', ${data.website}, '${data.contact}', '${data.tollfree}');`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
        } else if (data.location == null && data.tollfree == null && data.website == null) {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', ${data.location}, '${data.description}', ${data.website}, '${data.contact}', ${data.tollfree});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
        } else {
            pool.query(`insert into resource(organization, location, description, website, phoneNumber, tollFree) \
            values('${data.organization}', '${data.location}', '${data.description}', '${data.website}', '${data.contact}', '${data.tollfree}');`, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            })
        }
    })
}

const getLatestResourceId = () => {
    return new Promise((resolve, reject) => {
        pool.query(`select resourceId from resource order by resourceId desc limit 1;`, (error, response) => {
            if (error) reject(error);
            else resolve(response);
        })
    })
}

// add hours using new resourceId
const addResourceHours = (id, data) => {
    return new Promise((resolve, reject) => {
        if (data.monday[0] == null && data.monday[1] == null) {
            pool.query(`insert into hours(resourceId, weekday, start, end) values (${id}, 'Sunday', ${data.sunday[0]}, ${data.sunday[1]}), \
            (${id}, 'Monday', ${data.monday[0]}, ${data.monday[1]}), \
            (${id}, 'Tuesday', ${data.tuesday[0]}, ${data.tuesday[1]}), \
            (${id}, 'Wednesday', ${data.wednesday[0]}, ${data.wednesday[1]}), \
            (${id}, 'Thursday', ${data.thursday[0]}, ${data.thursday[1]}), \
            (${id}, 'Friday', ${data.friday[0]}, ${data.friday[1]}), \
            (${id}, 'Saturday', ${data.saturday[0]}, ${data.saturday[1]});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
            })
        } else {
            pool.query(`insert into hours(resourceId, weekday, start, end) values (${id}, 'Sunday', '${data.sunday[0]}', '${data.sunday[1]}'), \
            (${id}, 'Monday', '${data.monday[0]}', '${data.monday[1]}'), \
            (${id}, 'Tuesday', '${data.tuesday[0]}', '${data.tuesday[1]}'), \
            (${id}, 'Wednesday', '${data.wednesday[0]}', '${data.wednesday[1]}'), \
            (${id}, 'Thursday', '${data.thursday[0]}', '${data.thursday[1]}'), \
            (${id}, 'Friday', '${data.friday[0]}', '${data.friday[1]}'), \
            (${id}, 'Saturday', '${data.saturday[0]}', '${data.saturday[1]}');`, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            })
        }
    })
}

// add resourceKeyword
const addResourceKeyw = (id, data) => {
    return new Promise((resolve, reject) => {
        if (typeof data == 'string') {
            pool.query(`insert into resourceKeyword(resourceId, keywordTypeId) values (${id}, ${data});`, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            })
        } else if (typeof data == 'object') {
            for (i in data) {
                pool.query(`insert into resourceKeyword(resourceId, keywordTypeId) values (${id}, ${data[i]});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
            }
        }
    })
}

// resourcePerk
const addResourcePerk = (id, data) => {
    return new Promise((resolve, reject) => {
        if (typeof data == 'string') {
            pool.query(`insert into resourcePerk(resourceId, perkId) values (${id}, ${data});`, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            })
        } else if (typeof data == 'object') {
            for (i in data) {
                pool.query(`insert into resourcePerk(resourceId, perkId) values (${id}, ${data[i]});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
            }
        }
    })
}

// resourceType
const addResourceType = (id, data) => {
    return new Promise((resolve, reject) => {
        if (typeof data == 'string') {
            pool.query(`insert into resourceType(typeId, resourceId) values (${data}, ${id});`, (error, response) => {
                if (error) reject(error);
                else resolve(response);
            })
        } else if (typeof data == 'object') {
            for (i in data) {
                pool.query(`insert into resourceType(typeId, resourceId) values (${data[i]}, ${id});`, (error, response) => {
                    if (error) reject(error);
                    else resolve(response);
                })
            }
        }
    })
}


module.exports = {
    getResourcesById,
    getData,
    getByCategory,
    getAllCategory,
    getSchedule,
    getUser,
    searchData,
    addResource,
    getLatestResourceId,
    addResourceHours,
    addResourceKeyw,
    addResourcePerk,
    addResourceType,
}
