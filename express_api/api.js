#!/usr/bin/env node


/** api.js  */
const express = require('express');
const db = require('./db/mysql_db');
const config = require('./cred/secret.json');
const hbs = require('hbs');

// Initialize express() as app.
const app = express();

// set hbs views
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/assets'));

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
    db.searchData(request.query.keyword).then((resource) => {
        response.json(resource);
    }).catch((error) => {
        response.send(error);
    })
})

// request data based on category /category?key=legal
// if no key is provided. (ie /category) it returns a list of all the categories
app.get(`/${config.token}/category`, (request, response) => {
    if (request.query.key == undefined) {
        db.getAllCategory().then((category) => {
            response.json(category);
        }).catch((error) => {
            response.send(error);
        })
    } else {
        db.getByCategory(request.query.key).then((resource) => {
            response.json(resource);
        }).catch((error) => {
            response.send(error);
        })
    }
})

// admin login for adding more database entries
app.get(`/${config.token}/manage/:admin`, (request, response) => {
    if (request.params.admin == 'brightside_admin') {
        response.render('admin.hbs');
    } else {
        response.status(404).send('Not Found');
    }
})

// If someone enters the wrong address, return 404
app.get('/*', (request, response) => {
    response.status(404).send('Nothing here');
});















/*---------------------Server Running and Listening---------------------*/
app.listen(80, () => {
    console.log(`Server is up and running...`);
});