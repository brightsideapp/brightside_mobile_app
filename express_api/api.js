#!/usr/bin/env node


/** api.js  */
const express = require('express');
const db = require('./db/mysql_db');
const config = require('./cred/secret.json');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const cookieParser = require('cookie-parser');


// Initialize express() as app.
const app = express();

// set hbs views
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser());

// If someone visits the homepage, tell them they are lost
app.get('/', (request, response) => {
    response.send('Hi, nothing here.');
});

// If someone gets the correct address, return json from database
app.get(`/${config.token}`, (request, response) => {
    db.getData().then((resource) => {
        response.json(resource);
    }).catch((error) => {
        response.send(error);
    })
});

// request data with search parameters /search?keyword=<keyword search>
app.get(`/${config.token}/search`, (request, response) => {
    db.searchData(decodeURIComponent(request.query.keyword))
    .then(async (resource) => {
            let orgIdList = []
            for (let i = 0; i < resource.length; i++) {
                orgIdList.push(resource[i].resourceId)
            }
            await db.getResourcesById(orgIdList)
            .then(async (resource) => {
                let result = _groupPerk(resource)   
                for (let i = 0; i < result.length; i++) {
                    await db.getSchedule(result[i].resourceId)
                    .then((respond)=>{
                        result[i].schedule = _groupSchedule(respond)
                        delete result[i].resourceId
                    })
                }
                response.json(result)
            })
    })
    .catch((error) => {
        response.json([]);
    })
})

// get the API key
app.get(`/${config.token}/key`, (request, response) => {
    db.getKey('google').then((respond) => {
        let key = respond[0].accessKey
        response.json([{key:key}]);
    }).catch((error) => {
        response.json([]);
    })
})

// request data based on category /category?key=legal
// if no key is provided. (ie /category) it returns a list of all the categories
app.get(`/${config.token}/category`, (request, response) => {
    if (request.query.key == undefined) {
        db.getAllCategory().then((category) => {
            response.json(category);
        }).catch((error) => {
            response.json([]);
        })
    } else {
        let result = []
        db.getByCategory(decodeURIComponent(request.query.key))
        .then(async (resource) => {
            result = _groupPerk(resource)   
            for (let i = 0; i < result.length; i++) {
                await db.getSchedule(result[i].resourceId)
                .then((respond)=>{
            	    result[i].schedule = _groupSchedule(respond)
                    delete result[i].resourceId
		        })
            }
	        response.json(result)
        }).catch((error) => {
            response.json([]);
        })
    }
})

// POST request for login
app.post(`/${config.token}/manage`, urlencodedParser, (request, response) => {
    db.getUser(request.body.username, request.body.password).then(resp => {
        if (resp.length == 1) {
            response.cookie('isLoggedIn', `${request.body.username}`, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
            response.redirect(`/${config.token}/manage`);
        } else {
            response.render('login.hbs', {
                failed: true
            });
        }
    })
})

// POST request for adding data
app.post(`/${config.token}/manage/submit`, urlencodedParser, (request, response) => {
    var formdata = request.body;
    
    if (formdata.location == '') {
        formdata['location'] = null;
    }

    if (formdata.website == '') {
        formdata['website'] = null;
    }

    if (formdata.tollfree == '') {
        formdata['tollfree'] = null;
    } else {
        formdata['tollfree'] = formdata.tollfree.replace(/\(| |\)|\.|\*|\-/gi, "");
    }

    if (formdata.monday[0] == 'null' && formdata.monday[1] == 'null') {
        formdata['monday'][0] = null;
        formdata['monday'][1] = null;
    }

    if (formdata.tuesday[0] == 'null' && formdata.tuesday[1] == 'null') {
        formdata['tuesday'][0] = null;
        formdata['tuesday'][1] = null;
    }

    if (formdata.wednesday[0] == 'null' && formdata.wednesday[1] == 'null') {
        formdata['wednesday'][0] = null;
        formdata['wednesday'][1] = null;
    }

    if (formdata.thursday[0] == 'null' && formdata.thursday[1] == 'null') {
        formdata['thursday'][0] = null;
        formdata['thursday'][1] = null;
    }

    if (formdata.friday[0] == 'null' && formdata.friday[1] == 'null') {
        formdata['friday'][0] = null;
        formdata['friday'][1] = null;
    }

    if (formdata.saturday[0] == 'null' && formdata.saturday[1] == 'null') {
        formdata['saturday'][0] = null;
        formdata['saturday'][1] = null;
    }

    if (formdata.sunday[0] == 'null' && formdata.sunday[1] == 'null') {
        formdata['sunday'][0] = null;
        formdata['sunday'][1] = null;
    }
    
    // manage phone numbers and make sure its only numbers
    formdata['contact'] = formdata.contact.replace(/\(| |\)|\.|\*|\-/gi, "");
    

    // add data to database
    db.addResource(formdata).then(() => {
        db.getLatestResourceId().then(id => {
            db.addResourceHours(id[0].resourceId, formdata).then(() => {
                db.addResourceKeyw(id[0].resourceId, formdata.keyword).then(() => {
                    db.addResourcePerk(id[0].resourceId, formdata.perks).then(() => {
                        db.addResourceType(id[0].resourceId, formdata.type).then(() => {
                            response.redirect(`/${config.token}/manage`);
                        })
                    })
                })
            })
        })
    })

})

// method for deleting data
app.post(`/${config.token}/manage/delete`, urlencodedParser, (request, response) => {
    db.delResourceType(request.body.resId).then(() => {
        db.delResourcePerk(request.body.resId).then(() => {
            db.delResourceKeyw(request.body.resId).then(() => {
                db.delResourceHours(request.body.resId).then(() => {
                    db.delResource(request.body.resId).then(() => {
                        response.redirect(`/${config.token}/manage`);
                    })
                })
            })
        })
    })
})

// GET request to console management page
app.get(`/${config.token}/manage`, (request, response) => {
    if (request.cookies.isLoggedIn == undefined) {
        response.render('login.hbs');
    } else if (request.cookies.isLoggedIn != undefined) {
        db.getData().then(data => {
            for (i in data) {
                if (data[i]['hours'] != null) {
                    data[i]['hours'] = data[i].hours.split(',');
                }
                data[i]['keywords'] = data[i].keywords.split(',');
                data[i]['perks'] = data[i].perks.split(',');
                data[i]['type'] = data[i].type.split(',');
            }
            response.render('admin.hbs', {
                data: data
            });
        })
    } else {
        response.status(404).send('Not Found');
    }
})

// If someone enters the wrong address, return 404
app.get('/*', (request, response) => {
    response.status(404).send('Nothing here');
});

function _formatAnswer() {

}

// private function to format perks into a list in the response
function _groupPerk(allData) {
  allData.push({resourceId:-1,perk:''})
  let prevId = undefined
  let curId = undefined
  let orgs = [];
  let perks = [];
    if (allData.length > 0) {
      prevId = allData[0].resourceId
    } else return allData;
    for (let i = 0; i < allData.length; i++){
        curId = allData[i].resourceId
        if (curId == prevId) {
            perks.push(allData[i].perk)
        } else {
            let org = allData[i-1]
            org.perk = perks
            orgs.push(org)
            prevId = allData[i].resourceId
            perks = [allData[i].perk]
        }
    }
    return orgs
}

// private function to format schdule into an object and hours as string in the response
function _groupSchedule(data){
    let schedule = {}
    for (let i = 0; i < data.length; i++) {
        let hours = ''
        if (!data[i].start && !data[i].end){
            hours = 'Not Available'
        } else if (data[i].start == data[i].end) {
            hours = 'Closed'
        } else if (data[i].start == '00:00:00' && data[i].end == '23:59:00') {
            hours = 'Open 24 Hours'
        } else {
            hours = `${data[i].start.substring(0,5)} - ${data[i].end.substring(0,5)}`
        }
        schedule[data[i].weekday] = hours
    }
    return schedule
}













/*---------------------Server Running and Listening---------------------*/
app.listen(80, () => {
    console.log(`Server is up and running...`);
});
