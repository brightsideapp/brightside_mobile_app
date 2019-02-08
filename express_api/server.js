#!/usr/bin/env node

/** server.js  */

const express = require('express');
const db = require('./db/mysql_db');

// Initialize express() as app.
const app = express();

// If someone visits the homepage, tell them they are lost
app.get('/', (request, response) => {
    response.send('Hi, nothing here.');
});


// If someone gets the correct address, return json from database
app.get('/xGdZeUwWF9vGiREdDqttqngajYihFUIoJXpC8DVz', (request, response) => {
    db.getData().then((resource) => {
        response.json(resource);
    }).catch((error) => {
        response.send(error);
    })
});

// If someone enters the wrong address, they are really lost
app.get('/*', (request, response) => {
    response.send('ERROR 404');
});















/*---------------------Server Running and Listening---------------------*/
app.listen(80, () => {
    console.log(`Server is up and running...`);
});