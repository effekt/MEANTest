const express = require('express');
const router = express.Router();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

const MongoClient = require('mongodb').MongoClient;

var db;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.post('/api/post', function(req, res) {
    /* Log the POST from the api call and write the request body to the window */
    console.log(req.body);
    res.json(req.body);
});

app.get('/api/get', function(req, res) {
    db.collection('series').find().toArray(function(err, results) {
        if (err) return console.log(err);
        res.json(results);
    });
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

//Create the connection to the MongoDB && start the webserver on localhost:3000
MongoClient.connect('mongodb://localhost:27017', function(err, client) {
    if (err) return console.log(err);
    db = client.db('series');
    server.listen(port, function() {
        console.log('ErfanTest is now running on localhost:' + port);
        init_db();
    });
});





/*

    Prepare the database with one entry

 */
var init_db = function() {
    db.collection('series').findOne({'show': 'The Simpsons'}, function (err, found) {
        if (typeof(found) === "undefined" || found === null) {
            var series = {
                'show': 'The Simpsons',
                'seasons': 28,
                'type': 'Animated'
            };
            db.collection('series').save(series, function (err, result) {
                if (err) return console.log(err);
                console.log('Saved ' + series.show);
                console.log('Database prepared.');
            });
        }
    });
}

